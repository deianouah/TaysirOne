import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  CheckCircle, ArrowRight, ArrowLeft, ExternalLink,
  Upload, Clock, MessageCircle, Facebook, Instagram,
  Zap, Crown, Check, X, AlertCircle, Copy, Phone
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type Plan = "free" | "pro";
type PayMethod = "baridimob" | "ccp";
type Step = 1 | 2 | 3 | 4;

interface PlatformState {
  whatsapp: boolean;
  facebook: boolean;
  instagram: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "ربط المنصات" },
  { num: 2, label: "اختيار الباقة" },
  { num: 3, label: "الدفع" },
  { num: 4, label: "انتظار التأكيد" },
];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.num;
        const active = current === step.num;
        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-gray-900 text-white ring-4 ring-gray-200"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <span className={`text-[10px] font-semibold hidden sm:block ${active ? "text-gray-900" : done ? "text-emerald-600" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 max-w-[60px] transition-colors duration-500 ${done ? "bg-emerald-400" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Step 1: Connect Platforms ────────────────────────────────────────────────
function StepConnectPlatforms({
  platforms,
  onChange,
  onNext,
}: {
  platforms: PlatformState;
  onChange: (p: PlatformState) => void;
  onNext: () => void;
}) {
  const toggle = (key: keyof PlatformState) =>
    onChange({ ...platforms, [key]: !platforms[key] });

  const items = [
    {
      key: "whatsapp" as const,
      icon: "💚",
      name: "واتساب بزنس",
      desc: "الرد على رسائل زبائنك آلياً عبر واتساب بزنس API",
      badge: "الأكثر طلباً",
      badgeColor: "bg-green-100 text-green-700",
      border: platforms.whatsapp ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:border-gray-300",
      checkColor: "bg-green-500",
    },
    {
      key: "facebook" as const,
      icon: "💙",
      name: "فيسبوك Messenger",
      desc: "رد ذكي على رسائل صفحتك وتحويل الزوار إلى مواعيد",
      badge: "موصى به",
      badgeColor: "bg-blue-100 text-blue-700",
      border: platforms.facebook ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300",
      checkColor: "bg-blue-500",
    },
    {
      key: "instagram" as const,
      icon: "🟣",
      name: "إنستجرام DM",
      desc: "رد فوري ومهني على الرسائل المباشرة في إنستجرام",
      badge: "اختياري",
      badgeColor: "bg-purple-100 text-purple-700",
      border: platforms.instagram ? "border-purple-400 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300",
      checkColor: "bg-purple-500",
    },
  ];

  const anySelected = platforms.whatsapp || platforms.facebook || platforms.instagram;

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-4 py-1.5 text-sm font-bold mb-3">
          الخطوة 1 من 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          اربط منصاتك
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          اختر المنصات التي تريد استقبال رسائل زبائنك منها. يمكنك تغييرها لاحقاً من إعدادات البوت.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key)}
            className={`w-full text-right flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${item.border}`}
          >
            <div className="text-3xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">{item.name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                platforms[item.key]
                  ? `${item.checkColor} border-transparent`
                  : "border-gray-300 bg-white"
              }`}
            >
              {platforms[item.key] && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        ))}
      </div>

      {!anySelected && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>اختر منصة واحدة على الأقل للمتابعة</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onNext}
          disabled={!anySelected}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-4 rounded-2xl hover:from-gray-800 hover:to-gray-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          التالي
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-all"
        >
          تخطي
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Choose Plan ──────────────────────────────────────────────────────
function StepChoosePlan({
  plan,
  onChange,
  onNext,
  onPrev,
}: {
  plan: Plan;
  onChange: (p: Plan) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const plans = [
    {
      id: "free" as Plan,
      name: "تجريبية",
      price: "مجاناً",
      period: "",
      desc: "لمعاينة خصائص المنصة",
      features: [
        { text: "إعلانات محدودة (3)", ok: true },
        { text: "رد آلي أساسي", ok: true },
        { text: "إدارة الرسائل", ok: true },
        { text: "AI ذكي متقدم", ok: false },
        { text: "تصدير قائمة الهواتف", ok: false },
        { text: "دعم فني VIP", ok: false },
      ],
      cardClass: "border-gray-200",
      popular: false,
    },
    {
      id: "pro" as Plan,
      name: "Pro Agency",
      price: "5,000",
      period: "دج / شهر",
      desc: "الباقة المتكاملة للنشاطات الجادة",
      features: [
        { text: "إعلانات غير محدودة", ok: true },
        { text: "بوت AI متطور", ok: true },
        { text: "جمع أرقام هواتف غير محدود", ok: true },
        { text: "واتساب + فيسبوك + إنستجرام", ok: true },
        { text: "إحصائيات دقيقة", ok: true },
        { text: "دعم فني مخصص (VIP)", ok: true },
      ],
      cardClass: "border-emerald-400",
      popular: true,
    },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-4 py-1.5 text-sm font-bold mb-3">
          الخطوة 2 من 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">اختر باقتك</h2>
        <p className="text-gray-500 text-sm">يمكنك الترقية في أي وقت</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`relative text-right p-6 rounded-3xl border-2 transition-all duration-200 ${
              plan === p.id
                ? p.id === "pro"
                  ? "border-emerald-500 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
                  : "border-gray-900 bg-gray-50"
                : p.cardClass + " bg-white hover:shadow-md"
            }`}
          >
            {p.popular && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full">
                  ⭐ الأكثر طلباً
                </span>
              </div>
            )}
            <div className="mb-4 mt-2">
              <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${plan === p.id && p.id === "pro" ? "text-emerald-400" : "text-gray-500"}`}>
                {p.name}
              </div>
              <div className={`flex items-end gap-1 ${plan === p.id && p.id === "pro" ? "text-white" : "text-gray-900"}`}>
                <span className="text-4xl font-black">{p.price}</span>
                {p.period && <span className={`text-sm mb-1.5 ${plan === p.id && p.id === "pro" ? "text-gray-400" : "text-gray-500"}`}>{p.period}</span>}
              </div>
              <div className={`text-xs ${plan === p.id && p.id === "pro" ? "text-gray-400" : "text-gray-500"}`}>{p.desc}</div>
            </div>
            <div className="space-y-2">
              {p.features.map((f, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs ${!f.ok ? "opacity-40" : ""} ${plan === p.id && p.id === "pro" ? "text-white" : "text-gray-700"}`}>
                  {f.ok
                    ? <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    : <X className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
                  {f.text}
                </div>
              ))}
            </div>
            {plan === p.id && (
              <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                باقتك المختارة
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
          السابق
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-4 rounded-2xl hover:from-gray-800 hover:to-gray-600 transition-all"
        >
          {plan === "free" ? "انطلق مجاناً" : "المتابعة للدفع"}
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────
function StepPayment({
  plan,
  payMethod,
  onMethodChange,
  onNext,
  onPrev,
}: {
  plan: Plan;
  payMethod: PayMethod;
  onMethodChange: (m: PayMethod) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const methods = [
    {
      id: "baridimob" as PayMethod,
      icon: "📱",
      name: "بريدي موب (BaridiMob)",
      desc: "الدفع عبر تطبيق بريدي موب",
      rip: "0097999 9999999 99 — Taysir One",
      info: "افتح تطبيق بريدي موب → تحويل → أدخل الـ RIB",
      color: "border-yellow-400 bg-yellow-50",
      active: "border-yellow-500 bg-yellow-50",
    },
    {
      id: "ccp" as PayMethod,
      icon: "🏦",
      name: "الحساب البريدي الجاري (CCP)",
      desc: "التحويل عبر البريد أو الصراف الآلي",
      rip: "CCP: 1234567 Clé 89 — Taysir One",
      info: "توجه لأي مكتب بريد أو ATM → تحويل → أدخل رقم الحساب",
      color: "border-green-400 bg-green-50",
      active: "border-green-500 bg-green-50",
    },
  ];

  const activeMethod = methods.find((m) => m.id === payMethod)!;

  const copyRip = () => {
    navigator.clipboard.writeText(activeMethod.rip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!phone.trim()) {
      toast({ title: "خطأ", description: "أدخل رقم هاتفك", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    // Simulate API call to submit payment receipt
    setTimeout(() => {
      setSubmitting(false);
      onNext();
    }, 1500);
  };

  if (plan === "free") {
    // Skip payment for free plan
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">الباقة المجانية</h2>
        <p className="text-gray-500 mb-8">لا يلزم دفع — يمكنك البدء فوراً!</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
            السابق
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold px-8 py-3 rounded-2xl hover:from-emerald-600 hover:to-teal-500 transition-all"
          >
            انطلق الآن
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-bold mb-3">
          الخطوة 3 من 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">إتمام الدفع</h2>
        <p className="text-gray-500 text-sm">اختر طريقة الدفع وارسل وصل التحويل</p>
      </div>

      {/* Amount */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 mb-6 text-center">
        <div className="text-sm text-gray-400 mb-1">المبلغ المطلوب</div>
        <div className="text-4xl font-black text-white">5,000 <span className="text-xl text-gray-400">دج</span></div>
        <div className="text-xs text-emerald-400 mt-1">باقة Pro Agency — شهر واحد</div>
      </div>

      {/* Payment method selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => onMethodChange(m.id)}
            className={`text-right p-4 rounded-2xl border-2 transition-all duration-200 ${
              payMethod === m.id ? m.active : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">{m.icon}</div>
            <div className="font-bold text-gray-900 text-sm mb-0.5">{m.name}</div>
            <div className="text-xs text-gray-500">{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Payment instructions */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-200">
        <div className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-lg">{activeMethod.icon}</span>
          كيفية الدفع عبر {activeMethod.name}
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
          <div className="text-xs text-gray-500 mb-1.5 font-semibold">رقم الحساب / RIB</div>
          <div className="flex items-center justify-between gap-3">
            <code className="text-sm font-mono text-gray-900 select-all">{activeMethod.rip}</code>
            <button
              onClick={copyRip}
              className="flex-shrink-0 text-xs flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "✓ نُسخ" : "نسخ"}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg p-3">
          💡 {activeMethod.info}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline-block ml-1" />
            رقم هاتفك (للتواصل معك بعد التأكيد)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xxxxxxxx"
            dir="ltr"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Upload className="w-4 h-4 inline-block ml-1" />
            وصل التحويل (صورة أو PDF)
          </label>
          <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all">
            <Upload className={`w-8 h-8 ${receiptFile ? "text-emerald-500" : "text-gray-400"}`} />
            <div className="text-center">
              {receiptFile ? (
                <div>
                  <p className="text-sm font-bold text-emerald-600">{receiptFile.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">انقر لتغيير الملف</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-gray-700">انقر لرفع الوصل</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, PDF (بحد أقصى 5MB)</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
          السابق
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 font-black py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-500 transition-all disabled:opacity-50 shadow-lg shadow-emerald-200"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              إرسال الوصل
              <ArrowLeft className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Waiting for Confirmation ────────────────────────────────────────
function StepConfirmation({ plan }: { plan: Plan }) {
  const [, setLocation] = useLocation();

  if (plan === "free") {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">مرحباً بك! 🎉</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          تم إنشاء حسابك بنجاح. يمكنك الآن الدخول للوحة التحكم وتجربة المنصة.
        </p>
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-black px-8 py-4 rounded-2xl mx-auto hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg"
        >
          الذهاب للوحة التحكم
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200 animate-pulse">
        <Clock className="w-10 h-10 text-white" />
      </div>
      <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
        في انتظار التأكيد
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
        تم إرسال الوصل بنجاح ✅
      </h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
        تم استلام طلب اشتراكك وسيقوم فريقنا بمراجعة الوصل وتفعيل حسابك خلال{" "}
        <strong className="text-gray-900">بضع ساعات</strong>. ستصلك رسالة تأكيد على هاتفك.
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-gray-200 text-right space-y-3">
        {[
          { icon: "✅", text: "تم استلام طلبك" },
          { icon: "🔍", text: "مراجعة الوصل من فريقنا (حتى 24 ساعة)" },
          { icon: "🚀", text: "تفعيل اشتراكك وإرسال رسالة تأكيد" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm text-gray-700 font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold px-8 py-3.5 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all"
        >
          الذهاب للوحة التحكم
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Onboarding Component ────────────────────────────────────────────────
export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [platforms, setPlatforms] = useState<PlatformState>({
    whatsapp: false,
    facebook: false,
    instagram: false,
  });
  const [plan, setPlan] = useState<Plan>("pro");
  const [payMethod, setPayMethod] = useState<PayMethod>("baridimob");

  const next = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  // When free plan is selected, skip payment step
  const nextFromPlan = () => {
    if (plan === "free") {
      setStep(4);
    } else {
      next();
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex flex-col"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-gray-900">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Taysir <span className="text-emerald-500">One</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 font-semibold transition-colors">
            تخطي الكل ←
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <StepIndicator current={step} />

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
            {step === 1 && (
              <StepConnectPlatforms
                platforms={platforms}
                onChange={setPlatforms}
                onNext={next}
              />
            )}
            {step === 2 && (
              <StepChoosePlan
                plan={plan}
                onChange={setPlan}
                onNext={nextFromPlan}
                onPrev={prev}
              />
            )}
            {step === 3 && (
              <StepPayment
                plan={plan}
                payMethod={payMethod}
                onMethodChange={setPayMethod}
                onNext={next}
                onPrev={prev}
              />
            )}
            {step === 4 && <StepConfirmation plan={plan} />}
          </div>

          {/* Security note */}
          {step < 4 && (
            <p className="text-center text-xs text-gray-400 mt-6">
              🔒 معلوماتك محفوظة وآمنة — لن يتم مشاركتها مع أي طرف ثالث
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
