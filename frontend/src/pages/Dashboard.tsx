
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/dashboard/StatsCard";
import SocialAccountCard from "@/components/dashboard/SocialAccountCard";
import FollowersChart from "@/components/dashboard/FollowersChart";
import EngagementChart from "@/components/dashboard/EngagementChart";
import ViewsChart from "@/components/dashboard/ViewsChart";
import RecentPostsTable from "@/components/dashboard/RecentPostsTable";
import { Activity, Users, Eye, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for social accounts
  const socialAccounts = [
    {
      platform: "instagram",
      username: "yourbrand",
      stats: { followers: 12500, posts: 243, engagement: 3.2 }
    },
    {
      platform: "facebook",
      username: "YourBrandOfficial",
      stats: { followers: 8700, posts: 187, engagement: 2.1 }
    },
    {
      platform: "twitter",
      username: "yourbrand",
      stats: { followers: 5200, posts: 412, engagement: 1.8 }
    },
    {
      platform: "tiktok",
      username: "yourbrand",
      stats: { followers: 22800, posts: 89, engagement: 5.7 }
    }
  ] as const;
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "overview" ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title={t("dashboard.followers")}
              value="48.2K"
              icon={<Users className="h-4 w-4" />}
              description="Total followers across platforms"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title={t("dashboard.interactions")}
              value="12.5K"
              icon={<Activity className="h-4 w-4" />}
              description="Likes, comments and shares"
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title={t("dashboard.visits")}
              value="32.4K"
              icon={<BarChart3 className="h-4 w-4" />}
              description="Profile visits this month"
              trend={{ value: 3, isPositive: false }}
            />
            <StatsCard
              title={t("dashboard.views")}
              value="189.3K"
              icon={<Eye className="h-4 w-4" />}
              description="Content views this month"
              trend={{ value: 14, isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {socialAccounts.map((account) => (
              <SocialAccountCard
                key={account.platform}
                platform={account.platform}
                username={account.username}
                stats={account.stats}
              />
            ))}
          </div>

          <div className="mb-8">
            <FollowersChart />
          </div>

          <div className="mb-8">
            <RecentPostsTable />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <EngagementChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <ViewsChart />
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <FollowersChart />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
