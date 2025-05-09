import "@/styles/Header.css";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore, useLanguageStore, useThemeStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Moon, Sun, User, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkifyLogo from "@/components/ui/LinkifyLogo";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t, i18n } = useTranslation();

  // Get user from localStorage if not in store
  const storedUserData = localStorage.getItem('linkify_user');
  const storedUser = storedUserData ? JSON.parse(storedUserData) : null;
  const displayUser = user || storedUser;

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('linkify_user');
    logout();
    navigate("/login");
  };

  return (
    <header className={`sticky top-0 z-40 w-full bg-background border-b px-4 py-3 flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''} header`}>
      <div className="flex items-center">
        <LinkifyLogo className="h-9 w-auto header-logo" />
      </div>
      <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5 icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("common.languages.en")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>{language === "en" && "✓ "}English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>{language === "ar" && "✓ "}العربية</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5 icon" />
          ) : (
            <Moon className="h-5 w-5 icon" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={displayUser?.avatar} />
                <AvatarFallback>
                  <User className="h-5 w-5 icon" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{displayUser?.name || "User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>{t("common.profile")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>{t("common.settings")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>{t("common.logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;