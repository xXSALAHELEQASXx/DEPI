
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThemeStore, useLanguageStore } from "@/store/useStore";
import ThemeProvider from "./components/layout/ThemeProvider";
import i18n from "./i18n/i18n";

// Page components
import SplashScreen from "./pages/SplashScreen";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Composer from "./pages/Composer";
import CalendarPage from "./pages/CalendarPage";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";

// Layout components
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => {
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();

  // Initialize language direction and theme
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
    
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [language, theme]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route index element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes with AppLayout */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/composer" element={<Composer />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/assistant" element={<Assistant />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
