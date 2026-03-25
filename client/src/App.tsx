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

import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChannelProvider } from "@/contexts/channel-context";
import { UnreadCountProvider } from "@/contexts/UnreadCountContext";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { SocketProvider } from "./contexts/socket-context";
import { useI18n } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Contacts from "@/pages/contacts";
import Campaigns from "@/pages/campaigns";
import Templates from "@/pages/templates";
import Inbox from "@/pages/inbox";
import Automations from "@/pages/automations";
import Analytics from "@/pages/analytics";
import CampaignAnalytics from "@/pages/campaign-analytics";
import Settings from "@/pages/settings";
import Logs from "@/pages/logs";
import Team from "@/pages/team";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Topbar from "@/components/layout/Topbar";
import Account from "./pages/account";
import { AppLayout } from "./components/layout/AppLayout";
import ChatbotBuilder from "./pages/chatbot-builder";
import AddChatbotBuilder from "./pages/add-chatbot-builder";
import WidgetBuilder from "./pages/widget-builder";
import Websites from "./pages/websites";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import LoadingAnimation from "./components/LoadingAnimation";
import Plans from "./pages/plans";
import GatewaySettings from "./pages/GatewaySettings";
import BotFlowBuilder from "./pages/BotFlowBuilder";
import Workflows from "./pages/Workflows";
import AIAssistant from "./pages/AIAssistant";
import AutoResponses from "./pages/AutoResponses";
import WABAConnection from "./pages/WABAConnection";
import MultiNumber from "./pages/MultiNumbert";
import Webhooks from "./pages/Webhooks";
import QRCodes from "./pages/QRCodes";
import CRMSystem from "./pages/CRMSystem";
import LeadManagement from "./pages/LeadManagement";
import ProductsPage from "./pages/products";
import BulkImport from "./pages/BulkImport";
import Segmentation from "./pages/Segmentation";
import HealthMonitor from "./pages/HealthMonitor";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import UserNotifications from "./pages/UserNotifications";
import ChatHub from "./pages/ChatHub";
import User from "./pages/users";
import TransactionsPage from "./pages/transactions-page";
import ContactsManagements from "./pages/contacts-managements";
import SupportTicketsNew from "./pages/support-tickets";
import userDetails from "./pages/userDetails";
import UserSupportTicketsNew from "./pages/user-support-tickets";
import BillingSubscriptionPage from "./components/billing-subscription-page";
import GroupsUI from "./pages/group-list";
import AllSubscriptionsPage from "./pages/masterSubscriptions";
import DemoPage from "./pages/DemoPage";
import MinimalLoader from "./components/MinimalLoader";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import VerifyEmail from "./pages/verify-email";
import AboutUs from "./pages/AboutUs";
import { ScrollToTop } from "./components/ScrollToTop";
import Integrations from "./components/Integrations";
import PressKit from "./components/PressKit";
import CaseStudies from "./components/CaseStudies";
import WhatsAppGuide from "./components/WhatsAppGuide";
import BestPractices from "./components/BestPractices";
import CookiePolicy from "./components/CookiePolicy";
import ContactusLanding from "./components/ContactusLanding";
import { SignupPopupHandler } from "./components/SignupPopupHandler";
import Careers from "./components/Careers";
import LanguageManagement from "./pages/LanguageManagement";
import SuperadminMessageLogs from "./pages/SuperadminMessageLogs";
import ApiDocs from "./pages/api-docs";
import ChannelsManagement from "./pages/channels-management";
import LandingPage from "./pages/LandingPage";
import OnboardingFlow from "./pages/OnboardingFlow";
import BotSettings from "./pages/BotSettings";
import SubscriptionsPage from "./pages/SubscriptionsPage";

// Define route permissions mapping
const ROUTE_PERMISSIONS: Record<string, string> = {
  "/contacts": "contacts.view",
  "/campaigns": "campaigns.view",
  "/templates": "templates.view",
  "/inbox": "inbox.view",
  "/team": "team.view",
  "/automation": "automations.view",
  "/analytics": "analytics.view",
  // "/analytics/campaign/:campaignId": "analytics.view",
  "/logs": "logs.view",
  "/settings": "settings.view",
  "/account": "",
  "/bot-builder": "",
};

function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}

// Permission wrapper component
function PermissionRoute({
  component: Component,
  requiredPermission,
  requiredRoles,
}: Readonly<{
  component: React.ComponentType;
  requiredPermission?: string;
  requiredRoles?: string[];
}>) {
  const { user } = useAuth();

  if (requiredRoles && requiredRoles.length > 0) {
    if (!user?.role || !requiredRoles.includes(user.role)) {
      return <UnauthorizedPage />;
    }
  }

  const hasPermission = (permission?: string) => {
    if (!permission) return true;
    if (!user?.permissions) return false;
    if (user.role === "superadmin") return true;

    const perms = Array.isArray(user.permissions)
      ? user.permissions
      : Object.keys(user.permissions);

    if (perms.includes("*")) return true;

    const normalize = (str: string) => str.replace(".", ":");

    return perms.some(
      (perm) =>
        perm.startsWith(normalize(permission)) &&
        (Array.isArray(user.permissions) ? true : user.permissions[perm])
    );
  };

  if (!hasPermission(requiredPermission)) {
    return <UnauthorizedPage />;
  }

  return <Component />;
}

function ProtectedRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [location, setLocation] = useLocation();

  // Check flag immediately on mount - synchronously
  const fromLoginFlag =
    typeof window !== "undefined" &&
    sessionStorage.getItem("fromLogin") === "true";

  const [showLoading, setShowLoading] = useState(fromLoginFlag);
  const [isLoginRedirect] = useState(fromLoginFlag);

  // Clear flag immediately after reading
  useEffect(() => {
    if (fromLoginFlag) {
      sessionStorage.removeItem("fromLogin");
    }
  }, [fromLoginFlag]);

  // Check if user has access to current route
  useEffect(() => {
    if (isAuthenticated && user && location !== "/") {
      const requiredPermission = ROUTE_PERMISSIONS[location];

      if (requiredPermission && !hasRoutePermission(requiredPermission, user)) {
        setLocation("/dashboard");
      }
    }
  }, [location, isAuthenticated, user, setLocation]);

  // Priority 1: Show login animation loader immediately
  if (showLoading && isLoginRedirect) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
        <LoadingAnimation onComplete={() => setShowLoading(false)} />
      </div>
    );
  }

  // Priority 2: Show minimal loader during auth check
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
        <MinimalLoader onComplete={() => {}} duration={1500} color="green" />
      </div>
    );
  }

  // Priority 3: Not authenticated - show public routes
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" component={Home} />
          <Route component={Home} />
        </Switch>
        <Footer />
      </>
    );
  }

  // Priority 4: Authenticated - show dashboard and protected routes
  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 ltr:lg:ml-64 rtl:lg:mr-64">
        <Topbar />
        <div className="pt-5">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route
              path="/contacts"
              component={() => (
                <PermissionRoute component={Contacts} requiredPermission="contacts:view" />
              )}
            />
            <Route
              path="/users"
              component={() => (
                <PermissionRoute component={User} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/channels-management"
              component={() => (
                <PermissionRoute component={ChannelsManagement} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/users/:id"
              component={() => (
                <PermissionRoute component={userDetails} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/campaigns"
              component={() => (
                <PermissionRoute component={Campaigns} requiredPermission="campaigns:view" />
              )}
            />
            <Route
              path="/templates"
              component={() => (
                <PermissionRoute component={Templates} requiredPermission="templates:view" />
              )}
            />
            <Route
              path="/inbox"
              component={() => (
                <PermissionRoute component={Inbox} requiredPermission="inbox:view" />
              )}
            />
            <Route path="/plans" component={Plans} />
            <Route
              path="/gateway"
              component={() => (
                <PermissionRoute component={GatewaySettings} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/languages"
              component={() => (
                <PermissionRoute component={LanguageManagement} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/team"
              component={() => (
                <PermissionRoute component={Team} requiredPermission="team:view" />
              )}
            />
            <Route
              path="/automation"
              component={() => (
                <PermissionRoute component={Automations} requiredPermission="automations:view" />
              )}
            />
            <Route path="/analytics" component={Analytics} />
            <Route path="/websites" component={Websites} />
            <Route path="/add/chatbot-builder" component={AddChatbotBuilder} />
            <Route path="/widget-builder" component={WidgetBuilder} />
            <Route path="/chatbot-builder" component={ChatbotBuilder} />
            <Route
              path="/settings"
              component={() => (
                <PermissionRoute component={Settings} requiredPermission="settings:view" />
              )}
            />
            <Route path="/analytics/campaign/:campaignId" component={CampaignAnalytics} />
            <Route path="/account" component={Account} />
            <Route path="/bot-builder" component={BotFlowBuilder} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/ai-assistant" component={AIAssistant} />
            <Route path="/auto-responses" component={AutoResponses} />
            <Route path="/waba-connection" component={WABAConnection} />
            <Route path="/multi-number" component={MultiNumber} />
            <Route path="/webhooks" component={Webhooks} />
            <Route path="/qr-codes" component={QRCodes} />
            <Route path="/crm-systems" component={CRMSystem} />
            <Route path="/leads" component={LeadManagement} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/bulk-import" component={BulkImport} />
            <Route path="/segmentation" component={Segmentation} />
            <Route
              path="/message-logs"
              component={() => (
                <PermissionRoute component={SuperadminMessageLogs} requiredRoles={["superadmin"]} />
              )}
            />
            <Route path="/health-monitor" component={HealthMonitor} />
            <Route path="/reports" component={Reports} />
            <Route
              path="/transactions-logs"
              component={() => (
                <PermissionRoute component={TransactionsPage} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/contacts-management"
              component={() => (
                <PermissionRoute component={ContactsManagements} requiredRoles={["superadmin"]} />
              )}
            />
            <Route
              path="/support-tickets"
              component={() => (
                <PermissionRoute component={SupportTicketsNew} requiredRoles={["superadmin"]} />
              )}
            />
            <Route path="/groups" component={GroupsUI} />
            <Route
              path="/api-docs"
              component={() => (
                <PermissionRoute component={ApiDocs} requiredRoles={["admin"]} />
              )}
            />
            <Route path="/user-support-tickets" component={UserSupportTicketsNew} />
            <Route path="/plan-upgrade" component={Plans} />
            <Route path="/billing" component={BillingSubscriptionPage} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/user-notifications" component={UserNotifications} />
            <Route path="/chat-hub" component={ChatHub} />
            <Route
              path="/master-subscriptions"
              component={() => (
                <PermissionRoute component={AllSubscriptionsPage} requiredRoles={["superadmin"]} />
              )}
            />
            <Route path="/bot-settings" component={BotSettings} />
            <Route path="/my-subscription" component={SubscriptionsPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

// Helper function to check route permissions
function hasRoutePermission(permission: string, user: any) {
  if (!user?.permissions) return false;
  if (user.role === "superadmin") return true;

  const perms = Array.isArray(user.permissions)
    ? user.permissions
    : Object.keys(user.permissions);

  if (perms.includes("*")) return true;

  const normalize = (str: string) => str.replace(".", ":");

  return perms.some(
    (perm: string) =>
      perm.startsWith(normalize(permission)) &&
      (Array.isArray(user.permissions) ? true : user.permissions[perm])
  );
}

// Custom hook for permission checking
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string) => {
    if (!user?.permissions) return false;

    const perms = Array.isArray(user.permissions)
      ? user.permissions
      : Object.keys(user.permissions);

    const normalize = (str: string) => str.replace(".", ":");
    const normalizedPermission = normalize(permission);

    return perms.some(
      (perm) =>
        perm.startsWith(normalizedPermission) &&
        (Array.isArray(user.permissions) ? true : user.permissions[perm])
    );
  };

  const canAccessRoute = (route: string) => {
    const requiredPermission = ROUTE_PERMISSIONS[route];
    return requiredPermission ? hasPermission(requiredPermission) : true;
  };

  return { hasPermission, canAccessRoute, user };
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <SignupPopupHandler />
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route path="/onboarding" component={OnboardingFlow} />
        <Route path="/demo">
          <>
            <DemoPage />
          </>
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/verify-email">
          <>
            <Header />
            <VerifyEmail />
            <Footer />
          </>
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/privacy-policy">
          <>
            <Header />
            <PrivacyPage />
            <Footer />
          </>
        </Route>
        <Route path="/terms">
          <>
            <Header />
            <TermsPage />
            <Footer />
          </>
        </Route>
        <Route path="/about">
          <>
            <Header />
            <AboutUs />
            <Footer />
          </>
        </Route>
        <Route path="/integrations">
          <>
            <Header />
            <Integrations />
            <Footer />
          </>
        </Route>
        <Route path="/press-kit">
          <>
            <Header />
            <PressKit />
            <Footer />
          </>
        </Route>
        <Route path="/case-studies">
          <>
            <Header />
            <CaseStudies />
            <Footer />
          </>
        </Route>
        <Route path="/whatsapp-guide">
          <>
            <Header />
            <WhatsAppGuide />
            <Footer />
          </>
        </Route>
        <Route path="/best-practices">
          <>
            <Header />
            <BestPractices />
            <Footer />
          </>
        </Route>
        <Route path="/cookie-policy">
          <>
            <Header />
            <CookiePolicy />
            <Footer />
          </>
        </Route>
        <Route path="/contact">
          <>
            <Header />
            <ContactusLanding />
            <Footer />
          </>
        </Route>
        <Route path="/careers">
          <>
            <Header />
            <Careers />
            <Footer />
          </>
        </Route>
        <Route path="/">
          <>
            <Header />
            <Home />
            <Footer />
          </>
        </Route>
        <Route component={ProtectedRoutes} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    useI18n.getState().fetchEnabledLanguages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <AuthProvider>
          <SocketProvider>
          <ChannelProvider>
            <TooltipProvider>
              <UnreadCountProvider>
                <Toaster />
                <Router />
              </UnreadCountProvider>
            </TooltipProvider>
          </ChannelProvider>
          </SocketProvider>
        </AuthProvider>
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
