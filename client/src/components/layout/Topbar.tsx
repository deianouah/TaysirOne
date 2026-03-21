import { Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { LanguageSelector } from "@/components/language-selector";
import { useSidebar } from "@/contexts/sidebar-context";

export default function Topbar() {
  const { logout, user } = useAuth();
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </button>
          <div>
            <p className="text-sm text-gray-500">مرحباً 👋</p>
            <p className="text-lg font-semibold text-gray-900">
              Bienvenue sur <span className="text-indigo-600">TaysirOne</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-500">Français</span>
            <LanguageSelector />
          </div>

          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>تسجيل الخروج</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
