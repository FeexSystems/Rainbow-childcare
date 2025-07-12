import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
  useChildren,
  useDailyUpdates,
  useAttendance,
  useQRPickups,
  useNotifications,
  generateQRCode,
} from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, parseISO } from "date-fns";
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

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { children, loading: childrenLoading } = useChildren();
  const [selectedChild, setSelectedChild] = useState<string>("");
  const { updates, loading: updatesLoading } = useDailyUpdates(selectedChild);
  const { attendance, loading: attendanceLoading } =
    useAttendance(selectedChild);
  const { pickups, loading: pickupsLoading } = useQRPickups();
  const { notifications, unreadCount } = useNotifications();
  const { toast } = useToast();

  // Set first child as selected when children are loaded
  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id);
    }
  }, [children, selectedChild]);

  const handleGenerateQR = async () => {
    if (!selectedChild || !user) return;

    try {
      await generateQRCode(selectedChild, user.id);
      toast({
        title: "QR Code Generated",
        description: "Your pickup QR code has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getActivityIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      meals: <Apple className="w-5 h-5" />,
      activities: <Users className="w-5 h-5" />,
      naps: <Clock className="w-5 h-5" />,
      photos: <Camera className="w-5 h-5" />,
    };
    return iconMap[type] || <Bell className="w-5 h-5" />;
  };

  const currentChild = children.find((child) => child.id === selectedChild);

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access your dashboard
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (childrenLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nursery-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {profile.full_name}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your{" "}
                {children.length === 1 ? "little one" : "little ones"}.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              {selectedChild && (
                <Button
                  onClick={handleGenerateQR}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!currentChild}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate Pickup QR
                </Button>
              )}
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
            <div className="flex space-x-4 overflow-x-auto">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all min-w-max ${
                    selectedChild === child.id
                      ? "border-nursery-purple bg-nursery-purple/10"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-nursery-purple/20 flex items-center justify-center">
                    <span className="text-nursery-purple font-medium">
                      {child.first_name[0]}
                      {child.last_name[0]}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">
                      {child.first_name} {child.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date().getFullYear() -
                        new Date(child.date_of_birth).getFullYear()}{" "}
                      years old • {child.nursery_location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {children.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No children found. Please contact the nursery to add your child to
              the system.
            </p>
            <Button asChild>
              <a href="/contact">Contact Nursery</a>
            </Button>
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
