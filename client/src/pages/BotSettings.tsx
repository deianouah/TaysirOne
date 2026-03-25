import React, { useState } from "react";
import {
  Bot, Save, Plus, Trash2, Globe, MessageSquare,
  ChevronDown, ChevronUp, Zap, CheckCircle, AlertCircle,
  Edit3, ToggleLeft, ToggleRight, Settings, Eye, EyeOff, RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProductItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
}

interface BotConfig {
  botName: string;
  greeting: string;
  language: string;
  collectPhone: boolean;
  collectName: boolean;
  filterNonSerious: boolean;
  autoReply: boolean;
  workingHours: { start: string; end: string };
  offlineMessage: string;
  products: ProductItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2, 9);

const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        enabled ? "bg-emerald-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

// ─── Bot Settings Page ────────────────────────────────────────────────────────
export default function BotSettingsPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "products" | "messages" | "preview">("general");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const [config, setConfig] = useState<BotConfig>({
    botName: "مساعد Taysir",
    greeting: "مرحباً! 👋 أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟",
    language: "ar",
    collectPhone: true,
    collectName: true,
    filterNonSerious: true,
    autoReply: true,
    workingHours: { start: "08:00", end: "22:00" },
    offlineMessage: "شكراً على تواصلك! سنرد عليك قريباً خلال ساعات العمل.",
    products: [
      {
        id: "p1",
        name: "شقة F4 بومرداس",
        price: "12,500,000",
        description: "شقة F4 واسعة، دور 3، بالقرب من الجامعة. تشمل: 4 غرف، صالة، مطبخ حديث، مرآب.",
        category: "عقارات",
      },
      {
        id: "p2",
        name: "Dacia Stepway 2022",
        price: "3,200,000",
        description: "سيارة Dacia Stepway موديل 2022، فضية اللون، 28,000 كم، حالة ممتازة.",
        category: "سيارات",
      },
    ],
  });

  const [newProduct, setNewProduct] = useState<Omit<ProductItem, "id">>({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  const update = (key: keyof BotConfig, val: any) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  const addProduct = () => {
    if (!newProduct.name.trim()) {
      toast({ title: "تنبيه", description: "أدخل اسم المنتج أو العرض", variant: "destructive" });
      return;
    }
    setConfig((prev) => ({
      ...prev,
      products: [...prev.products, { id: generateId(), ...newProduct }],
    }));
    setNewProduct({ name: "", price: "", description: "", category: "" });
    setShowAddProduct(false);
  };

  const removeProduct = (id: string) =>
    setConfig((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id) }));

  const updateProduct = (id: string, field: keyof Omit<ProductItem, "id">, val: string) =>
    setConfig((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    }));

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "✅ تم الحفظ", description: "تم حفظ إعدادات البوت بنجاح" });
    }, 1200);
  };

  const tabs = [
    { id: "general", label: "الإعدادات العامة", icon: Settings },
    { id: "products", label: "العروض والمنتجات", icon: Zap },
    { id: "messages", label: "رسائل البوت", icon: MessageSquare },
    { id: "preview", label: "معاينة", icon: Eye },
  ] as const;

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
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-lg leading-tight">إعدادات البوت</h1>
              <p className="text-xs text-gray-500">اضبط كيف يرد البوت على زبائنك</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-5 py-2.5 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 text-sm"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 bg-white rounded-2xl p-1.5 border border-gray-200 mb-6 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap flex-1 justify-center transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── General Tab ── */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Bot identity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-500" />
                هوية البوت
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم البوت</label>
                  <input
                    type="text"
                    value={config.botName}
                    onChange={(e) => update("botName", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                    placeholder="مثال: مساعد متجري"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">لغة الرد</label>
                  <select
                    value={config.language}
                    onChange={(e) => update("language", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors bg-white appearance-none"
                  >
                    <option value="ar">العربية (الدارجة الجزائرية)</option>
                    <option value="ar-msa">العربية الفصحى</option>
                    <option value="fr">الفرنسية</option>
                    <option value="mixed">مزيج (عربية + فرنسية)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Behavior */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                سلوك البوت
              </h3>
              <Toggle
                label="الرد التلقائي مفعّل"
                enabled={config.autoReply}
                onChange={() => update("autoReply", !config.autoReply)}
              />
              <Toggle
                label="جمع رقم هاتف الزبون"
                enabled={config.collectPhone}
                onChange={() => update("collectPhone", !config.collectPhone)}
              />
              <Toggle
                label="طلب اسم الزبون"
                enabled={config.collectName}
                onChange={() => update("collectName", !config.collectName)}
              />
              <Toggle
                label="تجاهل الرسائل غير الجادة (فلترة AI)"
                enabled={config.filterNonSerious}
                onChange={() => update("filterNonSerious", !config.filterNonSerious)}
              />
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-5">ساعات العمل</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">من</label>
                  <input
                    type="time"
                    value={config.workingHours.start}
                    onChange={(e) => update("workingHours", { ...config.workingHours, start: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">إلى</label>
                  <input
                    type="time"
                    value={config.workingHours.end}
                    onChange={(e) => update("workingHours", { ...config.workingHours, end: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                خارج هذه الساعات، يرسل البوت رسالة الغياب التلقائية
              </p>
            </div>
          </div>
        )}

        {/* ── Products Tab ── */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-black text-gray-900">عروضك ومنتجاتك</h3>
                <p className="text-xs text-gray-500 mt-0.5">البوت سيرد بتفاصيل هذه العروض تلقائياً</p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors text-sm shadow-md shadow-emerald-200"
              >
                <Plus className="w-4 h-4" />
                إضافة عرض
              </button>
            </div>

            {showAddProduct && (
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 text-sm">عرض/منتج جديد</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">الاسم *</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none"
                      placeholder="مثال: شقة F4 بومرداس"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">السعر (دج)</label>
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none"
                      placeholder="مثال: 12,500,000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">الفئة</label>
                    <input
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none"
                      placeholder="مثال: عقارات، سيارات..."
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">الوصف والمواصفات</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none resize-none"
                    placeholder="اكتب هنا كل التفاصيل التي يريد الزبون معرفتها..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addProduct}
                    className="flex items-center gap-2 bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-600 text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة
                  </button>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {config.products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      {product.category && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full">
                          {product.category}
                        </span>
                      )}
                      <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                      {product.price && (
                        <span className="text-sm font-black text-emerald-600">{product.price} دج</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct(editingProduct === product.id ? null : product.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {editingProduct === product.id && (
                    <div className="px-5 py-4 bg-gray-50 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">الاسم</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">السعر</label>
                          <input
                            type="text"
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">الوصف</label>
                        <textarea
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {editingProduct !== product.id && product.description && (
                    <div className="px-5 py-3">
                      <p className="text-xs text-gray-500 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>
              ))}

              {config.products.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                  <Zap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-semibold mb-1">لا توجد عروض بعد</p>
                  <p className="text-xs text-gray-400">أضف عروضك ومنتجاتك ليردّ البوت عليها</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Messages Tab ── */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                رسائل البوت
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رسالة الترحيب</label>
                  <textarea
                    value={config.greeting}
                    onChange={(e) => update("greeting", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none resize-none transition-colors"
                    placeholder="مرحباً! أنا المساعد الذكي..."
                  />
                  <p className="text-xs text-gray-400 mt-1.5">هذه الرسالة ترسل عند أول تواصل مع الزبون</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رسالة الغياب (خارج ساعات العمل)</label>
                  <textarea
                    value={config.offlineMessage}
                    onChange={(e) => update("offlineMessage", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none resize-none transition-colors"
                    placeholder="شكراً على تواصلك، سنرد قريباً..."
                  />
                </div>
              </div>
            </div>

            {/* Message templates */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <h4 className="font-black text-amber-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                نماذج رسائل جاهزة
              </h4>
              <div className="space-y-3">
                {[
                  {
                    label: "طلب رقم الهاتف",
                    text: "أهلاً! يسعدنا مساعدتك 😊 هل يمكنك مشاركتي رقم هاتفك لنتواصل معك مباشرة وتقديم عرض خاص لك؟",
                  },
                  {
                    label: "شكر على الاهتمام",
                    text: "شكراً على اهتمامك! سيتصل بك أحد مستشارينا في أقرب وقت. 📞",
                  },
                ].map((t, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-amber-700">{t.label}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(t.text);
                          toast({ title: "✅ نُسخ", description: "تم نسخ قالب الرسالة" });
                        }}
                        className="text-xs text-amber-600 hover:text-amber-800 font-bold"
                      >
                        نسخ
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Preview Tab ── */}
        {activeTab === "preview" && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                معاينة محادثة البوت
              </h3>
              <p className="text-xs text-gray-500 mb-5">هكذا سيبدو البوت عند تواصل الزبون معك</p>

              {/* Chat preview */}
              <div className="bg-gray-100 rounded-2xl p-4 space-y-4 max-w-sm mx-auto" dir="rtl">
                {/* Bot header */}
                <div className="flex items-center gap-3 bg-emerald-600 text-white rounded-xl px-4 py-3 -mx-4 -mt-4 rounded-t-2xl mb-4">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{config.botName}</div>
                    <div className="text-xs text-emerald-200">🟢 متاح الآن</div>
                  </div>
                </div>

                {/* Greeting */}
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-gray-800 max-w-[80%] shadow-sm">
                    {config.greeting}
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-start">
                  <div className="bg-emerald-500 text-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[80%] shadow-sm">
                    شحال سعر الشقة؟
                  </div>
                </div>

                {/* Bot reply */}
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-gray-800 max-w-[80%] shadow-sm space-y-1">
                    {config.products[0] ? (
                      <>
                        <p className="font-bold text-emerald-600">{config.products[0].name}</p>
                        <p className="text-xs">{config.products[0].description}</p>
                        <p className="font-black text-gray-900 text-base mt-1">💰 {config.products[0].price} دج</p>
                      </>
                    ) : (
                      <p>أضف عروضك من تبويب "العروض والمنتجات"</p>
                    )}
                    {config.collectPhone && (
                      <p className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-2">
                        هل يمكنك مشاركتي رقم هاتفك للتواصل معك؟ 📞
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">البوت جاهز للعمل!</p>
                  <p className="text-xs text-emerald-600 mt-0.5">
                    تأكد من ربط المنصات (واتساب / فيسبوك) من صفحة الربط لتفعيل الرد التلقائي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
