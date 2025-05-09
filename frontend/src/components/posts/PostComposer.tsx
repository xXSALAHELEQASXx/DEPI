import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

interface SocialPlatform {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: "#E1306C",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "#1877F2",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.097 10.097 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    color: "#1DA1F2",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "#0077B5",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: "#000000",
  },
];

const PostComposer = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [image, setImage] = useState<string | null>(null);
  
  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Preview Section */}
      <div className="w-full md:w-1/3 order-2 md:order-1">
        <div className="sticky top-4">
          <h2 className="text-lg font-semibold mb-4">{t("composer.previewPost")}</h2>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2">
              <div className="flex items-center text-white">
                <span className="text-sm font-semibold">Instagram Preview</span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <div>
                  <p className="font-semibold text-sm">username</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Today"}
                  </p>
                </div>
              </div>
              
              {image && (
                <div className="mb-3 rounded overflow-hidden bg-muted aspect-square">
                  <img 
                    src={image} 
                    alt="Uploaded preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-sm mb-3">{content || "Your post content will appear here..."}</p>
              
              <div className="flex items-center justify-between border-t pt-3 text-muted-foreground">
                <div className="flex space-x-4">
                  <span>♥</span>
                  <span>💬</span>
                  <span>↗</span>
                </div>
                <span>⋯</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Editor Section */}
      <div className="w-full md:w-2/3 order-1 md:order-2 space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <h2 className="text-lg font-semibold w-full mb-2">{t("composer.selectPlatform")}</h2>
          {socialPlatforms.map(platform => (
            <Button
              key={platform.id}
              variant="outline"
              className={cn(
                "flex items-center gap-2",
                selectedPlatforms.includes(platform.id) ? "border-[#7b3ff2]" : ""
              )}
              style={{
                backgroundColor: selectedPlatforms.includes(platform.id) ? "#7b3ff2" : "transparent",
                color: selectedPlatforms.includes(platform.id) ? "white" : "inherit"
              }}
              onClick={() => handlePlatformToggle(platform.id)}
            >
              <span style={{ color: selectedPlatforms.includes(platform.id) ? "white" : platform.color }}>
                {platform.icon}
              </span>
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
        
        <div>
          <Textarea
            placeholder={t("composer.textPlaceholder")}
            className="min-h-[150px] text-base resize-none mb-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <UploadCloud className="h-4 w-4" />
              <span>{t("composer.addMedia")}</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Button>
            
            {image && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={clearImage}
              >
                Remove
              </Button>
            )}
          </div>
          
          <h3 className="text-base font-medium mb-3">{t("composer.schedulePost")}</h3>
          <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
            <div className="w-full md:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex space-x-2">
              {["09:00", "12:00", "15:00", "18:00", "21:00"].map((time) => (
                <Button 
                  key={time}
                  variant="outline"
                  size="sm"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button className="bg-[#7b3ff2] hover:bg-[#6a35d1]">
              {selectedDate && !isToday(selectedDate) 
                ? t("composer.schedulePost") 
                : t("composer.publishNow")}
            </Button>
            <Button variant="outline">Save as Draft</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export default PostComposer;