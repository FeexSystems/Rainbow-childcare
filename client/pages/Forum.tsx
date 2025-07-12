import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  useForumPosts,
  useForumReplies,
  createForumPost,
  createForumReply,
} from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import {
  MessageSquare,
  Plus,
  Pin,
  Calendar,
  Users,
  HelpCircle,
  HeartHandshake,
  ThumbsUp,
  Reply,
} from "lucide-react";

const categoryIcons = {
  general: <MessageSquare className="w-4 h-4" />,
  events: <Calendar className="w-4 h-4" />,
  questions: <HelpCircle className="w-4 h-4" />,
  support: <HeartHandshake className="w-4 h-4" />,
};

const categoryColors = {
  general: "bg-blue-100 text-blue-800",
  events: "bg-green-100 text-green-800",
  questions: "bg-orange-100 text-orange-800",
  support: "bg-purple-100 text-purple-800",
};

export default function Forum() {
  const { user, profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");
  const [replyContent, setReplyContent] = useState("");

  const {
    posts,
    loading: postsLoading,
    setPosts,
  } = useForumPosts(selectedCategory);
  const {
    replies,
    loading: repliesLoading,
    setReplies,
  } = useForumReplies(selectedPost || "");
  const { toast } = useToast();

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access the forum
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const newPost = await createForumPost(
        newPostTitle,
        newPostContent,
        newPostCategory,
        user.id,
      );

      setPosts([newPost, ...posts]);
      setIsCreatingPost(false);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("general");

      toast({
        title: "Post Created",
        description: "Your post has been shared with the community!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !selectedPost) return;

    try {
      const newReply = await createForumReply(
        selectedPost,
        replyContent,
        user.id,
      );

      setReplies([...replies, newReply]);
      setReplyContent("");

      toast({
        title: "Reply Added",
        description: "Your reply has been posted!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    }
  };

  const PostCard = ({ post }: { post: any }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedPost(post.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {post.pinned && <Pin className="w-4 h-4 text-nursery-purple" />}
            <Badge
              className={
                categoryColors[post.category as keyof typeof categoryColors]
              }
            >
              <span className="mr-1">
                {categoryIcons[post.category as keyof typeof categoryIcons]}
              </span>
              {post.category}
            </Badge>
          </div>
          <span className="text-sm text-gray-500">
            {format(parseISO(post.created_at), "MMM d, h:mm a")}
          </span>
        </div>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>By {post.profiles?.full_name}</span>
            <Badge variant="secondary" className="text-xs">
              {post.profiles?.role?.replace("_", " ")}
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="w-3 h-3" />
              <span>{post.likes_count}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Reply className="w-3 h-3" />
              <span>{post.replies_count}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PostDetail = ({ postId }: { postId: string }) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return null;

    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedPost(null)}
          className="mb-4"
        >
          ← Back to Forum
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {post.pinned && <Pin className="w-4 h-4 text-nursery-purple" />}
                <Badge
                  className={
                    categoryColors[post.category as keyof typeof categoryColors]
                  }
                >
                  <span className="mr-1">
                    {categoryIcons[post.category as keyof typeof categoryIcons]}
                  </span>
                  {post.category}
                </Badge>
              </div>
              <span className="text-sm text-gray-500">
                {format(parseISO(post.created_at), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <p className="text-gray-600">
              By {post.profiles?.full_name} (
              {post.profiles?.role?.replace("_", " ")})
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes_count} likes</span>
              </span>
              <span className="flex items-center space-x-1">
                <Reply className="w-4 h-4" />
                <span>{post.replies_count} replies</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Replies ({replies.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {repliesLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-nursery-purple mx-auto"></div>
              </div>
            ) : replies.length > 0 ? (
              replies.map((reply) => (
                <div
                  key={reply.id}
                  className="border-l-2 border-gray-100 pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {reply.profiles?.full_name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {reply.profiles?.role?.replace("_", " ")}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(parseISO(reply.created_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No replies yet. Be the first to reply!
              </p>
            )}

            {/* Reply Form */}
            <div className="border-t pt-4 mt-4">
              <Label htmlFor="reply">Add a reply</Label>
              <Textarea
                id="reply"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="mt-2"
                rows={3}
              />
              <Button
                onClick={handleReply}
                className="mt-2"
                disabled={!replyContent.trim()}
              >
                Post Reply
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostDetail postId={selectedPost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parent Community Forum
          </h1>
          <p className="text-xl text-gray-600">
            Connect, share, and support each other in our parenting journey
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogTrigger asChild>
              <Button className="bg-nursery-purple hover:bg-nursery-purple/90">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPostCategory}
                    onValueChange={setNewPostCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">
                        General Discussion
                      </SelectItem>
                      <SelectItem value="events">
                        Events & Activities
                      </SelectItem>
                      <SelectItem value="questions">
                        Questions & Advice
                      </SelectItem>
                      <SelectItem value="support">
                        Support & Encouragement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, questions, or experiences..."
                    rows={6}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreatingPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost}>Create Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts */}
        {postsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nursery-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading forum posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to start a conversation in the community!
            </p>
            <Button onClick={() => setIsCreatingPost(true)}>
              Create First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
