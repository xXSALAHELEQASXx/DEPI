import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  platform: "instagram" | "facebook" | "twitter" | "tiktok" | "linkedin";
  publishedAt: string;
  status: "published" | "scheduled" | "draft";
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Summer Collection Launch",
    content: "Introducing our new summer collection! Check out the new styles now available on our website. Limited stock available!",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=1",
    platform: "instagram",
    publishedAt: "2023-06-15T10:30:00Z",
    status: "published",
    stats: {
      likes: 243,
      comments: 42,
      shares: 18
    }
  },
  {
    id: "2",
    title: "Customer Spotlight: Sarah",
    content: "Meet Sarah, who transformed her business using our platform! Read her success story on our blog.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=2",
    platform: "facebook",
    publishedAt: "2023-06-10T14:20:00Z",
    status: "published",
    stats: {
      likes: 187,
      comments: 23,
      shares: 11
    }
  },
  {
    id: "3",
    title: "Quick Tip Tuesday",
    content: "Here's a quick tip for maximizing your productivity: Use time blocking to organize your day!",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=3",
    platform: "twitter",
    publishedAt: "2023-06-20T09:15:00Z",
    status: "published",
    stats: {
      likes: 57,
      comments: 20,
      shares: 7
    }
  },
  {
    id: "4",
    title: "Behind the Scenes",
    content: "Take a peek at what goes on behind the scenes at our studio! #BehindTheScenes #MakingOf",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=4",
    platform: "tiktok",
    publishedAt: "2023-06-05T16:45:00Z",
    status: "published",
    stats: {
      likes: 532,
      comments: 87,
      shares: 46
    }
  },
  {
    id: "5",
    title: "New Product Announcement",
    content: "We're excited to announce our newest product line, coming next month! Stay tuned for more details.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=5",
    platform: "linkedin",
    publishedAt: "2023-06-25T11:00:00Z",
    status: "draft",
    stats: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  }
];

interface PostsListProps {
  onPostSelect: (post: Post) => void;
  selectedPostId?: string;
}

const platformIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.097 10.097 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
};

const statusColors = {
  published: "text-green-600",
  scheduled: "text-amber-600",
  draft: "text-gray-600"
};

const PostsList = ({ onPostSelect, selectedPostId }: PostsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter ? post.status === filter : true;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-1 border-b">
        <div className="relative mb-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          <Button
            variant={filter === null ? "secondary" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          <Button
            variant={filter === "published" ? "secondary" : "outline"}
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => setFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={filter === "scheduled" ? "secondary" : "outline"}
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => setFilter("scheduled")}
          >
            Scheduled
          </Button>
          <Button
            variant={filter === "draft" ? "secondary" : "outline"}
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => setFilter("draft")}
          >
            Draft
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-1 space-y-1">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No posts found
          </div>
        ) : (
          filteredPosts.map(post => (
            <Card
              key={post.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedPostId === post.id && "ring-2 ring-primary"
              )}
              onClick={() => onPostSelect(post)}
            >
              <CardContent className="p-2 md:p-3 flex">
                <div className="w-12 h-12 md:w-16 md:h-16 mr-2 md:mr-3 bg-muted rounded overflow-hidden flex-shrink-0">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium truncate text-sm md:text-base">{post.title}</div>
                    <div className={`flex items-center text-xs md:text-sm ml-1 flex-shrink-0 ${statusColors[post.status]}`}>
                      {post.status}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between mt-1 md:mt-2">
                    <div className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground flex-shrink-0">
                      <span>
                        {platformIcons[post.platform]}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsList;