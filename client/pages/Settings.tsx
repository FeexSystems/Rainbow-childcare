import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationSetup, PWAFeatures } from "@/components/PWAInstallPrompt";
import { usePWA, useNetworkStatus } from "@/hooks/usePWA";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Smartphone,
  Shield,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Settings() {
  const { user, profile, updateProfile } = useAuth();
  const { isStandalone } = usePWA();
  const isOnline = useNetworkStatus();
  const [notificationSettings, setNotificationSettings] = useState({
    dailyUpdates: true,
    announcements: true,
    forumReplies: true,
    pickupReminders: true,
    systemUpdates: false,
  });

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access settings
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleNotificationToggle = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account, notifications, and app preferences
          </p>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">Connection</p>
                  <p className="text-xs text-gray-600">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isStandalone ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">App Mode</p>
                  <p className="text-xs text-gray-600">
                    {isStandalone ? "Installed" : "Browser"}
                  </p>
                </div>
                <Smartphone
                  className={`w-4 h-4 ${
                    isStandalone ? "text-green-500" : "text-yellow-500"
                  }`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">Account</p>
                  <p className="text-xs text-gray-600 capitalize">
                    {profile.role?.replace("_", " ")}
                  </p>
                </div>
                <User className="w-4 h-4 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="app">App Settings</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded border">
                      {profile.full_name}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded border">
                      {profile.email}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <p className="mt-1 p-2 bg-gray-50 rounded border">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Badge variant="secondary" className="mt-1">
                      {profile.role?.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSetup />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <Label htmlFor={key} className="font-medium">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </Label>
                        <p className="text-sm text-gray-600">
                          {getNotificationDescription(key)}
                        </p>
                      </div>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          handleNotificationToggle(key, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Settings Tab */}
          <TabsContent value="app" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>App Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PWAFeatures />

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Storage Usage</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cached Pages</span>
                      <span>~2.5 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Data</span>
                      <span>~156 KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Images</span>
                      <span>~1.2 MB</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3">
                    Clear Cache
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">App Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Version</span>
                      <span>2.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update</span>
                      <span>Today</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Install Status</span>
                      <Badge variant={isStandalone ? "default" : "secondary"}>
                        {isStandalone ? "Installed" : "Browser"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Data Sharing</Label>
                      <p className="text-sm text-gray-600">
                        Share usage data to improve the app
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Activity Status</Label>
                      <p className="text-sm text-gray-600">
                        Show when you're active in the forum
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Profile Visibility</Label>
                      <p className="text-sm text-gray-600">
                        Make your profile visible to other parents
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
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

function getNotificationDescription(key: string): string {
  const descriptions: { [key: string]: string } = {
    dailyUpdates: "Get notified when daily updates are posted for your child",
    announcements: "Receive important school announcements and news",
    forumReplies: "Get notified when someone replies to your forum posts",
    pickupReminders: "Reminders about pickup times and QR codes",
    systemUpdates: "Technical updates and maintenance notifications",
  };
  return descriptions[key] || "";
}
