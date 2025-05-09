import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  platform: "instagram" | "facebook" | "twitter" | "tiktok" | "linkedin";
  publishedAt: string;
  status: "published" | "scheduled" | "draft";
  stats: PostStats;
}

interface PostDetailsProps {
  post: Post | null;
}

// Mock data for charts
const reachData = [
  { name: 'Day 1', reach: 1200 },
  { name: 'Day 2', reach: 1800 },
  { name: 'Day 3', reach: 2400 },
  { name: 'Day 4', reach: 2100 },
  { name: 'Day 5', reach: 3200 },
  { name: 'Day 6', reach: 3800 },
  { name: 'Day 7', reach: 3500 },
];

const engagementData = [
  { name: 'Likes', value: 243 },
  { name: 'Comments', value: 42 },
  { name: 'Shares', value: 18 },
  { name: 'Saves', value: 27 },
];

const demographicsData = [
  { age: '18-24', male: 20, female: 30 },
  { age: '25-34', male: 35, female: 45 },
  { age: '35-44', male: 25, female: 20 },
  { age: '45-54', male: 15, female: 10 },
  { age: '55+', male: 5, female: 5 },
];

const PostDetails = ({ post }: PostDetailsProps) => {
  const [activeTab, setActiveTab] = useState("insights");
  
  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a post to view details
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'facebook':
        return 'bg-blue-600';
      case 'twitter':
        return 'bg-blue-400';
      case 'tiktok':
        return 'bg-black';
      case 'linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-2 h-full flex flex-col overflow-auto p-2">
      <div className="bg-card rounded-lg border shadow-sm p-2 md:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div className="flex items-center">
            <div 
              className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${getPlatformColor(post.platform)}`}
            >
              {post.platform.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-lg md:text-xl font-semibold">{post.title}</h2>
              <div className="flex flex-wrap items-center mt-1 gap-2">
                <Badge 
                  variant="outline"
                  className={getStatusColor(post.status)}
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-1/2">
            <p className="text-muted-foreground mb-4">{post.content}</p>
            {post.image && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
              <Card className="text-center p-2 md:p-4">
                <h3 className="text-xl md:text-3xl font-bold text-pink-500">{post.stats.likes}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Likes</p>
              </Card>
              <Card className="text-center p-2 md:p-4">
                <h3 className="text-xl md:text-3xl font-bold text-blue-500">{post.stats.comments}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Comments</p>
              </Card>
              <Card className="text-center p-2 md:p-4">
                <h3 className="text-xl md:text-3xl font-bold text-green-500">{post.stats.shares}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Shares</p>
              </Card>
            </div>
            
            {post.status === 'published' && (
              <Card className="flex-grow">
                <CardHeader className="p-3 md:p-4 pb-0">
                  <CardTitle className="text-sm md:text-base">Reach Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 pt-0">
                  <div className="h-[150px] md:h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reachData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="reach" stroke="#8884d8" activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {post.status === 'published' && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
          <TabsList className="mb-4 w-full md:w-auto">
            <TabsTrigger value="insights" className="flex-1 md:flex-initial">Insights</TabsTrigger>
            <TabsTrigger value="demographics" className="flex-1 md:flex-initial">Demographics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="insights" className="flex-grow mt-0">
            <Card className="h-full">
              <CardHeader className="p-3 md:p-6">
                <CardTitle className="text-base md:text-lg">Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <div className="h-[200px] md:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                          <stop offset="100%" stopColor="#c4b5fd" stopOpacity={1} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="flex-grow mt-0">
            <Card className="h-full">
              <CardHeader className="p-3 md:p-6">
                <CardTitle className="text-base md:text-lg">Age & Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <div className="h-[200px] md:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                      <XAxis dataKey="age" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="female" name="Female" fill="#ec4899" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PostDetails;