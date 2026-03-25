import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  MessageSquare, Phone, BarChart3, Shield, Star, ChevronDown,
  ArrowRight, Bot, Filter, Users, Check, X, Instagram,
  Facebook, Zap, TrendingUp, Award, Menu, LogIn, UserPlus
} from "lucide-react";

// ─── Floating particles background ────────────────────────────────────────────
const ParticlesBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 18 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full opacity-10 animate-pulse"
        style={{
          width: `${Math.random() * 60 + 20}px`,
          height: `${Math.random() * 60 + 20}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6",
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 4 + 3}s`,
        }}
      />
    ))}
  </div>
);

// ─── Typing effect words ──────────────────────────────────────────────────────
const TYPING_WORDS = ["فرص حقيقية", "عملاء جادين", "مبيعات أكثر", "نتائج ملموسة"];

function useTypingEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    } else {
      const speed = isDeleting ? 50 : 90;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return displayText;
}

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const steps = 60;
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

  return <span ref={ref}>{val.toLocaleString("ar-DZ")}{suffix}</span>;
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
const DashboardMockup = () => (
  <div className="relative mx-auto max-w-4xl mt-12">
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl transform scale-105" />
    <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
      {/* Browser chrome */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
          taysir.one/dashboard
        </div>
      </div>
      {/* Content */}
      <div className="flex h-64 sm:h-80">
        {/* Sidebar */}
        <div className="w-14 sm:w-48 bg-gray-850 border-r border-white/5 p-2 sm:p-4 space-y-1" style={{ background: "#111827" }}>
          {[
            { icon: "📊", label: "لوحة التحكم" },
            { icon: "💬", label: "الرسائل (12)", badge: true },
            { icon: "🤖", label: "بوت AI" },
            { icon: "⭐", label: "الاشتراك" },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs cursor-pointer transition-colors ${i === 0 ? "bg-emerald-600/20 text-emerald-400" : "text-gray-400 hover:bg-white/5"}`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span className="hidden sm:block truncate">{item.label}</span>
              {item.badge && <span className="hidden sm:block ml-auto bg-emerald-500 text-white text-[9px] rounded-full px-1.5 py-0.5 font-bold">12</span>}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-3 sm:p-5 overflow-hidden" style={{ background: "#0f172a" }}>
          <p className="text-xs text-emerald-400 font-medium mb-3">مرحبا 👋 — حالة النشاط اليوم</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { n: "156", label: "زبون محتمل", color: "text-emerald-400" },
              { n: "24", label: "موعد", color: "text-blue-400" },
              { n: "8", label: "إعلانات", color: "text-purple-400" },
              { n: "100٪", label: "سرعة الرد", color: "text-orange-400" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/5">
                <div className={`text-lg sm:text-2xl font-bold ${s.color}`}>{s.n}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { title: "شقة F4 بومرداس", leads: "42 زبون", status: "نشط", color: "bg-emerald-500/20 text-emerald-400" },
              { title: "Dacia Stepway 2022", leads: "18 زبون", status: "نشط", color: "bg-blue-500/20 text-blue-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                <div>
                  <div className="text-xs text-white font-medium">{item.title}</div>
                  <div className="text-[10px] text-gray-500">{item.leads}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-right font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 mr-2 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50">
          {a}
        </div>
      )}
    </div>
  );
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typedText = useTypingEffect();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const features = [
    {
      icon: Bot,
      title: "وكيل مبيعات AI",
      desc: "بوت ذكي يرد بتفاصيل عروضك، منتجاتك أو خدماتك بدقة 24/7 دون تدخلك.",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
    },
    {
      icon: Phone,
      title: "جمع أرقام الهواتف",
      desc: "البوت يطلب رقم الزبون المهتم ويحفظه في قائمة Leads منظمة وجاهزة للاتصال.",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "صندوق رسائل موحد",
      desc: "اجمع رسائل واتساب، فيسبوك وإنستجرام في شاشة واحدة احترافية.",
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
    },
    {
      icon: Filter,
      title: "فلترة ذكية",
      desc: "AI يعرف الفرق بين الزبون الجاد وبين الدردشة العامة ويتجاهل غير المهمين آلياً.",
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
    },
    {
      icon: BarChart3,
      title: "إحصائيات المبيعات",
      desc: "اعرف أي منتجاتك تجذب أكبر عدد من الزبائن وأي المنصات تحقق لك أفضل النتائج.",
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
    },
    {
      icon: Users,
      title: "إدارة المهتمين",
      desc: "البوت ينظم قائمة الزبائن حسب درجة اهتمامهم وجاهزيتهم للشراء.",
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50",
    },
  ];

  const steps = [
    {
      num: "١",
      title: "أضف عروضك",
      desc: "ارفع المواصفات، السعر والتفاصيل في لوحة تحكمك مرة واحدة.",
    },
    {
      num: "٢",
      title: "البوت يتولى الرد",
      desc: "عندما يسأل زبون، يقوم البوت بإعطائه كل التفاصيل الفنية بشكل مهني.",
    },
    {
      num: "٣",
      title: "جمع البيانات",
      desc: "يسأل البوت الزبون عن رقمه للمتابعة وتأكيد الطلب ويحفظه لك.",
    },
    {
      num: "٤",
      title: "أغلق الصفقة",
      desc: "ادخل للوحة التحكم وستجد قائمة أرقام الهواتف جاهزة للاتصال.",
    },
  ];

  const platforms = [
    {
      icon: "💚",
      name: "واتساب بزنس",
      desc: "الرد الآلي الأكثر طلباً في الجزائر",
      feature: "ربط مباشر عبر Meta API",
      color: "border-green-200 bg-green-50",
      badge: "bg-green-100 text-green-700",
    },
    {
      icon: "💙",
      name: "فيسبوك Messenger",
      desc: "رد ذكي على رسائل صفحتك",
      feature: "تحويل الزوار إلى مواعيد",
      color: "border-blue-200 bg-blue-50",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      icon: "🟣",
      name: "إنستجرام DM",
      desc: "رد فوري ومهني على رسائل DM",
      feature: "مثالي لكل الأنشطة التجارية",
      color: "border-purple-200 bg-purple-50",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  const testimonials = [
    {
      text: "المنصة وفرت عليّ عناء الرد على مئات الأشخاص الذين يسألون فقط بدافع الفضول. البوت يعطي التفاصيل ولا يعطيني إلا رقم الزبون الجاد.",
      name: "منير .ق",
      role: "وكالة عقارية · القبة",
      avatar: "م",
      stars: 5,
      color: "bg-emerald-600",
    },
    {
      text: "في معرض السيارات، الرسائل لا تتوقف. Taysir One يجمع لنا كل الطلبات في مكان واحد، ونعرف بالضبط من هو الزبون الجاد.",
      name: "رضوان .م",
      role: "معرض سيارات · سطيف",
      avatar: "ر",
      stars: 5,
      color: "bg-blue-600",
    },
    {
      text: "سهولة الاستخدام مذهلة. ربطنا الصفحة في 5 دقائق والبوت بدأ الرد فوراً. أنصح به لأي صاحب نشاط يريد تنظيم عمله.",
      name: "حميد .س",
      role: "مروّج عقاري · بجاية",
      avatar: "ح",
      stars: 5,
      color: "bg-violet-600",
    },
  ];

  const faqs = [
    {
      q: "هل يمكنني البدء مجاناً دون بطاقة بنكية؟",
      a: "نعم! الباقة التجريبية مجانية تماماً وتتيح لك تجربة خصائص المنصة قبل الاشتراك في الباقة الاحترافية.",
    },
    {
      q: "ما هي طرق الدفع المتاحة؟",
      a: "ندعم بريدي موب (BaridiMob) والحساب البريدي الجاري (CCP)، وهي الطرق الأنسب للجزائريين.",
    },
    {
      q: "كيف يتم تفعيل اشتراكي بعد الدفع؟",
      a: "بعد إرسال التحويل، يُرسل لك وصل تأكيد تلقائياً ويتم مراجعة اشتراكك من قِبل فريقنا ثم يُفعَّل خلال ساعات.",
    },
    {
      q: "هل البوت يرد بالدارجة الجزائرية؟",
      a: "نعم، يمكنك برمجة البوت بأي لغة تريدها: العربية الفصحى، الدارجة الجزائرية، الفرنسية أو أي لغة أخرى.",
    },
    {
      q: "هل يعمل مع واتساب العادي؟",
      a: "نعمل مع واتساب بزنس API. نوفر لك المساعدة الكاملة في الربط والإعداد عبر فريق الدعم.",
    },
  ];

  return (
    <div dir="rtl" className="font-sans text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
        body, .font-sans { font-family: 'Cairo', sans-serif; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 50% { opacity:0; } }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
        .cursor-blink { display:inline-block; width:3px; height:0.85em; background:#10b981; margin-right:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
        .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #1e3a5f 100%); }
      `}</style>

      {/* ── Header ── */}
      <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className={`flex items-center gap-2 font-black text-xl sm:text-2xl ${scrolled ? "text-gray-900" : "text-white"}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>Taysir <span className="text-emerald-400">One</span></span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {["المميزات", "كيف يعمل؟", "الأسعار", "شهادات"].map((item, i) => (
                <a
                  key={i}
                  href={`#${["features", "how", "pricing", "testimonials"][i]}`}
                  className={`text-sm font-semibold transition-colors hover:text-emerald-400 ${scrolled ? "text-gray-700" : "text-white/90"}`}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/login"
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/90 hover:bg-white/10"}`}
              >
                <LogIn className="w-4 h-4" />
                تسجيل الدخول
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.03]"
              >
                <UserPlus className="w-4 h-4" />
                ابدأ مجاناً
              </Link>
            </nav>

            {/* Mobile menu btn */}
            <button
              className={`md:hidden p-2 rounded-xl ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in-down">
            <div className="px-4 py-4 space-y-2">
              {["المميزات", "كيف يعمل؟", "الأسعار", "شهادات"].map((item, i) => (
                <a
                  key={i}
                  href={`#${["features", "how", "pricing", "testimonials"][i]}`}
                  className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <Link href="/login" className="block text-center px-4 py-3 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50">
                  تسجيل الدخول
                </Link>
                <Link href="/signup" className="block text-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl">
                  ابدأ مجاناً
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="hero-gradient relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
        <ParticlesBg />
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-4 py-2 text-sm font-semibold mb-8 animate-fade-in-up">
            <Zap className="w-4 h-4" />
            ✦ للتجار والمحترفين ومقدمي الخدمات في الجزائر
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            حوّل استفساراتك إلى
            <br />
            <span className="gradient-text">
              {typedText}
              <span className="cursor-blink" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Taysir One تجمع رسائل زبائنك من فيسبوك وواتساب في مكان واحد،
            وبوت الـ AI يتكفل بالرد التقني وجمع أرقام هواتف المهتمين الجادين بدلاً منك.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-500 transition-all hover:scale-[1.03] text-lg"
            >
              ابدأ مجاناً الآن
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 text-white/80 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all"
            >
              كيف يعمل؟
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-14 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Users, label: "تاجر ومحترف", value: 200, suffix: "+" },
              { icon: TrendingUp, label: "Lead شهرياً", value: 5000, suffix: "+" },
              { icon: Zap, label: "دقة البيانات", value: 98, suffix: "٪" },
              { icon: Award, label: "ولاية مغطاة", value: 48, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                <stat.icon className="w-5 h-5 text-emerald-400 mb-1" />
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Dashboard mockup */}
          <DashboardMockup />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ المميزات
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              وداعاً للرد على نفس
              <span className="gradient-text"> الأسئلة</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              نظام ذكي يفلتر الزبائن الجادين ويجمع بياناتهم آلياً
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${f.bg}`}>
                  <div className={`p-2 bg-gradient-to-br ${f.color} rounded-lg`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ كيف يعمل
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              من <span className="text-gray-400">'شحال السعر'</span> إلى
              <span className="gradient-text"> زبون جاد</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-l from-emerald-300 to-transparent z-0" />
                )}
                <div className="card-hover relative z-10 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg shadow-emerald-200">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ المنصات المدعومة
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">خدمة زبائنك عبر المنصات</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {platforms.map((p, i) => (
              <div key={i} className={`card-hover rounded-2xl p-6 border-2 ${p.color}`}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{p.desc}</p>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${p.badge}`}>
                  ✓ {p.feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ الأسعار
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              باقة احترافية،
              <span className="gradient-text"> بنصف سعر موظف</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="card-hover bg-white rounded-3xl p-8 border-2 border-gray-200">
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">تجريبية</div>
                <div className="text-5xl font-black text-gray-900 mb-1">مجاناً</div>
                <div className="text-sm text-gray-500">لمعاينة خصائص المنصة</div>
              </div>
              <div className="space-y-3 mb-8">
                {["إعلانات محدودة (3)", "رد آلي أساسي", "إدارة الرسائل"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
                {["AI ذكي متقدم", "تصدير قائمة الهواتف"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center py-3.5 px-6 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                جرب مجاناً
              </Link>
            </div>

            {/* Pro */}
            <div className="card-hover bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-2 border-emerald-500 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-full">
                  ⭐ الأكثر طلباً
                </span>
              </div>
              <div className="mb-6 mt-4">
                <div className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-2">Pro Agency</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-black text-white">5,000</span>
                  <span className="text-xl font-bold text-gray-400 mb-2">دج / شهر</span>
                </div>
                <div className="text-sm text-gray-400">الباقة المتكاملة للنشاطات الجادة</div>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "إعلانات غير محدودة",
                  "بوت AI متطور",
                  "جمع أرقام هواتف غير محدود",
                  "واتساب + فيسبوك + إنستجرام",
                  "إحصائيات دقيقة للإعلانات",
                  "دعم فني مخصص (VIP)",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="block text-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 font-black hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/30"
              >
                اشترك الآن
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            💳 طرق الدفع: بريدي موب (BaridiMob) أو الحساب البريدي الجاري (CCP)
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ قصص نجاح
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              وكالات تثق <span className="gradient-text">بنا</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
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
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-4 py-2 text-sm font-bold mb-4">
              ✦ الأسئلة الشائعة
            </div>
            <h2 className="text-4xl font-black text-gray-900">أسئلة وأجوبة</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient py-24 px-4 sm:px-6 relative overflow-hidden">
        <ParticlesBg />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-4 py-2 text-sm font-bold mb-6">
            ✦ ابدأ اليوم
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            جاهز لتحويل الاستفسارات
            <span className="gradient-text"> إلى مبيعات؟</span>
          </h2>
          <p className="text-white/70 mb-10 text-lg">
            سجّل مجاناً وابدأ في دقائق. لا بطاقة بنكية مطلوبة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 font-black px-8 py-4 rounded-2xl text-lg hover:from-emerald-400 hover:to-teal-300 transition-all shadow-2xl shadow-emerald-500/40 hover:scale-[1.03]"
            >
              ابدأ مجاناً
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-black text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>Taysir <span className="text-emerald-400">One</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
              <a href="mailto:contact@taysir.one" className="hover:text-white transition-colors">تواصل معنا</a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 Taysir One. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
