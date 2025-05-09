import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Layout, Calendar, AirVent, ChevronLeft, ChevronRight, Bot } from "lucide-react";
import { useSidebarStore, useLanguageStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const { language } = useLanguageStore();
  const { t } = useTranslation();
  
  const rtl = language === 'ar';
  
  const menuItems = [
    {
      path: "/dashboard",
      name: t("sidebar.dashboard"),
      icon: <Home className="w-5 h-5" />
    },
    {
      path: "/posts",
      name: t("sidebar.posts"),
      icon: <Layout className="w-5 h-5" />
    },
    {
      path: "/calendar",
      name: t("sidebar.calendar"),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      path: "/assistant",
      name: t("sidebar.assistant"),
      icon: <Bot className="w-5 h-5" />
    }
  ];

  const sidebarClasses = cn(
    "h-[calc(100vh-4rem)] bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r",
    {
      "w-16": !isExpanded,
      "w-64": isExpanded,
      "border-l border-r-0": rtl
    }
  );

  return (
    <aside className={sidebarClasses + " sticky top-0 z-30"}>
      <div className="p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-auto"
        >
          {isExpanded ? (
            rtl ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors duration-200",
                    {
                      "bg-sidebar-accent text-sidebar-accent-foreground": isActive,
                      "hover:bg-sidebar-accent/50": !isActive,
                      "justify-center": !isExpanded,
                      "justify-start": isExpanded,
                      "flex-row-reverse": rtl && isExpanded,
                    }
                  )}
                >
                  <span className={rtl && isExpanded ? "ml-3" : ""}>{item.icon}</span>
                  {isExpanded && (
                    <span className={cn("transition-opacity duration-200", {
                      "opacity-0": !isExpanded,
                      "opacity-100 ml-3": isExpanded && !rtl,
                      "opacity-100 mr-3": isExpanded && rtl,
                    })}>
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
