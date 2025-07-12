import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { usePWA, useNotifications } from "@/hooks/usePWA";
import {
  Download,
  Smartphone,
  Bell,
  X,
  CheckCircle,
  Wifi,
  Star,
  Calendar,
  MessageSquare,
  QrCode,
} from "lucide-react";

export function PWAInstallPrompt() {
  const { isInstallable, isStandalone, installApp } = usePWA();
  const [isVisible, setIsVisible] = useState(true);
  const [installing, setInstalling] = useState(false);

  // Don't show if already installed or not installable
  if (!isInstallable || isStandalone || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    setInstalling(true);
    const success = await installApp();
    if (success) {
      setIsVisible(false);
    }
    setInstalling(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to remember user preference
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-nursery-purple shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-nursery-purple rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Install Hillcrest App</CardTitle>
                <Badge variant="secondary" className="text-xs mt-1">
                  Get the full experience
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <Wifi className="w-3 h-3 text-green-500" />
                <span>Offline access</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bell className="w-3 h-3 text-blue-500" />
                <span>Push notifications</span>
              </div>
              <div className="flex items-center space-x-1">
                <Smartphone className="w-3 h-3 text-purple-500" />
                <span>Full screen</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>Fast loading</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleInstall}
                disabled={installing}
                className="flex-1 bg-nursery-purple hover:bg-nursery-purple/90"
                size="sm"
              >
                {installing ? (
                  "Installing..."
                ) : (
                  <>
                    <Download className="w-3 h-3 mr-1" />
                    Install
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDismiss} size="sm">
                Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function NotificationSetup() {
  const {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
  } = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const granted = await requestPermission();
      if (granted) {
        await subscribe();
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setLoading(true);
    try {
      await unsubscribe();
    } catch (error) {
      console.error("Error disabling notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Alert>
        <Bell className="h-4 w-4" />
        <AlertDescription>
          Push notifications are not supported in your browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Push Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notification Status</h3>
            <p className="text-sm text-gray-600">
              {permission === "granted"
                ? subscription
                  ? "Enabled and subscribed"
                  : "Granted but not subscribed"
                : permission === "denied"
                  ? "Blocked by user"
                  : "Not requested"}
            </p>
          </div>
          <Badge
            variant={
              permission === "granted" && subscription
                ? "default"
                : permission === "denied"
                  ? "destructive"
                  : "secondary"
            }
          >
            {permission === "granted" && subscription
              ? "Active"
              : permission === "denied"
                ? "Blocked"
                : "Inactive"}
          </Badge>
        </div>

        {permission === "granted" && subscription ? (
          <div className="space-y-3">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                You'll receive notifications for daily updates, announcements,
                and important messages.
              </AlertDescription>
            </Alert>
            <Button
              onClick={handleDisableNotifications}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              Disable Notifications
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Stay Connected</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3" />
                  <span>Daily updates about your child</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageSquare className="w-3 h-3" />
                  <span>Important announcements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <QrCode className="w-3 h-3" />
                  <span>Pickup reminders</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={handleEnableNotifications}
              disabled={loading || permission === "denied"}
              className="w-full bg-nursery-purple hover:bg-nursery-purple/90"
            >
              {loading ? "Setting up..." : "Enable Notifications"}
            </Button>
            {permission === "denied" && (
              <p className="text-xs text-gray-500 text-center">
                Notifications are blocked. Please enable them in your browser
                settings.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PWAFeatures() {
  const { isStandalone } = usePWA();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Smartphone className="w-4 h-4 mr-2" />
          App Features
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>App Experience</DialogTitle>
          <DialogDescription>
            {isStandalone
              ? "You're using the installed app!"
              : "Install the app for the best experience"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Offline Access</h3>
                <p className="text-xs text-gray-600">
                  View updates even without internet
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Push Notifications</h3>
                <p className="text-xs text-gray-600">
                  Get instant updates about your child
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Native Feel</h3>
                <p className="text-xs text-gray-600">
                  Full screen app experience
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Fast Loading</h3>
                <p className="text-xs text-gray-600">
                  Cached for instant access
                </p>
              </div>
            </div>
          </div>
          {isStandalone && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                You're already using the installed app! Enjoy all the premium
                features.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
