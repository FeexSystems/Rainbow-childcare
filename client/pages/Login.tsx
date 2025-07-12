import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  Settings,
  HeadphonesIcon,
  LogIn,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<
    "parent" | "teacher" | "admin" | "support"
  >("parent");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      // For demo purposes, we'll use simple role-based routing
      localStorage.setItem("userRole", userType);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isAuthenticated", "true");

      if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      setLoading(false);
    }, 1000);
  };

  const userTypes = [
    {
      type: "parent" as const,
      title: "Parent",
      description: "Access your child's progress and school updates",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      type: "teacher" as const,
      title: "Teacher",
      description: "Manage classes and student activities",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      type: "admin" as const,
      title: "Administrator",
      description: "Full system access and management",
      icon: Settings,
      color: "bg-purple-500",
    },
    {
      type: "support" as const,
      title: "Support Staff",
      description: "Operational support and assistance",
      icon: HeadphonesIcon,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.type}
                        type="button"
                        onClick={() => setUserType(type.type)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          userType === type.type
                            ? "border-nursery-purple bg-nursery-purple/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`${type.color} p-2 rounded-md text-white`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {type.title}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">
                  Demo Credentials
                </h3>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p>
                    <strong>Email:</strong> demo@nursery.com
                  </p>
                  <p>
                    <strong>Password:</strong> demo123
                  </p>
                  <p className="text-xs mt-2 opacity-75">
                    Use any email/password combination for demo purposes
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-nursery-purple hover:bg-nursery-purple/90"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 pt-6 border-t text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/apply"
                  className="text-nursery-purple hover:underline"
                >
                  Apply for admission
                </a>
              </p>
              <p className="text-sm text-gray-600">
                <a href="#" className="text-nursery-purple hover:underline">
                  Forgot your password?
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">
              Real-time Updates
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Get instant notifications about your child's activities
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">QR Pickup</h3>
            <p className="text-xs text-gray-600 mt-1">
              Secure, contactless child pickup system
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 text-sm">
              Community Forum
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Connect with other parents and teachers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
