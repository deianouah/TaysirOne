import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  MessageSquare, Phone, BarChart3, Star, ChevronDown,
  ArrowRight, Bot, Filter, Users, Check, X,
  Zap, TrendingUp, Award
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { AppSettings } from "@/types/types";

// ─── Floating particles background (Subtle) ────────────────────────────────────────────
const ParticlesBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full opacity-5"
        style={{
          width: `${Math.random() * 60 + 20}px`,
          height: `${Math.random() * 60 + 20}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6",
        }}
      />
    ))}
  </div>
);

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const { language } = useTranslation();

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const steps = 40;
        const inc = to / steps;
        const timer = setInterval(() => {
          start += inc;
          if (start >= to) { setVal(to); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 30);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val.toLocaleString(language === 'ar' ? 'ar-DZ' : 'en-US')}{suffix}</span>;
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
const DashboardMockup = () => {
  const { t } = useTranslation();
  return (
    <div className="relative mx-auto max-w-4xl mt-12 opacity-90">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl transform scale-105" />
      <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
          </div>
          <div className="flex-1 bg-gray-700/50 rounded-md px-3 py-1 text-[10px] text-gray-500 text-center">
            taysir.one/agency/dashboard
          </div>
        </div>
        <div className="flex h-64 sm:h-80">
          <div className="w-14 sm:w-48 bg-gray-900 border-r border-white/5 p-2 sm:p-4 space-y-1">
            {[
              { icon: "📊", label: t("agency_nav.dashboard") },
              { icon: "💬", label: t("agency_nav.messages"), badge: true },
              { icon: "🤖", label: t("agency_nav.ai_bot") },
              { icon: "⭐", label: t("agency_nav.subscription") },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors ${i === 0 ? "bg-emerald-600/20 text-emerald-400" : "text-gray-500"}`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="hidden sm:block truncate">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 sm:p-5 overflow-hidden bg-[#0f172a]">
            <p className="text-[10px] text-emerald-400/70 font-medium mb-3">Agency Status Dashboard</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { n: "156", label: "Leads", color: "text-emerald-400" },
                { n: "24", label: "Meetings", color: "text-blue-400" },
                { n: "8", label: "Ads", color: "text-purple-400" },
                { n: "100%", label: "Speed", color: "text-orange-400" },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/5">
                  <div className={`text-sm sm:text-xl font-bold ${s.color}`}>{s.n}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-10 bg-white/5 rounded-lg border border-white/5 w-full opacity-50" />
              <div className="h-10 bg-white/5 rounded-lg border border-white/5 w-full opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-start font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
  });

  const featureIcons = [Bot, Phone, MessageSquare, Filter, BarChart3, Users];
  const stepIcons = ["١", "٢", "٣", "٤"];
  const platformIcons = ["💚", "💙", "🟣"];

  return (
    <div className={`font-sans text-gray-900 overflow-x-hidden ${isRtl ? 'rtl' : 'ltr'}`}>
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
        .rtl { font-family: 'Cairo', sans-serif; }
        .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #064e3b 100%); }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <section className="hero-gradient relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
        <ParticlesBg />
        <div className="relative max-w-5xl mx-auto text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full px-4 py-2 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            {t("Landing.hero.badge")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            {t("Landing.hero.title")}
            <br />
            <span className="gradient-text">
               {isRtl ? "فرص حقيقية" : "Real Opportunities"}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("Landing.hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] transition-all text-lg"
            >
              {t("Landing.hero.cta_primary")}
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 text-white/80 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-lg"
            >
              {t("Landing.hero.cta_secondary")}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-14">
            {[
              { icon: Users, val: 200, suf: "+" },
              { icon: TrendingUp, val: 5000, suf: "+" },
              { icon: Zap, val: 98, suf: "%" },
              { icon: Award, val: 48, suf: "" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/5 min-w-[120px]">
                <stat.icon className="w-5 h-5 text-emerald-400 mb-1" />
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter to={stat.val} suffix={stat.suf} />
                </div>
                <div className="text-[10px] text-white/40 mt-0.5 tracking-wider uppercase">{t(`Landing.hero.stats.${i}`)}</div>
              </div>
            ))}
          </div>

          <DashboardMockup />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100/50 text-emerald-700 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.features.badge")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
              {t("Landing.features.title")}
              <span className="gradient-text"> {t("Landing.features.title_highlight")}</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t("Landing.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureIcons.map((Icon, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`Landing.features.items.${i}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`Landing.features.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.how.badge")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
              {t("Landing.how.title_before")} <span className="text-gray-400">{t("Landing.how.title_quote")}</span> {t("Landing.how.title_middle")}
              <span className="gradient-text"> {t("Landing.how.title_highlight")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl font-black mx-auto mb-4 shadow-lg shadow-emerald-100">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(`Landing.how.steps.${i}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-4">{t(`Landing.how.steps.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.platforms.badge")}
            </div>
            <h2 className="text-3xl font-black text-gray-900">{t("Landing.platforms.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {platformIcons.map((icon, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{t(`Landing.platforms.items.${i}.name`)}</h3>
                <p className="text-sm text-gray-500 mb-4">{t(`Landing.platforms.items.${i}.desc`)}</p>
                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
                  ✓ {t(`Landing.platforms.items.${i}.feature`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.pricing.badge")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
              {t("Landing.pricing.title")}
              <span className="gradient-text"> {t("Landing.pricing.title_highlight")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trial */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">{t("Landing.pricing.plans.0.name")}</div>
                <div className="text-4xl font-black text-gray-900 mb-1">{t("Landing.pricing.plans.0.price")}</div>
                <div className="text-sm text-gray-500">{t("Landing.pricing.plans.0.subtitle")}</div>
              </div>
              <div className="space-y-3 mb-8">
                {[0, 1, 2].map((fi) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {t(`Landing.pricing.plans.0.features.${fi}`)}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                {t("Landing.pricing.plans.0.cta")}
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-emerald-500/50 relative overflow-hidden">
               <div className="absolute top-4 left-4">
                <span className="bg-emerald-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full">
                  {t("Landing.pricing.plans.1.badge")}
                </span>
              </div>
              <div className="mb-6 mt-4">
                <div className="text-xs font-bold text-emerald-400 uppercase mb-2">{t("Landing.pricing.plans.1.name")}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{t("Landing.pricing.plans.1.price")}</span>
                  <span className="text-sm font-bold text-gray-500 mb-1">{t("Landing.pricing.plans.1.period")}</span>
                </div>
                <div className="text-sm text-gray-400">{t("Landing.pricing.plans.1.subtitle")}</div>
              </div>
              <div className="space-y-3 mb-8">
                {[0, 1, 2, 3, 4, 5].map((fi) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {t(`Landing.pricing.plans.1.features.${fi}`)}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center py-3.5 rounded-xl bg-emerald-500 text-gray-900 font-black hover:bg-emerald-400 transition-colors"
              >
                {t("Landing.pricing.plans.1.cta")}
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            {t("Landing.pricing.footer")}
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.testimonials.badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {t("Landing.testimonials.title")} <span className="gradient-text">{t("Landing.testimonials.title_highlight")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t(`Landing.testimonials.items.${i}.text`)}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t(`Landing.testimonials.items.${i}.name`)}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 tracking-wider uppercase">{t(`Landing.testimonials.items.${i}.role`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
           <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-500 rounded-full px-4 py-2 text-xs font-bold mb-4">
              {t("Landing.faqs.badge")}
            </div>
            <h2 className="text-3xl font-black text-gray-900">{t("Landing.faqs.title")}</h2>
          </div>
          <div className="space-y-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <FaqItem key={i} q={t(`Landing.faqs.items.${i}.q`)} a={t(`Landing.faqs.items.${i}.a`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient py-24 px-4 sm:px-6 relative overflow-hidden">
        <ParticlesBg />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full px-4 py-2 text-xs font-bold mb-6">
            {t("Landing.cta.badge")}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            {t("Landing.cta.title")}
            <span className="gradient-text"> {t("Landing.cta.title_highlight")}</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            {t("Landing.cta.subtitle")}
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-emerald-500 text-gray-900 font-extrabold px-10 py-4 rounded-2xl text-lg hover:scale-[1.03] transition-all shadow-2xl shadow-emerald-500/20"
            >
              {t("Landing.cta.button")}
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
