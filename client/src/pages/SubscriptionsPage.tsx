import React, { useState } from "react";
import {
  Crown, Clock, CheckCircle, XCircle, AlertTriangle, RefreshCw,
  Calendar, Zap, Phone, CreditCard, Download, ChevronRight,
  Star, ArrowUpRight, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type SubStatus = "active" | "pending" | "expired" | "cancelled";

interface Subscription {
  id: string;
  plan: string;
  price: string;
  status: SubStatus;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  receiptSent: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending";
  plan: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────
const mockSub: Subscription = {
  id: "sub_001",
  plan: "Pro Agency",
  price: "5,000 دج",
  status: "active",
  startDate: "2026-03-01",
  endDate: "2026-04-01",
  paymentMethod: "بريدي موب",
  receiptSent: true,
};

const mockInvoices: Invoice[] = [
  { id: "inv_003", date: "2026-03-01", amount: "5,000 دج", status: "paid", plan: "Pro Agency" },
  { id: "inv_002", date: "2026-02-01", amount: "5,000 دج", status: "paid", plan: "Pro Agency" },
  { id: "inv_001", date: "2026-01-01", amount: "5,000 دج", status: "paid", plan: "Pro Agency" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function daysRemaining(endDate: string) {
  const end = new Date(endDate);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("ar-DZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

const statusConfig: Record<SubStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  active: {
    label: "نشط",
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    icon: CheckCircle,
  },
  pending: {
    label: "في انتظار التأكيد",
    color: "text-amber-700",
    bg: "bg-amber-100",
    icon: Clock,
  },
  expired: {
    label: "منتهي الصلاحية",
    color: "text-red-700",
    bg: "bg-red-100",
    icon: XCircle,
  },
  cancelled: {
    label: "ملغى",
    color: "text-gray-600",
    bg: "bg-gray-100",
    icon: XCircle,
  },
};

// ─── Components ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: SubStatus }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

function ProgressBar({ days, total = 30 }: { days: number; total?: number }) {
  const pct = Math.min((days / total) * 100, 100);
  const urgent = days <= 5;
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${urgent ? "bg-red-400" : "bg-gradient-to-r from-emerald-400 to-teal-400"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SubscriptionsPage() {
  const { toast } = useToast();
  const [sub] = useState<Subscription>(mockSub);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [renewing, setRenewing] = useState(false);

  const days = daysRemaining(sub.endDate);
  const isExpiringSoon = days <= 7 && sub.status === "active";

  const handleRenew = () => {
    setRenewing(true);
    setTimeout(() => {
      setRenewing(false);
      toast({
        title: "✅ تم إرسال طلب التجديد",
        description: "يرجى إتمام الدفع وإرسال الوصل للتفعيل",
      });
    }, 1500);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-lg leading-tight">الاشتراكات</h1>
              <p className="text-xs text-gray-500">إدارة باقتك وسجل المدفوعات</p>
            </div>
          </div>
          {(sub.status === "expired" || isExpiringSoon) && (
            <button
              onClick={handleRenew}
              disabled={renewing}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-5 py-2.5 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all text-sm shadow-lg shadow-emerald-200 disabled:opacity-50"
            >
              {renewing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {renewing ? "جاري التجديد..." : "تجديد الاشتراك"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Urgent banner ── */}
        {isExpiringSoon && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-sm">اشتراكك ينتهي خلال {days} أيام!</p>
              <p className="text-xs mt-0.5 text-red-600">جدد الآن لتجنب انقطاع الخدمة</p>
            </div>
          </div>
        )}

        {/* ── Current Plan Card ── */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">باقتك الحالية</div>
                <h2 className="text-2xl font-black mb-1">{sub.plan}</h2>
                <div className="text-3xl font-black text-emerald-400">{sub.price}</div>
                <div className="text-xs text-gray-400 mt-0.5">شهرياً</div>
              </div>
              <div>
                <StatusBadge status={sub.status} />
              </div>
            </div>

            {sub.status === "active" && (
              <>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">أيام متبقية</span>
                    <span className={`text-sm font-black ${days <= 5 ? "text-red-400" : "text-emerald-400"}`}>
                      {days} يوم
                    </span>
                  </div>
                  <ProgressBar days={days} />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      تاريخ البدء
                    </div>
                    <div className="text-sm font-bold">{formatDate(sub.startDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      تاريخ الانتهاء
                    </div>
                    <div className="text-sm font-bold">{formatDate(sub.endDate)}</div>
                  </div>
                </div>
              </>
            )}

            {sub.status === "pending" && (
              <div className="mt-4 flex items-start gap-3 bg-amber-500/20 border border-amber-400/30 rounded-xl p-4 text-amber-300">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">في انتظار تأكيد الدفع</p>
                  <p className="text-xs mt-0.5 text-amber-400">
                    تم استلام طلبك، يتم مراجعة وصل الدفع وسيتم التفعيل خلال ساعات.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Plan features ── */}
        {sub.status === "active" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              ما تتضمنه باقتك
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "إعلانات غير محدودة",
                "بوت AI متطور",
                "جمع أرقام هواتف غير محدود",
                "واتساب + فيسبوك + إنستجرام",
                "إحصائيات دقيقة للإعلانات",
                "دعم فني مخصص (VIP)",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Payment Info ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            معلومات الدفع
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm text-gray-500 font-semibold">طريقة الدفع</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{sub.paymentMethod}</span>
                <span className="text-lg">{sub.paymentMethod.includes("بريدي") ? "📱" : "🏦"}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm text-gray-500 font-semibold">وصل الدفع</span>
              <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${sub.receiptSent ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                {sub.receiptSent ? <><CheckCircle className="w-3.5 h-3.5" /> تم الإرسال</> : <>لم يُرسل بعد</>}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500 font-semibold">التجديد التالي</span>
              <span className="text-sm font-bold text-gray-900">{formatDate(sub.endDate)}</span>
            </div>
          </div>
        </div>

        {/* ── Invoices ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h3 className="font-black text-gray-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-500" />
              سجل المدفوعات
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{inv.plan}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatDate(inv.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-gray-900">{inv.amount}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    inv.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {inv.status === "paid" ? "✓ مدفوع" : "⏳ قيد الانتظار"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Upgrade/Actions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleRenew}
            disabled={renewing}
            className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200 font-bold"
          >
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5" />
              <div className="text-right">
                <div className="font-black text-sm">تجديد الاشتراك</div>
                <div className="text-xs text-emerald-100 font-normal">5,000 دج / شهر</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <button
            onClick={() => window.open("https://wa.me/213XXXXXXXXX", "_blank")}
            className="flex items-center justify-between p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all font-bold text-gray-700"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <div className="text-right">
                <div className="font-black text-sm">تواصل مع الدعم</div>
                <div className="text-xs text-gray-400 font-normal">مساعدة في الاشتراك</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 rotate-180 text-gray-400" />
          </button>
        </div>

        {/* ── Bank details for renewal ── */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
          <h4 className="font-black text-blue-800 mb-3 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            معلومات الدفع للتجديد
          </h4>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="text-xs font-bold text-blue-600 mb-1">📱 بريدي موب (BaridiMob)</div>
              <code className="text-sm font-mono text-gray-900">RIB: 0097999 9999999 99</code>
              <div className="text-xs text-gray-500 mt-1">افتح التطبيق → تحويل → أدخل الـ RIB</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="text-xs font-bold text-blue-600 mb-1">🏦 CCP (الحساب البريدي الجاري)</div>
              <code className="text-sm font-mono text-gray-900">CCP: 1234567 — Clé 89 — Taysir One</code>
              <div className="text-xs text-gray-500 mt-1">مكتب البريد أو ATM → تحويل</div>
            </div>
            <p className="text-xs text-blue-600 font-semibold">
              ⚠️ بعد الدفع، أرسل الوصل عبر واتساب أو من صفحة الاشتراك لتفعيل حسابك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
