
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface LinkifyLogoProps {
  className?: string;
  showText?: boolean;
}

const LinkifyLogo = ({ className, showText = true }: LinkifyLogoProps) => {
  const { t } = useTranslation();
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="w-3 h-2 bg-linkify-300 rounded transform -rotate-12 mb-0.5"></div>
          <div className="w-4 h-2 bg-linkify-500 rounded transform -rotate-12 mb-0.5"></div>
          <div className="w-5 h-2 bg-linkify-700 rounded transform -rotate-12"></div>
        </div>
        {showText && (
          <span className="text-2xl font-bold ml-2 text-linkify-700">
            {t("common.appName")}
          </span>
        )}
      </div>
    </div>
  );
};

export default LinkifyLogo;
