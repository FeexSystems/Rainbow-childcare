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
  Bell,
  Calendar,
  AlertTriangle,
  Info,
  Star,
  MessageSquare,
  Plus,
  Pin,
  Heart,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "urgent" | "event" | "celebration";
  author: string;
  postedAt: Date;
  isPinned: boolean;
  likes: number;
  comments: number;
}

export default function Messageboard() {
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "School Photos - Tomorrow!",
      content:
        "Just a friendly reminder that school photos are tomorrow. Please ensure your child is wearing their nursery uniform. Photo sessions will start at 9:30 AM.",
      type: "event",
      author: "Sarah Johnson (Manager)",
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
      likes: 12,
      comments: 3,
    },
    {
      id: "2",
      title: "Parking Notice",
      content:
        "Please be mindful when parking during pickup and drop-off times. Use designated parking spaces and avoid blocking the main entrance.",
      type: "info",
      author: "Mike Wilson (Staff)",
      postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPinned: false,
      likes: 8,
      comments: 1,
    },
    {
      id: "3",
      title: "Happy Birthday Emma! 🎉",
      content:
        "Today we celebrated Emma's 4th birthday with a special party in the Rainbow Room. Thank you to the parents who provided the delicious cake!",
      type: "celebration",
      author: "Lisa Thompson (Teacher)",
      postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isPinned: false,
      likes: 15,
      comments: 7,
    },
    {
      id: "4",
      title: "Weather Alert - Early Closure",
      content:
        "Due to the severe weather warning, we will be closing early today at 4:00 PM. Please arrange early pickup for your children.",
      type: "urgent",
      author: "Admin Team",
      postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isPinned: true,
      likes: 5,
      comments: 2,
    },
    {
      id: "5",
      title: "Parent Coffee Morning - Friday",
      content:
        "Join us this Friday at 9:00 AM for our monthly parent coffee morning. It's a great opportunity to meet other parents and chat with our staff about your child's progress.",
      type: "event",
      author: "Emma Clarke (Deputy Manager)",
      postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isPinned: false,
      likes: 9,
      comments: 4,
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "info" as const,
  });

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "event":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "celebration":
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case "event":
        return <Badge className="bg-blue-100 text-blue-800">Event</Badge>;
      case "celebration":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Celebration</Badge>
        );
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  const userRole = localStorage.getItem("userRole") || "parent";
  const canPost = userRole === "admin" || userRole === "teacher";

  const handleSubmitAnnouncement = () => {
    // In a real app, this would send to your backend
    console.log("New announcement:", newAnnouncement);
    setNewAnnouncement({ title: "", content: "", type: "info" });
    alert("Announcement posted successfully!");
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            School Messageboard
          </h1>
          <p className="text-xl text-gray-600">
            Stay connected with important announcements and updates
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-nursery-purple" />
            <span className="font-medium text-gray-900">
              {announcements.length} Announcements
            </span>
          </div>

          {canPost && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-nursery-purple hover:bg-nursery-purple/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Share important information with the nursery community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Announcement title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newAnnouncement.type}
                      onChange={(e) =>
                        setNewAnnouncement((prev) => ({
                          ...prev,
                          type: e.target.value as any,
                        }))
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="info">Information</option>
                      <option value="event">Event</option>
                      <option value="urgent">Urgent</option>
                      <option value="celebration">Celebration</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Message</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Write your announcement..."
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleSubmitAnnouncement}
                    className="w-full"
                    disabled={
                      !newAnnouncement.title || !newAnnouncement.content
                    }
                  >
                    Post Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="relative">
              {announcement.isPinned && (
                <div className="absolute top-4 right-4">
                  <Pin className="w-4 h-4 text-nursery-purple" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAnnouncementIcon(announcement.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">
                          {announcement.title}
                        </CardTitle>
                        {getAnnouncementBadge(announcement.type)}
                      </div>
                      <div className="text-sm text-gray-600">
                        By {announcement.author} •{" "}
                        {announcement.postedAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{announcement.content}</p>

                {/* Engagement Actions */}
                <div className="flex items-center space-x-6 pt-4 border-t">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-nursery-purple">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{announcement.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-nursery-purple">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">{announcement.comments}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions for Parents */}
        {userRole === "parent" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Teacher
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View School Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
