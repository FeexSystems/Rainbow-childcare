import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Apple,
  BookOpen,
  Camera,
  MessageSquare,
  QrCode,
  Bell,
  Download,
  Star,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";

interface Child {
  id: string;
  name: string;
  age: string;
  class: string;
  photo: string;
}

interface DailyUpdate {
  id: string;
  type: "meal" | "activity" | "learning" | "sleep" | "photo";
  title: string;
  description: string;
  time: string;
  photo?: string;
  rating?: number;
}

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string>("parent");
  const [selectedChild, setSelectedChild] = useState<string>("child1");

  // Mock data - in real app this would come from your backend
  const children: Child[] = [
    {
      id: "child1",
      name: "Emma Johnson",
      age: "3 years old",
      class: "Rainbow Room",
      photo:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "child2",
      name: "Oliver Johnson",
      age: "4 years old",
      class: "Sunshine Room",
      photo:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const dailyUpdates: DailyUpdate[] = [
    {
      id: "1",
      type: "activity",
      title: "Morning Circle Time",
      description:
        "Emma participated enthusiastically in our morning songs and showed great counting skills during number time.",
      time: "9:30 AM",
      rating: 5,
    },
    {
      id: "2",
      type: "meal",
      title: "Snack Time",
      description: "Enjoyed apple slices and crackers. Drank all her water!",
      time: "10:15 AM",
      rating: 4,
    },
    {
      id: "3",
      type: "learning",
      title: "Art & Craft",
      description:
        "Created a beautiful butterfly painting using handprints. Emma showed excellent fine motor skills and creativity.",
      time: "11:00 AM",
      photo:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      rating: 5,
    },
    {
      id: "4",
      type: "sleep",
      title: "Rest Time",
      description:
        "Had a peaceful 45-minute rest. Woke up refreshed and ready for afternoon activities.",
      time: "1:00 PM",
      rating: 4,
    },
  ];

  const upcomingEvents = [
    {
      date: "Tomorrow",
      title: "School Photos",
      description: "Please dress your child in the nursery uniform",
      type: "photo",
    },
    {
      date: "Friday",
      title: "Parent Coffee Morning",
      description: "Join us for coffee and chat with other parents",
      type: "social",
    },
    {
      date: "Next Week",
      title: "Science Week",
      description: "Exciting experiments and discovery activities",
      type: "learning",
    },
  ];

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  const generatePickupQR = () => {
    // In a real app, this would generate a time-bound QR code
    alert(
      "QR Code generated! Valid for 1 hour. Show this to staff during pickup.",
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meal":
        return <Apple className="w-5 h-5" />;
      case "activity":
        return <Users className="w-5 h-5" />;
      case "learning":
        return <BookOpen className="w-5 h-5" />;
      case "sleep":
        return <Clock className="w-5 h-5" />;
      case "photo":
        return <Camera className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const currentChild =
    children.find((child) => child.id === selectedChild) || children[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Parent Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your little ones.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                onClick={generatePickupQR}
                className="bg-green-600 hover:bg-green-700"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate Pickup QR
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        {children.length > 1 && (
          <div className="mb-6">
            <div className="flex space-x-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    selectedChild === child.id
                      ? "border-nursery-purple bg-nursery-purple/10"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{child.name}</h3>
                    <p className="text-sm text-gray-600">
                      {child.age} • {child.class}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today's Updates</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Today's Updates */}
          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Updates */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Today's Activities - {currentChild.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyUpdates.map((update) => (
                        <div
                          key={update.id}
                          className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-nursery-purple/10 rounded-lg flex items-center justify-center text-nursery-purple">
                              {getActivityIcon(update.type)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900">
                                {update.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {update.time}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">
                              {update.description}
                            </p>
                            {update.photo && (
                              <img
                                src={update.photo}
                                alt="Activity"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                            )}
                            {update.rating && (
                              <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-600 mr-2">
                                  Engagement:
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < update.rating!
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Attendance</span>
                      <Badge className="bg-green-100 text-green-800">
                        Present
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mood</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Happy 😊
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Meals</span>
                      <span className="text-sm font-medium">2/3 eaten</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rest</span>
                      <span className="text-sm font-medium">45 minutes</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-nursery-purple pl-3"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {event.date}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">
                          {event.description}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>School Calendar & Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Calendar Integration Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    We're building an interactive calendar to show all school
                    events, holidays, and your child's schedule.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Mathematics</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Language & Communication
                      </span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Physical Development
                      </span>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Social Skills</span>
                      <span className="text-sm text-gray-600">88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          Counting to 20
                        </div>
                        <div className="text-xs text-gray-600">
                          Mathematics milestone
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          Reading 3-letter words
                        </div>
                        <div className="text-xs text-gray-600">
                          Literacy progress
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Sharing toys</div>
                        <div className="text-xs text-gray-600">
                          Social development
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages & Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Messaging System Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    Direct messaging with teachers and school announcements will
                    be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
