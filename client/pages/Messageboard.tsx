import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useAnnouncements, createAnnouncement } from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import {
  Bell,
  Calendar,
  AlertTriangle,
  Info,
  Star,
  MessageSquare,
  Plus,
  Pin,
  Heart,
  Megaphone,
} from "lucide-react";

const typeConfig = {
  urgent: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "bg-red-100 text-red-800 border-red-200",
    bgColor: "bg-red-50",
  },
  event: {
    icon: <Calendar className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    bgColor: "bg-blue-50",
  },
  celebration: {
    icon: <Star className="w-4 h-4" />,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    bgColor: "bg-yellow-50",
  },
  general: {
    icon: <Info className="w-4 h-4" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    bgColor: "bg-gray-50",
  },
};

export default function Messageboard() {
  const { user, profile } = useAuth();
  const { announcements, loading, setAnnouncements } = useAnnouncements();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<string>("general");
  const [targetAudience, setTargetAudience] = useState("all");
  const { toast } = useToast();

  const canCreateAnnouncements =
    profile?.role &&
    ["teacher", "admin", "support_staff"].includes(profile.role);

  const handleCreateAnnouncement = async () => {
    if (!newTitle.trim() || !newContent.trim() || !user) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAnnouncement = await createAnnouncement(
        newTitle,
        newContent,
        newType,
        user.id,
        targetAudience,
      );

      setAnnouncements([newAnnouncement, ...announcements]);
      setIsCreating(false);
      setNewTitle("");
      setNewContent("");
      setNewType("general");
      setTargetAudience("all");

      toast({
        title: "Announcement Posted",
        description: "Your announcement has been shared with the community!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (announcementId: string) => {
    // TODO: Implement like functionality
    toast({
      title: "Feature Coming Soon",
      description: "Like functionality will be available soon!",
    });
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access the message board
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            School Message Board
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest news and announcements
          </p>
        </div>

        {/* Create Announcement */}
        {canCreateAnnouncements && (
          <div className="mb-6">
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-nursery-purple hover:bg-nursery-purple/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Share important information with parents and staff
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Info</SelectItem>
                          <SelectItem value="urgent">Urgent Notice</SelectItem>
                          <SelectItem value="event">Event/Activity</SelectItem>
                          <SelectItem value="celebration">
                            Celebration
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select
                        value={targetAudience}
                        onValueChange={setTargetAudience}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="parents">Parents Only</SelectItem>
                          <SelectItem value="staff">Staff Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Announcement title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Share your announcement..."
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAnnouncement}>
                      Post Announcement
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Announcements */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nursery-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading announcements...</p>
          </div>
        ) : announcements.length > 0 ? (
          <div className="space-y-6">
            {announcements.map((announcement) => {
              const config =
                typeConfig[announcement.type as keyof typeof typeConfig];
              const isRead = announcement.read_by?.includes(user.id) || false;

              return (
                <Card
                  key={announcement.id}
                  className={`transition-all ${
                    announcement.type === "urgent"
                      ? "border-red-200 shadow-md"
                      : "hover:shadow-md"
                  } ${!isRead ? "border-l-4 border-l-nursery-purple" : ""}`}
                >
                  <CardHeader className={config.bgColor}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={`${config.color} border`}>
                          <span className="mr-1">{config.icon}</span>
                          {announcement.type}
                        </Badge>
                        {!isRead && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(
                          parseISO(announcement.created_at),
                          "MMM d, h:mm a",
                        )}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {announcement.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>By {announcement.profiles?.full_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {announcement.profiles?.role?.replace("_", " ")}
                      </Badge>
                      {announcement.target_audience !== "all" && (
                        <Badge variant="secondary" className="text-xs">
                          {announcement.target_audience}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-wrap mb-4">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(announcement.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {announcement.likes?.length || 0}
                        </Button>
                        <span className="text-sm text-gray-500 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Comments coming soon
                        </span>
                      </div>
                      {announcement.type === "urgent" && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No announcements yet
            </h3>
            <p className="text-gray-600 mb-4">
              Check back later for important updates and news!
            </p>
            {canCreateAnnouncements && (
              <Button onClick={() => setIsCreating(true)}>
                Create First Announcement
              </Button>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 p-4 bg-white rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-3">Announcement Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(typeConfig).map(([type, config]) => (
              <div key={type} className="flex items-center space-x-2">
                <Badge className={`${config.color} border`}>
                  <span className="mr-1">{config.icon}</span>
                  {type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
