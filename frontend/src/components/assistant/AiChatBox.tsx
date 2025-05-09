
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizonal, PlusCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface SuggestionTopic {
  title: string;
  prompt: string;
}

const AiChatBox = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you with your social media today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestionTopics: SuggestionTopic[] = [
    { 
      title: "Analyze my performance", 
      prompt: "Can you analyze my account performance over the last month?"
    },
    { 
      title: "Content ideas", 
      prompt: "Suggest content ideas for my food blog."
    },
    { 
      title: "Best time to post", 
      prompt: "When is the best time to post for maximum engagement?"
    },
    { 
      title: "Improve engagement", 
      prompt: "How can I improve my engagement rates?"
    },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your account data, I recommend posting more video content to increase engagement.",
        "Looking at your analytics, your audience is most active between 6-8 PM. Try scheduling posts during this window.",
        "I've analyzed your most successful posts, and content featuring behind-the-scenes elements performs 37% better than product announcements.",
        "Your engagement rate is 2.3%, which is above industry average. To improve further, try asking more questions in your captions to encourage comments.",
      ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionTopic) => {
    setInputValue(suggestion.prompt);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full pb-6">
      <div className="flex-grow overflow-y-auto px-4 py-4" id="chat-messages">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] mb-4",
                message.sender === "user" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2 flex flex-col",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.sender === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs font-semibold">AI Assistant</span>
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex w-max max-w-[80%] mr-auto">
              <div className="rounded-lg px-4 py-2 bg-muted">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-semibold">AI Assistant</span>
                </div>
                <div className="flex space-x-1 items-center py-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4">
        {messages.length <= 2 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Suggested topics:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestionTopics.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <PlusCircle className="h-4 w-4" />
          </Button>

          <div className="relative flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("assistant.placeholder")}
              className="bg-muted rounded-full px-4 py-2 pr-12 w-full focus:outline-none focus:ring-2 ring-offset-2 ring-primary"
              disabled={isLoading}
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatBox;
