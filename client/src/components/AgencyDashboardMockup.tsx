import React from "react";
import { BarChart3, MessageSquare, Home, Car, Bot, Star, Activity, Users, Calendar, Percent } from "lucide-react";

const AgencyDashboardMockup = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-24 animate-[fadeInUp_1s_ease-out]">
      {/* Mockup Container */}
      <div className="rounded-xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-500/20 overflow-hidden text-right" dir="rtl">
        
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-1 max-w-sm mx-4 bg-white px-3 py-1 rounded-md text-xs text-center text-gray-500 font-mono shadow-sm border border-gray-200/50 flex items-center justify-center gap-2">
            <span className="text-gray-400">🔒</span> taysir.one/agency/dashboard
          </div>
          <div className="w-12"></div> {/* spacer for centering */}
        </div>

        {/* Dashboard Body */}
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50/50 border-l border-gray-200 p-6 flex flex-col gap-2">
            <div className="flex items-center gap-3 text-emerald-600 font-bold mb-6 px-3">
              <span className="text-xl">📊</span>
              <span>لوحة التحكم</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <span className="text-lg">💬</span>
              <span className="font-medium">الرسائل</span>
              <span className="mr-auto bg-emerald-100 text-emerald-700 text-xs py-0.5 px-2 rounded-full font-bold">12</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <span className="text-lg">🏠</span>
              <span className="font-medium">العقارات</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <span className="text-lg">🚗</span>
              <span className="font-medium">السيارات</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <span className="text-lg">🤖</span>
              <span className="font-medium">بوت AI</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm cursor-pointer transition-all mt-auto border-t border-gray-200/50 pt-4">
              <span className="text-lg">⭐</span>
              <span className="font-medium">الاشتراك</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-8 bg-white/50">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">مرحبا بك 👋</h1>
              <p className="text-gray-500">حالة الوكالة اليوم — متابعة فورية</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
                <div className="text-gray-400 mb-2"><Users className="w-5 h-5 text-emerald-600" /></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
                <div className="text-sm text-gray-500 font-medium">زبون محتمل (Lead)</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
                <div className="text-gray-400 mb-2"><Calendar className="w-5 h-5 text-blue-600" /></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-sm text-gray-500 font-medium">موعد معاينة</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
                <div className="text-gray-400 mb-2"><Activity className="w-5 h-5 text-violet-600" /></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                <div className="text-sm text-gray-500 font-medium">إعلانات نشطة</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all">
                <div className="text-orange-500 mb-2"><Percent className="w-5 h-5 bg-orange-50 p-1 rounded" /></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-500 font-medium">سرعة الرد</div>
              </div>
            </div>

            {/* Fake Chart Section */}
            <div className="mb-8 bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">نمو الزبائن المحتملين (Leads) دراسة أسبوعية</h2>
              <div className="w-full h-32 flex items-end justify-between gap-2 px-2">
                {[30, 45, 25, 60, 80, 50, 100].map((h, i) => (
                  <div key={i} className="w-full bg-emerald-500/80 rounded-t-sm transition-all hover:bg-emerald-600 cursor-pointer relative group" style={{ height: `${h}%` }}>
                     <div className="absolute -top-8 right-1/2 translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h * 5}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                <span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span>
              </div>
            </div>

            {/* Active Items */}
            <h2 className="text-lg font-bold text-gray-800 mb-4">أفضل الإعلانات أداءً في مسنجر وواتساب</h2>
            <div className="space-y-3">
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-2xl">🏠</div>
                  <div>
                    <h3 className="font-bold text-gray-900">شقة F4 بومرداس</h3>
                    <p className="text-sm text-gray-500">42 زبون مهتم بالمعاينة</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">نشط</span>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">🚗</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dacia Stepway 2022</h3>
                    <p className="text-sm text-gray-500">18 زبون مهتم (تم تأكيد 3 مواعيد)</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">نشط</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Trust Stats Below Mockup */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center border-t border-gray-200/50 pt-10">
        <div>
          <div className="text-3xl font-black text-gray-900 mb-1">200+</div>
          <p className="text-gray-500 font-medium">Professionnels & Pros</p>
        </div>
        <div>
          <div className="text-3xl font-black text-gray-900 mb-1">5.000+</div>
          <p className="text-gray-500 font-medium">Leads / Mois</p>
        </div>
        <div>
          <div className="text-3xl font-black text-gray-900 mb-1">48</div>
          <p className="text-gray-500 font-medium">Wilayas couvertes</p>
        </div>
        <div>
          <div className="text-3xl font-black text-emerald-600 mb-1">98%</div>
          <p className="text-gray-500 font-medium">Précision de l'IA</p>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboardMockup;
