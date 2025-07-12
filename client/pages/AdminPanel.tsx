import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminStats } from "@/hooks/useData";
import { supabase } from "@/lib/supabase";
import { ReportGenerator } from "@/components/ReportingSystem";
import { format, subDays, eachDayOfInterval } from "date-fns";
import {
  Users,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  FileText,
  QrCode,
  Bell,
  TrendingUp,
  Clock,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Activity,
  PieChart,
} from "lucide-react";

interface AnalyticsData {
  attendanceRate: number;
  weeklyAttendance: { date: string; count: number }[];
  topActiveParents: { name: string; posts: number; replies: number }[];
  recentActivities: { activity: string; time: string; user: string }[];
  nurseryLocationStats: { location: string; children: number; staff: number }[];
}

export default function AdminPanel() {
  const { user, profile } = useAuth();
  const { stats, loading: statsLoading } = useAdminStats();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Check if user has admin access
  const hasAdminAccess = profile?.role === "admin";

  useEffect(() => {
    if (hasAdminAccess) {
      fetchAnalyticsData();
    }
  }, [hasAdminAccess]);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch weekly attendance data
      const weekDates = eachDayOfInterval({
        start: subDays(new Date(), 6),
        end: new Date(),
      });

      const attendancePromises = weekDates.map(async (date) => {
        const { data, error } = await supabase
          .from("attendance")
          .select("id", { count: "exact" })
          .eq("date", format(date, "yyyy-MM-dd"))
          .not("check_in_time", "is", null);

        return {
          date: format(date, "MMM d"),
          count: data?.length || 0,
        };
      });

      const weeklyAttendance = await Promise.all(attendancePromises);

      // Fetch forum activity stats
      const { data: forumData } = await supabase
        .from("forum_posts")
        .select(
          `
          profiles!forum_posts_author_id_fkey(full_name),
          replies_count
        `,
        )
        .order("created_at", { ascending: false })
        .limit(20);

      // Aggregate parent activity
      const parentActivity: {
        [key: string]: { posts: number; replies: number };
      } = {};

      forumData?.forEach((post) => {
        const name = post.profiles?.full_name || "Unknown";
        if (!parentActivity[name]) {
          parentActivity[name] = { posts: 0, replies: 0 };
        }
        parentActivity[name].posts++;
        parentActivity[name].replies += post.replies_count || 0;
      });

      const topActiveParents = Object.entries(parentActivity)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.posts + b.replies - (a.posts + a.replies))
        .slice(0, 5);

      // Fetch nursery location stats
      const { data: nurseryStats } = await supabase
        .from("children")
        .select("nursery_location")
        .order("nursery_location");

      const locationCounts = nurseryStats?.reduce(
        (acc: { [key: string]: number }, child) => {
          acc[child.nursery_location] = (acc[child.nursery_location] || 0) + 1;
          return acc;
        },
        {},
      );

      const nurseryLocationStats = Object.entries(locationCounts || {}).map(
        ([location, children]) => ({
          location,
          children: children as number,
          staff: Math.ceil((children as number) / 6), // Rough staff estimate
        }),
      );

      // Recent activities (mock data for now)
      const recentActivities = [
        {
          activity: "New forum post created",
          time: "5 minutes ago",
          user: "Sarah Johnson",
        },
        {
          activity: "Daily update submitted",
          time: "12 minutes ago",
          user: "Emma Davis",
        },
        {
          activity: "New child enrollment",
          time: "1 hour ago",
          user: "Admin System",
        },
        {
          activity: "QR pickup code generated",
          time: "2 hours ago",
          user: "Michael Thompson",
        },
      ];

      const attendanceRate =
        stats.totalChildren > 0
          ? Math.round((stats.todayAttendance / stats.totalChildren) * 100)
          : 0;

      setAnalyticsData({
        attendanceRate,
        weeklyAttendance,
        topActiveParents,
        recentActivities,
        nurseryLocationStats,
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access the admin panel
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel.
          </p>
          <Button asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  if (statsLoading || loadingAnalytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nursery-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {profile.full_name}! Manage your nursery operations
            and monitor key metrics.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalChildren}
                  </p>
                  <p className="text-sm text-gray-600">Total Children</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalStaff}
                  </p>
                  <p className="text-sm text-gray-600">Staff Members</p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.todayAttendance}
                  </p>
                  <p className="text-sm text-gray-600">Today's Attendance</p>
                </div>
                <UserCheck className="w-8 h-8 text-nursery-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData?.attendanceRate || 0}%
                  </p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Attendance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Weekly Attendance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData?.weeklyAttendance.map((day, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-12">
                          {day.date}
                        </span>
                        <div className="flex-1">
                          <Progress
                            value={(day.count / stats.totalChildren) * 100}
                            className="h-2"
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {day.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData?.recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {activity.activity}
                          </p>
                          <p className="text-xs text-gray-500">
                            by {activity.user}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nursery Location Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Nursery Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analyticsData?.nurseryLocationStats.map(
                    (location, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg text-center"
                      >
                        <h3 className="font-medium text-gray-900 capitalize mb-2">
                          {location.location} Nursery
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-2xl font-bold text-nursery-purple">
                              {location.children}
                            </p>
                            <p className="text-gray-600">Children</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              {location.staff}
                            </p>
                            <p className="text-gray-600">Staff</p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Forum Posts</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead>Total Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData?.topActiveParents.map((parent, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {parent.name}
                        </TableCell>
                        <TableCell>{parent.posts}</TableCell>
                        <TableCell>{parent.replies}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {parent.posts + parent.replies}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Children Management Tab */}
          <TabsContent value="children" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Children Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Children Management System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Advanced child management features coming soon
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">View All Children</Button>
                    <Button>Add New Child</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Management Tab */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Staff Management System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Staff management and scheduling features coming soon
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">View All Staff</Button>
                    <Button>Add New Staff</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Notification Settings
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">SMS notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Push notifications</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        System Settings
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Reports
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          System Configuration
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Bell className="w-4 h-4 mr-2" />
                          Notification Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
