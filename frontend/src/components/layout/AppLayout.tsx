
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore, useLanguageStore } from "@/store/useStore";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  const location = useLocation();
  const rtl = language === 'ar';

  // Check localStorage directly in case the store hasn't been updated
  const storedUser = localStorage.getItem('linkify_user');
  const hasUserInStorage = !!storedUser;

  useEffect(() => {
    // If not authenticated either in store or localStorage, redirect to login
    if (!isAuthenticated && !hasUserInStorage && 
        location.pathname !== '/login' && 
        location.pathname !== '/register' && 
        location.pathname !== '/otp-verification') {
      navigate("/login");
    }
  }, [isAuthenticated, hasUserInStorage, navigate, location.pathname]);

  const layoutClasses = cn(
    "flex min-h-screen flex-col",
    rtl ? "text-right" : "text-left",
    {
      "font-arabic": rtl,
    }
  );

  return (
    <div className={layoutClasses}>
      <Header />
      <div className={cn("flex flex-1", rtl && "flex-row-reverse")}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
