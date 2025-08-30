import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Users,
  Heart,
  Award,
  Sparkles,
  Play,
  ArrowRight,
  CheckCircle,
  Camera,
  BookOpen,
  Palette,
  Music,
  TreePine,
  Utensils,
  Shield,
  Calendar,
  MessageSquare,
  QrCode,
  Bell,
} from "lucide-react";

const FloatingElement = ({ children, delay = 0, ...props }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="floating-animation"
    {...props}
  >
    {children}
  </motion.div>
);

const InteractiveCard = ({ children, ...props }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="interactive-card"
    {...props}
  >
    {children}
  </motion.div>
);

export default function Index() {
  const { user } = useAuth();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featuresScrollRef = useRef<HTMLDivElement>(null);

  const heroVideos = [
    {
      url: "https://player.vimeo.com/video/123456789?background=1&autoplay=1&loop=1&muted=1",
      poster:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop",
      title: "Happy Children Playing",
    },
    {
      url: "https://player.vimeo.com/video/123456790?background=1&autoplay=1&loop=1&muted=1",
      poster:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=800&fit=crop",
      title: "Learning Through Play",
    },
    {
      url: "https://player.vimeo.com/video/123456791?background=1&autoplay=1&loop=1&muted=1",
      poster:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop",
      title: "Creative Activities",
    },
  ];

  const features = [
    {
      icon: Camera,
      title: "Daily Photo Updates",
      description:
        "Receive beautiful photos of your child's daily activities and milestones",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description:
        "Chat directly with teachers and stay connected with your child's progress",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: QrCode,
      title: "Secure QR Pickup",
      description: "Safe and contactless child pickup with time-bound QR codes",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Interactive Calendar",
      description:
        "Stay updated with events, activities, and your child's schedule",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get instant alerts about important updates and announcements",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Parent Community",
      description: "Connect with other parents in our vibrant community forum",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const activities = [
    {
      icon: BookOpen,
      title: "Early Literacy",
      description: "Story time, phonics, and pre-reading skills",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Painting, crafts, and creative expression",
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Music,
      title: "Music & Movement",
      description: "Songs, dance, and musical exploration",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae4099bc65ce?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: TreePine,
      title: "Outdoor Adventures",
      description: "Nature exploration and outdoor play",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Utensils,
      title: "Healthy Eating",
      description: "Learning about nutrition and cooking",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Users,
      title: "Social Skills",
      description: "Building friendships and teamwork",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of Emma, Age 3",
      content:
        "The daily updates and photos make me feel connected to Emma's day. The staff are incredibly caring and professional.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b811906c?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Parent of Oliver, Age 4",
      content:
        "The QR pickup system is brilliant! So convenient and secure. Oliver loves coming here every day.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "Parent of Sophie, Age 2",
      content:
        "The parent portal keeps us informed about everything. We love being part of this wonderful community.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll features on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuresScrollRef.current) {
        const nextIndex = (currentFeatureIndex + 1) % features.length;
        setCurrentFeatureIndex(nextIndex);

        const cardWidth = 320; // w-80 = 320px + gap
        const scrollPosition = nextIndex * cardWidth;

        featuresScrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 3000); // 3 seconds as requested

    return () => clearInterval(interval);
  }, [currentFeatureIndex, features.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient opacity-20"></div>

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={heroVideos[currentVideo].poster}
                alt={heroVideos[currentVideo].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingElement delay={0.45}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/90 text-white text-xs md:text-sm shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
              Nurturing Young Minds Since 2010
            </div>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span>Welcome to </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Rainbow Childcare</span>
            </h1>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where every child's journey begins with love, learning, and laughter. We provide exceptional childcare services in a safe, nurturing environment
            </p>
          </FloatingElement>

          <FloatingElement delay={0.8}>
            <div className="flex flex-row gap-2 sm:gap-4 justify-center mb-12">
              <Button
                asChild
                size="sm"
                className="glass-button text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 h-auto flex-1 sm:flex-none max-w-[140px] sm:max-w-none"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  border: "none",
                }}
              >
                <a
                  href="/apply"
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <Sparkles className="w-3 sm:w-5 h-3 sm:h-5" />
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 sm:w-5 h-3 sm:h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="glass-button text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 h-auto text-gray-800 bg-white/20 border-white/50 hover:bg-white/30 hover:text-gray-900 flex-1 sm:flex-none max-w-[140px] sm:max-w-none"
              >
                <a
                  href="#virtual-tour"
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <Play className="w-3 sm:w-5 h-3 sm:h-5" />
                  <span>Virtual Tour</span>
                </a>
              </Button>
            </div>
          </FloatingElement>

          {/* Quick Stats */}
          <FloatingElement delay={1.0}>
            {/* Desktop Version */}
            <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "15+", label: "Years Experience", icon: Award },
                { number: "200+", label: "Happy Families", icon: Heart },
                { number: "2", label: "Locations", icon: MapPin },
                { number: "100%", label: "Satisfaction", icon: Star },
              ].map((stat, index) => (
                <InteractiveCard key={index}>
                  <div className="glass-card p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                </InteractiveCard>
              ))}
            </div>

            {/* Mobile Scrollable Version */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide px-4">
                {[
                  { number: "15+", label: "Years Experience", icon: Award },
                  { number: "200+", label: "Happy Families", icon: Heart },
                  { number: "2", label: "Locations", icon: MapPin },
                  { number: "100%", label: "Satisfaction", icon: Star },
                ].map((stat, index) => (
                  <div
                    key={`mobile-stat-${index}`}
                    className="flex-shrink-0 w-40"
                  >
                    <InteractiveCard>
                      <div className="glass-card p-4 text-center">
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                        <div className="text-xl font-bold text-white">
                          {stat.number}
                        </div>
                        <div className="text-xs text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                ))}
              </div>
            </div>
          </FloatingElement>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="text-center">
            <div className="w-1 h-12 bg-white/30 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Scroll to explore</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              Modern Technology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Parents <span className="text-purple-600">Love Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of nursery care with our innovative platform
              designed for modern families
            </p>
          </motion.div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <InteractiveCard>
                  <div className="glass-card p-8 h-full">
                    <motion.div
                      animate={{
                        scale: hoveredFeature === index ? 1.1 : 1,
                        rotate: hoveredFeature === index ? 5 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile Scrollable Version with Auto-scroll */}
          <div className="md:hidden">
            <div
              ref={featuresScrollRef}
              className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide snap-x snap-mandatory"
              onScroll={(e) => {
                // Update current index based on scroll position for manual scrolling
                const scrollLeft = e.currentTarget.scrollLeft;
                const cardWidth = 320;
                const newIndex = Math.round(scrollLeft / cardWidth);
                if (newIndex !== currentFeatureIndex) {
                  setCurrentFeatureIndex(newIndex);
                }
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={`mobile-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 snap-center"
                >
                  <InteractiveCard>
                    <div className="glass-card p-6 h-full">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>

            {/* Mobile Features Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentFeatureIndex(index);
                    if (featuresScrollRef.current) {
                      const cardWidth = 320;
                      featuresScrollRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentFeatureIndex
                      ? "w-8 bg-purple-500"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-700">
              Learning Activities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Engaging <span className="text-green-600">Activities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our carefully designed programs foster creativity, learning, and
              development through play
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <InteractiveCard>
                  <div className="glass-card overflow-hidden">
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
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              Parent Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Parents <span className="text-blue-600">Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <InteractiveCard>
                  <div className="glass-card p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Give your child the best start with our caring, professional team
              and modern facilities.
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 justify-center">
              <Button
                asChild
                size="sm"
                className="glass-button text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 h-auto bg-white text-purple-600 hover:bg-white/90 flex-1 sm:flex-none max-w-[150px] sm:max-w-none"
              >
                <a
                  href="/apply"
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <Sparkles className="w-3 sm:w-5 h-3 sm:h-5" />
                  <span>Start Application</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="glass-button text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 h-auto text-gray-800 bg-white/20 border-white/50 hover:bg-white/30 hover:text-gray-900 flex-1 sm:flex-none max-w-[120px] sm:max-w-none"
              >
                <a
                  href="/contact"
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <Phone className="w-3 sm:w-5 h-3 sm:h-5" />
                  <span>Book a Visit</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
