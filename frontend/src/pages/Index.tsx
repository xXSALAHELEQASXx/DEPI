import { useState } from "react";
import PostsList from "@/components/posts/PostsList";
import PostDetails from "@/components/posts/PostDetails";

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="flex h-screen">
  {/* Posts List - 1/3 width */}
  <div className="w-2/3 border-r flex-shrink-0">
    <PostsList
      onPostSelect={setSelectedPost}
      selectedPostId={selectedPost?.id}
    />
  </div>

  {/* Post Details - 2/3 width */}
  <div className="w-1/3 flex-shrink-0">
    <PostDetails post={selectedPost} />
  </div>
</div>
  );
};

export default App;