
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiChatBox from "@/components/assistant/AiChatBox";
import AiInsightsCard from "@/components/assistant/AiInsightsCard";
import AiSuggestionsList from "@/components/assistant/AiSuggestionsList";
import { TrendingUp, MessageSquareText, Lightbulb, Activity } from "lucide-react";

// Define correct types to match what AiSuggestionsList expects
interface Suggestion {
  id: string;
  title: string;
  content: string;
  type: "content" | "hashtag" | "caption" | "schedule";
}

const Assistant = () => {
  const { t } = useTranslation();

  // Mock data for insights
  const insights = [
    {
      id: "1",
      title: "Engagement Rate Improved",
      description: "Your average engagement rate has increased by 18% in the last 30 days.",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "green",
      trend: {
        value: 18,
        isPositive: true,
      },
    },
    {
      id: "2",
      title: "Best Posting Time",
      description: "Your audience is most active between 6:00 PM and 8:00 PM on weekdays.",
      icon: <Activity className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: "3",
      title: "Content Type Analysis",
      description: "Video content is performing 32% better than image posts. Consider creating more video content.",
      icon: <MessageSquareText className="h-5 w-5" />,
      color: "purple",
      trend: {
        value: 32,
        isPositive: true,
      },
    },
  ];

  // Mock data for suggestions with explicitly typed values
  const suggestions: Suggestion[] = [
    {
      id: "1",
      title: "Behind-the-Scenes Content",
      content:
        "Share a behind-the-scenes look at your next product photoshoot to increase engagement and build authenticity.",
      type: "content",
    },
    {
      id: "2",
      title: "Trending Hashtag Set",
      content:
        "#socialmediamarketing #contentcreator #digitalmarketing #growthhacking #socialmediatips",
      type: "hashtag",
    },
    {
      id: "3",
      title: "Question Caption",
      content:
        "What's your favorite way to use our product? Share in the comments below and we might feature your idea in our next post! ✨",
      type: "caption",
    },
    {
      id: "4",
      title: "Optimal Schedule",
      content:
        "Schedule your most important content for Wednesday at 7:00 PM for maximum reach and engagement.",
      type: "schedule",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{t("assistant.title")}</h1>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="pt-2">
          <div className="max-w-4xl mx-auto h-[calc(100vh-16rem)]">
            <AiChatBox />
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="max-w-4xl mx-auto">
            <AiInsightsCard insights={insights} />
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <div className="max-w-4xl mx-auto">
            <AiSuggestionsList suggestions={suggestions} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assistant;
