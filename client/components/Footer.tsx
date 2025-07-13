import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const StarLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 2L25.5 13.5L38 15L29 23.5L31.5 36L20 30L8.5 36L11 23.5L2 15L14.5 13.5L20 2Z"
      fill="url(#starGradient)"
      stroke="#FFF"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="25%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F72C5B" />
        <stop offset="75%" stopColor="#4E44CE" />
        <stop offset="100%" stopColor="#2CD5C4" />
      </linearGradient>
    </defs>
  </svg>
);

export function Footer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const schoolImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
      title: "Happy Learning",
      description: "Children engaged in creative activities",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
      title: "Outdoor Play",
      description: "Exploring nature and having fun outdoors",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      title: "Art & Creativity",
      description: "Developing imagination through art",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      title: "Group Activities",
      description: "Building friendships and social skills",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      title: "Music & Movement",
      description: "Dancing, singing, and musical exploration",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
      title: "Reading Together",
      description: "Developing early literacy skills",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % schoolImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, schoolImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % schoolImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + schoolImages.length) % schoolImages.length,
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <footer className="bg-white">
      {/* Partner Organizations */}
      <div className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Accredited & Supported By
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* OFSTED */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <div className="text-white font-bold text-xs text-center leading-tight">
                    OFSTED
                    <br />
                    <span className="text-[10px] opacity-90">REGISTERED</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  Quality
                  <br />
                  Assured
                </div>
              </motion.div>

              {/* Early Years Foundation Stage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <div className="text-white font-bold text-xs text-center leading-tight">
                    EYFS
                    <br />
                    <span className="text-[10px] opacity-90">COMPLIANT</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  Early Years
                  <br />
                  Foundation
                </div>
              </motion.div>

              {/* NDNA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <div className="text-white font-bold text-xs text-center leading-tight">
                    NDNA
                    <br />
                    <span className="text-[10px] opacity-90">MEMBER</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  National Day
                  <br />
                  Nurseries
                </div>
              </motion.div>

              {/* Local Council */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <div className="text-white font-bold text-xs text-center leading-tight">
                    CROYDON
                    <br />
                    <span className="text-[10px] opacity-90">COUNCIL</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  Local
                  <br />
                  Authority
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful School Image Carousel */}
      <div className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Happy Little Stars ⭐
            </h3>
            <p className="text-gray-600">
              Capturing precious moments every day
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Main Carousel */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={schoolImages[currentSlide].url}
                    alt={schoolImages[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <motion.h4
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl md:text-2xl font-bold mb-2"
                    >
                      {schoolImages[currentSlide].title}
                    </motion.h4>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm md:text-base opacity-90"
                    >
                      {schoolImages[currentSlide].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevSlide}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextSlide}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Play/Pause Control */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full w-8 h-8 p-0"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
              {schoolImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all ${
                    index === currentSlide
                      ? "ring-2 ring-purple-500 ring-offset-2"
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {schoolImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-purple-500"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="gradient-footer text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hillcrest Rising Stars */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <StarLogo />
                <h3 className="text-xl font-bold">Hillcrest Rising Stars</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>Clockhouse Community Association</p>
                <p>Hillcrest Hall, Fyshton Avenue</p>
                <p>Coulsdon, Surrey</p>
                <p>CR5 2PT</p>
                <p className="pt-2">
                  <a
                    href="mailto:hillcrest.risingstarsnursery@outlook.com"
                    className="hover:underline"
                  >
                    hillcrest.risingstarsnursery@outlook.com
                  </a>
                </p>
                <p>07340 960829</p>
                <p>Ofsted Unique Reference No. EY558506</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-purple-600"
                >
                  Contact Us Today
                </Button>
              </div>
            </div>

            {/* Rainbow Stars Nursery */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <StarLogo />
                <h3 className="text-xl font-bold">Rainbow Stars Nursery</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>1A Hesketh Road</p>
                <p>Thornton Heath</p>
                <p>Croydon, Surrey</p>
                <p>CR7 6BU</p>
                <p className="pt-2">
                  <a
                    href="mailto:rainbowstarsnursery@gmail.com"
                    className="hover:underline"
                  >
                    rainbowstarsnursery@gmail.com
                  </a>
                </p>
                <p>020 3827 6414 / 07946 427740</p>
                <p>Ofsted Unique Reference No. EY468999</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  Visit Rainbow Stars
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 pt-8 mt-12 text-center text-sm">
            <p>
              © 2025 Hillcrest Rising Stars Nursery. All content on this
              website (including images) are owned by us and our licensors. Do
              not attempt to copy without our consent.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
