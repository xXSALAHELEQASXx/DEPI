import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataPoint {
  name: string;
  instagram?: number;
  facebook?: number;
  twitter?: number;
  prev?: number;
}

const data: DataPoint[] = [
  { name: 'Jan', instagram: 4000, facebook: 2400, twitter: 1800 },
  { name: 'Feb', instagram: 4200, facebook: 2700, twitter: 2000 },
  { name: 'Mar', instagram: 5000, facebook: 3000, twitter: 2200 },
  { name: 'Apr', instagram: 4800, facebook: 2800, twitter: 2500 },
  { name: 'May', instagram: 5500, facebook: 3200, twitter: 2700 },
  { name: 'Jun', instagram: 6500, facebook: 3800, twitter: 3000 },
  { name: 'Jul', instagram: 7000, facebook: 4200, twitter: 3300 },
  { name: 'Aug', instagram: 7300, facebook: 4500, twitter: 3600 },
];

const platforms = [
  { key: 'instagram', name: 'Instagram', color: '#E1306C' },
  { key: 'facebook', name: 'Facebook', color: '#4267B2' },
  { key: 'twitter', name: 'Twitter', color: '#1DA1F2' },
];

const FollowersChart = () => {
  const [activePlatforms, setActivePlatforms] = useState({
    instagram: true,
    facebook: true,
    twitter: true,
  });
  const isMobile = useIsMobile();

  const togglePlatform = (platform: string) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform as keyof typeof activePlatforms]
    }));
  };

  // Calculate growth percentage from first to last month
  const getGrowthPercentage = (platform: keyof typeof activePlatforms) => {
    const firstValue = data[0][platform];
    const lastValue = data[data.length - 1][platform];
    
    if (firstValue && lastValue) {
      return ((lastValue - firstValue) / firstValue * 100).toFixed(1);
    }
    return "0";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl" style={{ color: "#7b3ff2" }}>Followers Growth</CardTitle>
            <CardDescription>Monthly followers by platform</CardDescription>
          </div>
          <div className={cn(
            "flex flex-wrap gap-2",
            isMobile ? "justify-start" : "justify-end"
          )}>
            {platforms.map(platform => (
              <button
                key={platform.key}
                onClick={() => togglePlatform(platform.key)}
                className={cn("text-xs px-2 py-1 rounded-full transition-all", {
                  "opacity-100 bg-muted": activePlatforms[platform.key as keyof typeof activePlatforms],
                  "opacity-50": !activePlatforms[platform.key as keyof typeof activePlatforms],
                })}
                style={activePlatforms[platform.key as keyof typeof activePlatforms] ? { color: platform.color } : {}}
              >
                {platform.name}
                {activePlatforms[platform.key as keyof typeof activePlatforms] && (
                  <span className="ml-1 text-xs font-normal">
                    +{getGrowthPercentage(platform.key as keyof typeof activePlatforms)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip />
              {activePlatforms.instagram && (
                <Area
                  type="monotone"
                  dataKey="instagram"
                  name="Instagram"
                  stroke="#E1306C"
                  fill="url(#colorInstagram)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
              {activePlatforms.facebook && (
                <Area
                  type="monotone"
                  dataKey="facebook"
                  name="Facebook"
                  stroke="#4267B2"
                  fill="url(#colorFacebook)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
              {activePlatforms.twitter && (
                <Area
                  type="monotone"
                  dataKey="twitter"
                  name="Twitter"
                  stroke="#1DA1F2"
                  fill="url(#colorTwitter)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
              <defs>
                <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4267B2" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4267B2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowersChart;