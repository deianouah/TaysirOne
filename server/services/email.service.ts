/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { Resend } from "resend";
import nodemailer from "nodemailer";
import { diployLogger, HTTP_STATUS, DIPLOY_BRAND } from "@diploy/core";
import { getSMTPConfig } from "server/controllers/smtp.controller";
import { getFirstPanelConfig, getPanelConfigs } from "./panel.config";
import { cacheGet, cacheInvalidate, CACHE_KEYS, CACHE_TTL } from './cache';

let transporter: any = null;
let resendClient: Resend | null = null;

function resolveLogoUrl(smtpLogo?: string | null, panelLogo?: string | null): string | undefined {
  const logo = smtpLogo || panelLogo;
  if (!logo) return undefined;
  if (logo.startsWith("http://") || logo.startsWith("https://")) return logo;
  const baseUrl = (process.env.APP_URL || ("" ? `https://${""}` : "")).replace(/\/$/, "");
  if (!baseUrl) return undefined;
  const path = logo.startsWith("/") ? logo : `/uploads/${logo}`;
  return `${baseUrl}${path}`;
}

async function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

async function getTransporter() {
  if (transporter) return transporter;

  const config = await getSMTPConfig();

  if (config) {
    const port = Number(config.port);
    const secure = port === 465;

    const transportOptions: any = {
      host: config.host,
      port,
      secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    };

    if (!secure && (port === 587 || !!config.secure)) {
      transportOptions.requireTLS = true;
    }

    transporter = nodemailer.createTransport(transportOptions);
  } else {
    // Check if we have Resend API Key fallback
    const resend = await getResendClient();
    if (resend) {
      // Return a mock transporter that we'll skip later or handle separately
      return { sendMail: () => Promise.resolve({ messageId: "handled-by-resend" }) };
    }

    console.warn("Using fallback SMTP settings (emails will not be sent)");
    transporter = nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  return transporter;
}

async function getConfig() {
  return getSMTPConfig();
}

async function getPanelConfig() {
  const configs = await getPanelConfigs();
  return Array.isArray(configs) ? configs[0] : configs;
}

export function resetEmailCache() {
  transporter = null;
  cacheInvalidate(CACHE_KEYS.smtpConfig()).catch(() => {});
  cacheInvalidate(CACHE_KEYS.panelConfig()).catch(() => {});
}

function generateOTPEmailHTML(
  companyName?: string,
  logo?: string,
  otpCode?: string,
  name?: string
): string {
  const displayName = "Taysir One";
  const headerContent = logo
    ? `<img src="${logo}" alt="${displayName} Logo" style="max-height: 80px; margin-bottom: 20px;">`
    : `<div class="logo">${displayName}</div>`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
        .container { background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 32px; font-weight: 800; color: #10b981; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
        .welcome-title { font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin-bottom: 10px; }
        .otp-box { background: #ecfdf5; border: 2px dashed #10b981; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 42px; font-weight: 800; letter-spacing: 10px; color: #065f46; font-family: monospace; }
        .message { font-size: 16px; color: #4b5563; text-align: center; line-height: 1.8; }
        .security-warning { background: #fffbeb; border-radius: 8px; padding: 15px; margin: 25px 0; font-size: 14px; color: #92400e; border: 1px solid #fde68a; text-align: center; }
        .footer { text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid #f3f4f6; font-size: 13px; color: #9ca3af; }
        .cta-text { color: #10b981; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${headerContent}
        </div>
        
        <h2 class="welcome-title">Welcome to Taysir One!</h2>
        
        <div class="message">
          ${name ? `<p>Hello <strong>${name}</strong>,</p>` : "<p>Hello,</p>"}
          <p>Thank you for choosing <span class="cta-text">Taysir One</span> for your business growth. We are excited to help you scale your marketing journey!</p>
          <p>Please use the verification code below to complete your registration:</p>
        </div>
        
        <div class="otp-box">
          <div style="font-size: 14px; color: #065f46; margin-bottom: 12px; text-transform: uppercase; font-weight: 600;">Your Security Code</div>
          <div class="otp-code">${otpCode}</div>
          <div style="font-size: 12px; color: #059669; margin-top: 12px;">This code expires in 10 minutes.</div>
        </div>
        
        <div class="security-warning">
          <strong>Important Security Notice:</strong> For your protection, <span style="text-decoration: underline;">never share this code</span> with anyone. Taysir One staff will never ask for your verification code via phone or email.
        </div>
        
        <div class="message">
          <p>If you did not request this code, simply ignore this email or contact our support team if you have concerns.</p>
        </div>
        
        <div class="footer">
          <p>You are receiving this because you signed up for Taysir One.</p>
          <p>&copy; ${new Date().getFullYear()} Taysir One. All rights reserved.</p>
          <p>The smartest way to grow your business.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOTPEmailText(
  companyName: string,
  otpCode: string,
  name?: string
): string {
  return `
Hello${name ? " " + name : ""},

Welcome to Taysir One! Thank you for choosing us for your business growth.

Your verification code is: ${otpCode}

For your security, DO NOT share this code with anyone. This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

---
Taysir One
The smartest way to grow your business.
  `.trim();
}

function generateForgotPasswordEmailHTML(
  companyName?: string,
  logo?: string,
  otpCode?: string,
  name?: string
): string {
  const displayName = companyName || "Your Company";
  const headerContent = logo
    ? `<img src="${logo}" alt="${displayName} Logo" style="max-height: 60px; margin-bottom: 10px;">`
    : `<div class="logo">${displayName}</div>`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 10px; }
        .otp-box { background: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1f2937; font-family: 'Courier New', monospace; }
        .message { font-size: 16px; color: #4b5563; margin: 20px 0; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; font-size: 14px; color: #92400e; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${headerContent}
          <p style="color: #6b7280; margin: 0;">Our Platform</p>
        </div>

        <div class="message">
          ${name ? `<p>Hello <strong>${name}</strong>,</p>` : "<p>Hello,</p>"}
          <p>You requested to reset your password. Use the verification code below to reset your password.</p>
        </div>

        <div class="otp-box">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Your Verification Code</div>
          <div class="otp-code">${otpCode}</div>
          <div style="font-size: 12px; color: #9ca3af; margin-top: 10px;">Valid for 5 minutes</div>
        </div>

        <div class="warning">
          <strong>Security Notice:</strong> Never share this code with anyone. ${displayName} will never ask for your verification code.
        </div>

        <div class="message">
          <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
        </div>

        <div class="footer">
          <p>This is an automated message from ${displayName}.</p>
          <p>&copy; ${new Date().getFullYear()} ${displayName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateForgotPasswordEmailText(
  companyName: string,
  otpCode: string,
  name?: string
): string {
  return `
Hello${name ? " " + name : ""},

You requested to reset your password for ${companyName}.

Your verification code is: ${otpCode}

This code will expire in 5 minutes.

If you didn't request a password reset, please ignore this email.

---
${companyName}
Our Platform
  `.trim();
}

export async function sendOTPEmail(
  email: string,
  otpCode: string,
  name?: string
) {
  const resend = await getResendClient();
  const config = await getConfig();
  const configs = await getPanelConfig();

  const companyName = configs?.name || "Taysir One";
  const fromName = "Taysir One";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@taysirone.com";

  if (resend) {
    try {
      console.log(`[Email] Sending Password Reset OTP via Resend to ${email}...`);
      const data = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [email],
        subject: `Your ${companyName} Password Reset Code`,
        html: generateForgotPasswordEmailHTML(companyName, resolveLogoUrl(config?.logo, configs?.logo), otpCode, name),
        text: generateForgotPasswordEmailText(companyName, otpCode, name),
      });

      if (data.error) throw new Error(data.error.message);
      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error("[Email] Resend ForgotPassword Error:", error);
    }
  }

  // Fallback to SMTP
  const mailer = await getTransporter();
  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: `Your ${companyName} Verification Code`,
    html: generateForgotPasswordEmailHTML(
      companyName,
      resolveLogoUrl(config?.logo, configs?.logo),
      otpCode,
      name
    ),
    text: generateForgotPasswordEmailText(companyName, otpCode, name),
  };

  try {
    const info = await mailer.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] SMTP ForgotPassword Failed:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  const { name, email, company, subject, message } = data;
  const resend = await getResendClient();
  const config = await getConfig();
  const configs = await getPanelConfig();

  const companyName = configs?.name || "Taysir One";
  const fromName = "Taysir One";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@taysirone.com";

  const buildHtml = (name: string, email: string, company?: string, subject?: string, message?: string) => `
    <div style="background:#f4f5f7; padding:40px; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <div style="background:#10b981; padding:24px; color:#ffffff; text-align:center;">
          <h2 style="margin:0; font-size:24px; font-weight:600;">New Contact Form Message</h2>
          <p style="margin:6px 0 0; opacity:0.85;">${companyName}</p>
        </div>
        <div style="padding:30px;">
          <p style="font-size:16px; color:#111827;">You have received a new message from your website contact form.</p>
          <table style="width:100%; margin-top:20px;">
            <tr><td style="padding:10px 0; font-weight:600; width:150px;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding:10px 0; font-weight:600;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding:10px 0; font-weight:600;">Company:</td><td>${company || "-"}</td></tr>
            <tr><td style="padding:10px 0; font-weight:600;">Subject:</td><td>${subject}</td></tr>
          </table>
          <div style="margin-top:30px;">
            <p style="font-size:16px; font-weight:600; margin-bottom:8px;">Message:</p>
            <div style="background:#f9fafb; padding:20px; border-radius:10px; color:#111827;">${message?.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (resend) {
    try {
      console.log(`[Email] Sending Contact Request via Resend to ${fromEmail}...`);
      const data = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [fromEmail],
        subject: `Contact Form: ${subject}`,
        html: buildHtml(name, email, company, subject, message),
        text: `${name} (${email}) says: ${message}`,
      });
      if (data.error) throw new Error(data.error.message);
      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error("[Email] Resend Contact Error:", error);
    }
  }

  // Fallback
  const mailer = await getTransporter();
  try {
    const info = await mailer.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: fromEmail,
      subject: `Contact Form: ${subject}`,
      html: buildHtml(name, email, company, subject, message),
      text: `${name} (${email}) says: ${message}`,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] SMTP Contact Fallback Failed:", error);
    throw new Error("Failed to send contact message");
  }
}

export async function sendOTPEmailVerify(
  email: string,
  otpCode: string,
  name?: string
) {
  const resend = await getResendClient();
  const config = await getConfig();
  const configs = await getPanelConfig();

  const companyName = configs?.name || "Taysir One";
  const fromName = "Taysir One";
  
  // Resend domain verified! Using professional email address.
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@taysirone.com";

  if (resend) {
    try {
      console.log(`[Email] Sending OTP via Resend to ${email}...`);
      const data = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [email],
        subject: `Your ${companyName} Verification Code`,
        html: generateOTPEmailHTML(companyName, resolveLogoUrl(config?.logo, configs?.logo), otpCode, name),
        text: generateOTPEmailText(companyName, otpCode, name),
      });

      if (data.error) {
        throw new Error(data.error.message);
      }

      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error("[Email] Resend API Error:", error);
      // Fallback to SMTP if Resend fails
    }
  }

  // Fallback to SMTP
  const mailer = await getTransporter();
  const finalFromEmail = config?.fromEmail || fromEmail;
  const mailOptions = {
    from: `"${fromName}" <${finalFromEmail}>`,
    to: email,
    subject: `Your ${companyName} Verification Code`,
    html: generateOTPEmailHTML(companyName, resolveLogoUrl(config?.logo, configs?.logo), otpCode, name),
    text: generateOTPEmailText(companyName, otpCode, name),
  };

  try {
    const info = await mailer.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] SMTP Fallback Failed:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function verifyEmailConfiguration(): Promise<boolean> {
  try {
    const resend = await getResendClient();
    if (resend) return true; // Resend client presence is enough for config validation
    const mailer = await getTransporter();
    await mailer.verify();
    return true;
  } catch (error) {
    console.error("[Email] Email configuration error:", error);
    return false;
  }
}
