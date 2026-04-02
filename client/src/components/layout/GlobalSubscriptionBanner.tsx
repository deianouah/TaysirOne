import { useAuth } from "@/contexts/auth-context";
import { AlertTriangle, Clock, Rocket, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

export function GlobalSubscriptionBanner() {
  const { user, userPlans, isUserPlansLoading } = useAuth();
  const [location, setLocation] = useLocation();

  if (!user || user.role === "superadmin" || isUserPlansLoading) {
    return null;
  }

  // Extract array of plans safely handling API response envelope
  const plansArray = Array.isArray(userPlans) ? userPlans : (userPlans as any)?.data || [];

  const activeSubData = plansArray.find(
    (p: any) => p.subscription.status === "active" || p.subscription.status === "pending_approval"
  )?.subscription;

  // 1. Pending Manual Payment
  if (activeSubData?.status === "pending_approval") {
    return (
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 sm:px-6 flex items-center justify-between text-amber-800 shadow-sm z-50">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Your manual payment is currently under review by an administrator. Your account will be activated shortly.
          </p>
        </div>
      </div>
    );
  }

  // 2. Active Free Trial
  if (activeSubData?.gatewayProvider === "trial" && activeSubData?.status === "active") {
    const endDate = new Date(activeSubData.endDate);
    const now = new Date();
    const diffMs = endDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      return (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-blue-800 shadow-sm z-50 gap-2">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 flex-shrink-0 text-blue-600" />
            <p className="text-sm font-medium">
              You are currently on a free trial. You have <strong className="font-bold">{daysLeft} days</strong> remaining.
            </p>
          </div>
          <button 
            onClick={() => setLocation("/plans")}
            className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
          >
            Upgrade Now
          </button>
        </div>
      );
    }
  }

  // 3. No active subscription or expired trial
  if (!activeSubData || (activeSubData.status === "expired" || activeSubData.status === "cancelled")) {
    return (
      <div className="bg-red-50 border-b border-red-200 px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-red-800 shadow-sm z-50 gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <p className="text-sm font-medium">
            You do not have an active subscription. Please subscribe to a plan to continue using the platform.
          </p>
        </div>
        <button 
          onClick={() => setLocation("/plans")}
          className="text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-3 py-1.5 rounded shadow hover:bg-red-700 transition flex items-center gap-1 shrink-0"
        >
          View Plans <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    );
  }

  // Active paid plan -> show nothing
  return null;
}
