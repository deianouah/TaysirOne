import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Package,
  Bot,
  CreditCard,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";

const navItems = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Messages",
    href: "/inbox",
    icon: MessageSquare,
  },
  {
    label: "Opportunités (Leads)",
    href: "/leads",
    icon: Users,
  },
  {
    label: "Mes Produits & Offres",
    href: "/products",
    icon: Package,
  },
  {
    label: "Bot IA",
    href: "/ai-assistant",
    icon: Bot,
  },
  {
    label: "Abonnement",
    href: "/plans",
    icon: CreditCard,
  },
  {
    label: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Profil",
    href: "/account",
    icon: User,
  },
];

export default function DashboardSidebar() {
  const [location] = useLocation();
  const { isOpen, toggle, close } = useSidebar();
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close drawer when location changes on small screens
  useEffect(() => {
    if (!isLarge) {
      close();
    }
  }, [location, close, isLarge]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 z-50 w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-300",
          "ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l",
          isOpen || isLarge ? "ltr:translate-x-0 rtl:translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="text-lg font-bold text-indigo-600">TaysirOne</div>
            <div className="text-xs text-gray-500">Dashboard SaaS</div>
          </div>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-3 py-4 gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-indigo-600" : "text-gray-400"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-6 py-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500">Compte</p>
          <p className="mt-1 text-sm font-medium text-gray-900">Mon compte</p>
        </div>
      </aside>

      {/* Mobile handle button */}
      {!isLarge && (
        <button
          onClick={toggle}
          className="fixed bottom-4 left-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
