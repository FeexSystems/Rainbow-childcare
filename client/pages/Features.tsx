import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadSystem } from "@/components/FileUploadSystem";
import { InteractiveCalendar } from "@/components/InteractiveCalendar";
import { ChatInterface } from "@/components/ChatInterface";
import { motion } from "framer-motion";
import {
  Star,
  Camera,
  MessageSquare,
  QrCode,
  Calendar,
  Bell,
  Users,
  FileText,
  BarChart3,
  Shield,
  Smartphone,
  Cloud,
  Zap,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Lock,
  Clock,
  MapPin,
  Video,
  Music,
  Palette,
  BookOpen,
  TreePine,
  Utensils,
  Phone,
  Mail,
  Download,
} from "lucide-react";

const FeatureCard = ({ children, delay = 0, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5 }}
    {...props}
  >
    {children}
  </motion.div>
);

export default function Features() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const coreFeatures = [
    {
      icon: Camera,
      title: "Daily Photo Updates",
      description:
        "Beautiful photos of your child's activities delivered instantly to your device",
      status: "implemented",
      demo: "photos",
      benefits: [
        "Real-time photo sharing",
        "Secure cloud storage",
        "AI-powered tagging",
        "Privacy controls",
      ],
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description:
        "Chat directly with teachers and receive instant updates about your child",
      status: "implemented",
      demo: "chat",
      benefits: [
        "Instant messaging",
        "Group conversations",
        "Voice messages",
        "Read receipts",
      ],
    },
    {
      icon: QrCode,
      title: "Secure QR Pickup",
      description: "Contactless, secure child pickup with time-bound QR codes",
      status: "implemented",
      demo: "qr",
      benefits: [
        "Time-bound security",
        "Staff verification",
        "Pickup logs",
        "Emergency contacts",
      ],
    },
    {
      icon: Calendar,
      title: "Interactive Calendar",
      description:
        "Manage events, schedule meetings, and track important dates",
      status: "implemented",
      demo: "calendar",
      benefits: [
        "Event management",
        "RSVP tracking",
        "Reminders",
        "Sync with external calendars",
      ],
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligent alerts for important updates and announcements",
      status: "implemented",
      demo: "notifications",
      benefits: [
        "Push notifications",
        "Email alerts",
        "Custom preferences",
        "Priority filtering",
      ],
    },
    {
      icon: FileText,
      title: "File Management",
      description: "Upload, organize, and share documents, photos, and videos",
      status: "implemented",
      demo: "files",
      benefits: [
        "Cloud storage",
        "File organization",
        "Sharing controls",
        "Version history",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights into your child's progress and development",
      status: "implemented",
      demo: "analytics",
      benefits: [
        "Progress tracking",
        "Learning analytics",
        "Performance reports",
        "Trend analysis",
      ],
    },
    {
      icon: Users,
      title: "Parent Community",
      description: "Connect with other parents in our vibrant forum community",
      status: "implemented",
      demo: "community",
      benefits: [
        "Discussion forums",
        "Parent groups",
        "Event coordination",
        "Knowledge sharing",
      ],
    },
  ];

  const technicalFeatures = [
    {
      icon: Smartphone,
      title: "Progressive Web App",
      description: "Install on any device for native app experience",
      status: "implemented",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Secure, scalable backend with real-time capabilities",
      status: "implemented",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy protection",
      status: "implemented",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant synchronization across all devices",
      status: "implemented",
    },
  ];

  const upcomingFeatures = [
    {
      icon: Video,
      title: "Video Calls",
      description: "Virtual meetings with teachers and staff",
      status: "planned",
      eta: "Q1 2025",
    },
    {
      icon: Target,
      title: "Learning Assessments",
      description: "Detailed child development tracking",
      status: "planned",
      eta: "Q2 2025",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered insights and recommendations",
      status: "planned",
      eta: "Q2 2025",
    },
    {
      icon: Lock,
      title: "Advanced Permissions",
      description: "Granular access control and privacy settings",
      status: "planned",
      eta: "Q1 2025",
    },
  ];

  const learningActivities = [
    {
      icon: BookOpen,
      title: "Early Literacy",
      description: "Story time, phonics, and pre-reading skills",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Painting, crafts, and creative expression",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    },
    {
      icon: Music,
      title: "Music & Movement",
      description: "Songs, dance, and musical exploration",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    },
    {
      icon: TreePine,
      title: "Outdoor Adventures",
      description: "Nature exploration and outdoor play",
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case "files":
        return <FileUploadSystem />;
      case "calendar":
        return <InteractiveCalendar />;
      case "chat":
        return (
          <div className="h-96 relative">
            <ChatInterface />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Platform <span className="text-yellow-300">Features</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools designed to enhance your
              nursery experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="glass-button bg-white text-purple-600 hover:bg-white/90"
                onClick={() => setActiveDemo("files")}
              >
                <Play className="w-5 h-5 mr-2" />
                Try Interactive Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-button text-white border-white/30"
              >
                <Download className="w-5 h-5 mr-2" />
                Feature Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Interactive Demo Section */}
        {activeDemo && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-16"
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <span>Interactive Demo</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDemo(null)}
                    size="sm"
                  >
                    Close Demo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>{renderDemo()}</CardContent>
            </Card>
          </motion.section>
        )}

        <Tabs defaultValue="core" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="core">Core Features</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          {/* Core Features */}
          <TabsContent value="core" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core Platform Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for modern nursery management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <FeatureCard key={index} delay={index * 0.1}>
                  <Card className="glass-card h-full interactive-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <feature.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {feature.title}
                            </CardTitle>
                            <Badge className="bg-green-100 text-green-700 mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {feature.status}
                            </Badge>
                          </div>
                        </div>
                        {feature.demo && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveDemo(feature.demo)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </FeatureCard>
              ))}
            </div>
          </TabsContent>

          {/* Technical Features */}
          <TabsContent value="technical" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Technical Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with modern technology for reliability and performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalFeatures.map((feature, index) => (
                <FeatureCard key={index} delay={index * 0.1}>
                  <Card className="glass-card interactive-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {feature.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feature.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </FeatureCard>
              ))}
            </div>

            {/* Architecture Diagram */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">Frontend</h3>
                      <p className="text-sm text-gray-600">
                        React 18, TypeScript, Tailwind CSS, Framer Motion
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center">
                        <Cloud className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">Backend</h3>
                      <p className="text-sm text-gray-600">
                        Supabase, PostgreSQL, Real-time subscriptions
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">Security</h3>
                      <p className="text-sm text-gray-600">
                        RLS policies, JWT auth, HTTPS encryption
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Activities */}
          <TabsContent value="activities" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Learning Activities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Engaging programs that foster creativity and development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {learningActivities.map((activity, index) => (
                <FeatureCard key={index} delay={index * 0.1}>
                  <Card className="glass-card interactive-card overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <activity.icon className="w-8 h-8 text-white mb-2" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600">{activity.description}</p>
                    </CardContent>
                  </Card>
                </FeatureCard>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Features */}
          <TabsContent value="upcoming" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Exciting new features in development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingFeatures.map((feature, index) => (
                <FeatureCard key={index} delay={index * 0.1}>
                  <Card className="glass-card interactive-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {feature.title}
                          </h3>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {feature.eta}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </FeatureCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <Card className="glass-card">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of families already using our platform for a
                better nursery experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
