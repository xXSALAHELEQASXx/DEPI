
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InsightData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface AiInsightsCardProps {
  insights: InsightData[];
}

const AiInsightsCard = ({ insights }: AiInsightsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="border rounded-md p-4 relative hover:border-primary transition-colors"
          >
            <div className="flex items-start">
              <div
                className={cn(
                  "p-2 rounded-md mr-4",
                  `bg-${insight.color}-50 text-${insight.color}-600`
                )}
              >
                {insight.icon}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="text-sm font-medium">{insight.title}</h3>
                  {insight.trend && (
                    <span
                      className={cn(
                        "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                        insight.trend.isPositive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      )}
                    >
                      {insight.trend.isPositive ? "+" : "-"}
                      {insight.trend.value}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AiInsightsCard;
