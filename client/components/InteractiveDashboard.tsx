import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Star,
  Heart,
  Camera,
  MessageSquare,
  QrCode,
  Bell,
  Users,
  BookOpen,
  Palette,
  Music,
  TreePine,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Award,
  Sparkles,
  ArrowRight,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

interface DashboardProps {
  userRole?: "parent" | "teacher" | "admin" | "support_staff";
}

export function InteractiveDashboard({ userRole = "parent" }: DashboardProps) {
  const { profile } = useAuth();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  const getGreeting = () => {
    const name = profile?.full_name?.split(" ")[0] || "there";
    return `Good ${timeOfDay}, ${name}!`;
  };

  const parentDashboardData = {
    todaysUpdates: [
      {
        id: "1",
        time: "9:30 AM",
        activity: "Morning Circle",
        description: "Sophie participated enthusiastically in songs",
        mood: "happy",
        photo:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=150&fit=crop",
        rating: 5,
      },
      {
        id: "2",
        time: "11:00 AM",
        activity: "Art & Craft",
        description: "Created a beautiful butterfly painting",
        mood: "excited",
        photo:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop",
        rating: 5,
      },
      {
        id: "3",
        time: "1:30 PM",
        activity: "Rest Time",
        description: "Had a peaceful 45-minute rest",
        mood: "calm",
        rating: 4,
      },
    ],
    quickStats: [
      {
        label: "Attendance This Week",
        value: "5/5 days",
        icon: CheckCircle,
        color: "green",
      },
      { label: "Average Mood", value: "Happy 😊", icon: Heart, color: "pink" },
      {
        label: "Activities Completed",
        value: "12 today",
        icon: Star,
        color: "yellow",
      },
      {
        label: "Learning Progress",
        value: "85%",
        icon: TrendingUp,
        color: "blue",
      },
    ],
    upcomingEvents: [
      { date: "Tomorrow", title: "School Photos", type: "photo" },
      { date: "Friday", title: "Sports Day", type: "activity" },
      { date: "Next Week", title: "Parent Meeting", type: "meeting" },
    ],
  };

  const teacherDashboardData = {
    classStats: [
      { label: "Children Present", value: "18/20", icon: Users, color: "blue" },
      {
        label: "Activities Planned",
        value: "6 today",
        icon: BookOpen,
        color: "green",
      },
      {
        label: "Updates Posted",
        value: "15/18",
        icon: MessageSquare,
        color: "purple",
      },
      { label: "Parent Messages", value: "3 new", icon: Bell, color: "red" },
    ],
    todaysTasks: [
      { id: "1", task: "Complete daily updates", completed: 15, total: 18 },
      { id: "2", task: "Prepare art supplies", completed: 1, total: 1 },
      { id: "3", task: "Parent meetings", completed: 2, total: 3 },
    ],
  };

  const adminDashboardData = {
    systemStats: [
      {
        label: "Total Enrollment",
        value: "45 children",
        icon: Users,
        color: "blue",
        trend: "+3 this month",
      },
      {
        label: "Staff Members",
        value: "12 active",
        icon: Award,
        color: "green",
        trend: "All present",
      },
      {
        label: "Revenue This Month",
        value: "£28,500",
        icon: TrendingUp,
        color: "yellow",
        trend: "+15% vs last month",
      },
      {
        label: "Parent Satisfaction",
        value: "98%",
        icon: Heart,
        color: "pink",
        trend: "+2% this quarter",
      },
    ],
    recentActivity: [
      {
        id: "1",
        type: "enrollment",
        message: "New application from Johnson family",
        time: "2 hours ago",
      },
      {
        id: "2",
        type: "update",
        message: "Daily updates completed for Rainbow Room",
        time: "4 hours ago",
      },
      {
        id: "3",
        type: "message",
        message: "Parent feedback received - 5 stars",
        time: "6 hours ago",
      },
    ],
  };

  const renderParentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getGreeting()}
            </h2>
            <p className="text-gray-600">
              Sophie had a wonderful day today! 🌟
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            ⭐
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {parentDashboardData.quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="glass-card interactive-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Today's Activities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Today's Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parentDashboardData.todaysUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
                onClick={() =>
                  setActiveCard(activeCard === update.id ? null : update.id)
                }
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">
                      {update.mood === "happy"
                        ? "😊"
                        : update.mood === "excited"
                          ? "🤗"
                          : "😌"}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">
                      {update.activity}
                    </h3>
                    <span className="text-sm text-gray-500">{update.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{update.description}</p>
                  {update.rating && (
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < update.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <AnimatePresence>
                    {activeCard === update.id && update.photo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <img
                          src={update.photo}
                          alt={update.activity}
                          className="w-full max-w-sm h-32 object-cover rounded-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <QrCode className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">Generate Pickup QR</h3>
            <Button size="sm" className="w-full">
              Create Code
            </Button>
          </CardContent>
        </Card>
        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">Message Teachers</h3>
            <Button size="sm" variant="outline" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>
        <Card className="glass-card interactive-card">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">View Calendar</h3>
            <Button size="sm" variant="outline" className="w-full">
              Open Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {getGreeting()}
        </h2>
        <p className="text-gray-600">
          Ready for another amazing day with the Rainbow Room! 🌈
        </p>
      </motion.div>

      {/* Class Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teacherDashboardData.classStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="glass-card interactive-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Today's Tasks */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Today's Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacherDashboardData.todaysTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 transition-colors"
              >
                <span className="font-medium">{task.task}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {task.completed}/{task.total}
                  </span>
                  <Progress
                    value={(task.completed / task.total) * 100}
                    className="w-20"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {getGreeting()}
        </h2>
        <p className="text-gray-600">
          Here's your nursery overview for today 📊
        </p>
      </motion.div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminDashboardData.systemStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="glass-card interactive-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="font-bold text-lg text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Weekly Enrollment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive chart placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Program Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive chart placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case "teacher":
        return renderTeacherDashboard();
      case "admin":
        return renderAdminDashboard();
      case "support_staff":
        return renderTeacherDashboard(); // Similar to teacher for now
      default:
        return renderParentDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderDashboard()}
      </div>
    </div>
  );
}
