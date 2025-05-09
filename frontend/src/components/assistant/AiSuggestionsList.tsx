
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Suggestion {
  id: string;
  title: string;
  content: string;
  type: "content" | "caption" | "hashtag" | "schedule";
}

interface AiSuggestionsListProps {
  suggestions: Suggestion[];
}

const AiSuggestionsList = ({ suggestions }: AiSuggestionsListProps) => {
  const { toast } = useToast();

  const handleUseSuggestion = (suggestion: Suggestion) => {
    // In a real app, this would create a new post with the suggested content
    toast({
      title: "Suggestion applied",
      description: `The suggestion "${suggestion.title}" has been added to your drafts.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Content Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-md p-4 hover:border-primary transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{suggestion.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => handleUseSuggestion(suggestion)}
                >
                  <PlusCircle className="mr-1 h-3 w-3" />
                  Use
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{suggestion.content}</p>
              <div className="mt-2">
                <span className="inline-block text-xs bg-muted px-2 py-1 rounded">
                  {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiSuggestionsList;
