
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PostsList from "@/components/posts/PostsList";
import PostDetails from "@/components/posts/PostDetails";

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

const Posts = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6 border-b flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("posts.title")}</h1>
        <Link to="/composer">
          <Button className="bg-linkify hover:bg-linkify-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("posts.create")}
          </Button>
        </Link>
      </div>

      <div className="flex-grow overflow-hidden flex">
        {/* Left panel - post list */}
        <div className="w-1/3 border-r overflow-hidden">
          <PostsList 
            onPostSelect={handlePostSelect}
            selectedPostId={selectedPost?.id}
          />
        </div>

        {/* Right panel - post details */}
        <div className="w-2/3 overflow-auto p-6">
          {selectedPost ? (
            <PostDetails post={selectedPost} />
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Select a post</h2>
                <p className="text-muted-foreground mb-6">
                  Choose a post from the list to view its details and analytics
                </p>
                <Link to="/composer">
                  <Button className="bg-linkify hover:bg-linkify-dark">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t("posts.create")}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
