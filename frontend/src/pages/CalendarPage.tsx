
import { useTranslation } from "react-i18next";
import PostCalendar from "@/components/calendar/PostCalendar";

const CalendarPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-6">{t("sidebar.calendar")}</h1>
      <div className="h-[calc(100%-5rem)]">
        <PostCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
