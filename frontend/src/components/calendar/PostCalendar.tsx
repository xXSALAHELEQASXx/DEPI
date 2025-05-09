
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { arSA } from "date-fns/locale/ar-SA";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguageStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";

// Add the CSS from react-big-calendar
import "react-big-calendar/lib/css/react-big-calendar.css";

interface PostEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  platform: "instagram" | "facebook" | "twitter" | "tiktok" | "linkedin";
  status: "draft" | "scheduled" | "published";
}

const sampleEvents: PostEvent[] = [
  {
    id: '1',
    title: "Summer Sale Announcement",
    start: new Date(new Date().setDate(new Date().getDate() - 3)),
    end: new Date(new Date().setDate(new Date().getDate() - 3)),
    platform: "instagram",
    status: "published"
  },
  {
    id: '2',
    title: "Product Launch",
    start: new Date(),
    end: new Date(),
    platform: "facebook",
    status: "scheduled"
  },
  {
    id: '3',
    title: "Customer Testimonial",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    platform: "twitter",
    status: "draft"
  },
  {
    id: '4',
    title: "Weekend Special",
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
    platform: "instagram",
    status: "scheduled"
  }
];

const platformColors: Record<string, string> = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  facebook: "bg-blue-600 text-white",
  twitter: "bg-blue-400 text-white",
  tiktok: "bg-gray-900 text-white",
  linkedin: "bg-blue-700 text-white"
};

const statusBorders: Record<string, string> = {
  draft: "border-dashed border-gray-400",
  scheduled: "border-solid border-green-400",
  published: "border-none"
};

const PostCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<PostEvent | null>(null);
  const { language } = useLanguageStore();
  const { t } = useTranslation();
  
  const locales = {
    'en': enUS,
    'ar': arSA
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: locales[language as keyof typeof locales] }),
    getDay,
    locales: {
      'en': enUS,
      'ar': arSA
    }
  });

  const handleSelectEvent = (event: PostEvent) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event: PostEvent) => {
    return {
      className: `${platformColors[event.platform]} ${statusBorders[event.status]} overflow-hidden rounded-md border`,
      style: {
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: event.status === 'draft' ? '2px dashed #9ca3af' : 
               event.status === 'scheduled' ? '2px solid #10b981' : 'none'
      }
    };
  };

  const CustomToolbar = ({ onNavigate, label }: any) => (
    <div className="flex justify-between items-center mb-4 px-4 py-2">
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate('TODAY')}>
          Today
        </Button>
        <div className="flex">
          <Button variant="outline" size="icon" className="rounded-r-none" onClick={() => onNavigate('PREV')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-l-none" onClick={() => onNavigate('NEXT')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{label}</h2>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate('month')}>
          Month
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('week')}>
          Week
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('day')}>
          Day
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <style>{`
          .rbc-calendar {
            height: 100% !important;
            font-family: inherit;
          }
          .rbc-header {
            padding: 8px 0;
            font-weight: 500;
            font-size: 0.875rem;
            background-color: var(--background);
            border-bottom: 1px solid var(--border);
          }
          .rbc-off-range-bg {
            background-color: var(--secondary);
          }
          .rbc-today {
            background-color: rgba(139, 92, 246, 0.1);
          }
          .rbc-event {
            border-radius: 4px;
            padding: 2px 5px;
            font-size: 0.85rem;
          }
          .rbc-event-content {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .rbc-toolbar button {
            color: var(--foreground);
            border: 1px solid var(--border);
          }
          .rbc-toolbar button:hover {
            background-color: var(--accent);
            color: var(--accent-foreground);
          }
          .rbc-toolbar button.rbc-active {
            background-color: var(--primary);
            color: var(--primary-foreground);
          }
          .rbc-btn-group button {
            border-radius: 4px;
          }
          // For RTL support
          html[dir="rtl"] .rbc-btn-group > button:first-child:not(:last-child) {
            border-radius: 0 4px 4px 0;
          }
          html[dir="rtl"] .rbc-btn-group > button:last-child:not(:first-child) {
            border-radius: 4px 0 0 4px;
          }
          html[dir="rtl"] .rbc-toolbar {
            flex-direction: row-reverse;
          }
        `}</style>
        <Calendar
          localizer={localizer}
          events={sampleEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          style={{ height: "100%", width: "100%" }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
          rtl={language === 'ar'}
          messages={{
            today: t("common.today", "Today"),
            previous: t("common.previous", "Previous"),
            next: t("common.next", "Next"),
            month: t("common.month", "Month"),
            week: t("common.week", "Week"),
            day: t("common.day", "Day"),
          }}
        />
      </div>
      
      {selectedEvent && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selectedEvent.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(selectedEvent.start, 'MMMM d, yyyy')} • {format(selectedEvent.start, 'h:mm a')}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-sm uppercase ${platformColors[selectedEvent.platform]} text-white`}>
                {selectedEvent.platform}
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-block px-2 py-1 text-xs rounded-full
                ${selectedEvent.status === 'draft' ? 'bg-gray-100 text-gray-700' : 
                  selectedEvent.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                  'bg-green-100 text-green-700'}`}
              >
                {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="outline">Delete</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostCalendar;
