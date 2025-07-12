import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Star,
  Activity,
  AlertCircle,
} from "lucide-react";

interface ReportData {
  attendanceRate: number;
  totalDays: number;
  presentDays: number;
  averageMood: number;
  activitiesCompleted: number;
  mealsSatisfaction: number;
  sleepQuality: number;
  progressNotes: string[];
  weeklyTrends: { week: string; attendance: number; mood: number }[];
}

interface ReportConfig {
  type: "weekly" | "monthly" | "custom";
  childId: string;
  startDate: Date;
  endDate: Date;
  format: "pdf" | "csv" | "json";
}

export function AttendanceReport({ childId }: { childId: string }) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "month",
  );

  useEffect(() => {
    if (childId) {
      generateReport();
    }
  }, [childId, timeRange]);

  const generateReport = async () => {
    setLoading(true);
    try {
      const now = new Date();
      let startDate: Date;
      let endDate: Date = now;

      switch (timeRange) {
        case "week":
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          break;
        case "month":
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case "quarter":
          startDate = subMonths(now, 3);
          break;
        default:
          startDate = startOfMonth(now);
      }

      // Fetch attendance data
      const { data: attendanceData } = await supabase
        .from("attendance")
        .select("*")
        .eq("child_id", childId)
        .gte("date", format(startDate, "yyyy-MM-dd"))
        .lte("date", format(endDate, "yyyy-MM-dd"));

      // Fetch daily updates data
      const { data: updatesData } = await supabase
        .from("daily_updates")
        .select("*")
        .eq("child_id", childId)
        .gte("date", format(startDate, "yyyy-MM-dd"))
        .lte("date", format(endDate, "yyyy-MM-dd"));

      const totalDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
      }).length;
      const presentDays =
        attendanceData?.filter((a) => a.check_in_time).length || 0;
      const attendanceRate =
        totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

      // Calculate average mood score
      const moodScores =
        updatesData?.map((update) => {
          const mood = update.mood.toLowerCase();
          if (mood.includes("happy") || mood.includes("excited")) return 5;
          if (mood.includes("good") || mood.includes("cheerful")) return 4;
          if (mood.includes("okay") || mood.includes("neutral")) return 3;
          if (mood.includes("tired") || mood.includes("quiet")) return 2;
          if (mood.includes("sad") || mood.includes("upset")) return 1;
          return 3; // Default neutral
        }) || [];

      const averageMood =
        moodScores.length > 0
          ? moodScores.reduce((a, b) => a + b, 0) / moodScores.length
          : 0;

      // Generate weekly trends for the past 4 weeks
      const weeklyTrends = [];
      for (let i = 3; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(now, i));
        const weekEnd = endOfWeek(subWeeks(now, i));

        const weekAttendance =
          attendanceData?.filter(
            (a) =>
              a.date >= format(weekStart, "yyyy-MM-dd") &&
              a.date <= format(weekEnd, "yyyy-MM-dd") &&
              a.check_in_time,
          ).length || 0;

        const weekUpdates =
          updatesData?.filter(
            (u) =>
              u.date >= format(weekStart, "yyyy-MM-dd") &&
              u.date <= format(weekEnd, "yyyy-MM-dd"),
          ) || [];

        const weekMoodScores = weekUpdates.map((update) => {
          const mood = update.mood.toLowerCase();
          if (mood.includes("happy") || mood.includes("excited")) return 5;
          if (mood.includes("good")) return 4;
          if (mood.includes("okay")) return 3;
          if (mood.includes("tired")) return 2;
          return 1;
        });

        const weekAverageMood =
          weekMoodScores.length > 0
            ? weekMoodScores.reduce((a, b) => a + b, 0) / weekMoodScores.length
            : 0;

        weeklyTrends.push({
          week: format(weekStart, "MMM d"),
          attendance: weekAttendance,
          mood: weekAverageMood,
        });
      }

      const report: ReportData = {
        attendanceRate,
        totalDays,
        presentDays,
        averageMood,
        activitiesCompleted: updatesData?.length || 0,
        mealsSatisfaction: 85, // Mock data
        sleepQuality: 90, // Mock data
        progressNotes: updatesData?.map((u) => u.notes).filter(Boolean) || [],
        weeklyTrends,
      };

      setReportData(report);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 3.5) return "text-yellow-600";
    if (score >= 2.5) return "text-orange-600";
    return "text-red-600";
  };

  const getMoodText = (score: number) => {
    if (score >= 4.5) return "Excellent";
    if (score >= 3.5) return "Good";
    if (score >= 2.5) return "Fair";
    return "Needs Attention";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nursery-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Generating report...</p>
        </CardContent>
      </Card>
    );
  }

  if (!reportData) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            No data available for the selected period
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Progress Report</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select
                value={timeRange}
                onValueChange={(value: "week" | "month" | "quarter") =>
                  setTimeRange(value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Attendance</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {Math.round(reportData.attendanceRate)}%
              </p>
              <p className="text-xs text-gray-600">
                {reportData.presentDays} of {reportData.totalDays} days
              </p>
              <Progress value={reportData.attendanceRate} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Average Mood</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="space-y-1">
              <p
                className={`text-2xl font-bold ${getMoodColor(reportData.averageMood)}`}
              >
                {getMoodText(reportData.averageMood)}
              </p>
              <p className="text-xs text-gray-600">
                {reportData.averageMood.toFixed(1)}/5.0 score
              </p>
              <Progress
                value={(reportData.averageMood / 5) * 100}
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Activities</span>
              <Activity className="w-4 h-4 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {reportData.activitiesCompleted}
              </p>
              <p className="text-xs text-gray-600">Daily updates recorded</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Sleep Quality</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{reportData.sleepQuality}%</p>
              <p className="text-xs text-gray-600">Good rest periods</p>
              <Progress value={reportData.sleepQuality} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Weekly Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.weeklyTrends.map((week, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium w-16">{week.week}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Attendance: {week.attendance} days</span>
                    <span>Mood: {week.mood.toFixed(1)}/5</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Progress
                      value={(week.attendance / 7) * 100}
                      className="h-1"
                    />
                    <Progress value={(week.mood / 5) * 100} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Notes */}
      {reportData.progressNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Teacher Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportData.progressNotes.slice(0, 5).map((note, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 p-2 bg-gray-50 rounded"
                >
                  {note}
                </p>
              ))}
              {reportData.progressNotes.length > 5 && (
                <p className="text-xs text-gray-500 text-center">
                  And {reportData.progressNotes.length - 5} more notes...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function ReportGenerator() {
  const { user, profile } = useAuth();
  const [config, setConfig] = useState<Partial<ReportConfig>>({
    type: "monthly",
    format: "pdf",
  });
  const [generating, setGenerating] = useState(false);

  const canGenerateReports =
    profile?.role &&
    ["teacher", "admin", "support_staff"].includes(profile.role);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real implementation, this would call your backend API
      console.log("Generating report with config:", config);

      // Trigger download or display
      alert("Report generated successfully! (This is a demo)");
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (!canGenerateReports) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Staff Access Required
          </h3>
          <p className="text-gray-600">
            Report generation is only available to nursery staff members.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Generate Custom Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select
              value={config.type}
              onValueChange={(value: "weekly" | "monthly" | "custom") =>
                setConfig({ ...config, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select
              value={config.format}
              onValueChange={(value: "pdf" | "csv" | "json") =>
                setConfig({ ...config, format: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Report Includes:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Attendance statistics and trends</li>
            <li>• Mood and behavior analysis</li>
            <li>• Learning progress summaries</li>
            <li>• Teacher observations and notes</li>
            <li>• Participation in activities</li>
            <li>• Sleep and meal patterns</li>
          </ul>
        </div>

        <Button
          onClick={handleGenerateReport}
          disabled={generating}
          className="w-full"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
