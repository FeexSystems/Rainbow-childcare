import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Users,
  Star,
  Calendar,
  Heart,
  Baby,
  Home,
  Utensils,
  Sparkles,
  Bath,
  Moon,
} from "lucide-react";

const roomsAndFacilities = [
  {
    name: "Baby Room",
    age: "6 weeks - 18 months",
    capacity: "8 babies",
    icon: Baby,
    description:
      "A calm, homely environment specifically designed for our youngest children with qualified baby room practitioners providing one-to-one care.",
    features: [
      "Separate sleep room",
      "Baby changing facilities",
      "Milk kitchen",
      "Sensory play area",
      "Outdoor baby garden",
    ],
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Toddler Room",
    age: "18 months - 2.5 years",
    capacity: "12 children",
    icon: Home,
    description:
      "An exciting space where toddlers can explore, discover and develop independence through carefully planned activities and free play.",
    features: [
      "Indoor climbing frame",
      "Water play area",
      "Creative corner",
      "Book nook",
      "Direct garden access",
    ],
    image:
      "https://images.unsplash.com/photo-1544776527-4cf0eb8fc1a4?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Pre-School Room",
    age: "2.5 - 5 years",
    capacity: "16 children",
    icon: Star,
    description:
      "School readiness preparation with structured learning, literacy and numeracy activities alongside creative and imaginative play.",
    features: [
      "Learning stations",
      "Interactive whiteboard",
      "Library corner",
      "Science discovery table",
      "Outdoor classroom",
    ],
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Sensory Room",
    age: "All ages",
    capacity: "6 children",
    icon: Sparkles,
    description:
      "A specialized space designed to stimulate the senses, support sensory development and provide therapeutic experiences for all children.",
    features: [
      "Fiber optic lighting",
      "Bubble tubes",
      "Tactile wall panels",
      "Sound equipment",
      "Comfortable seating",
    ],
    image:
      "https://images.unsplash.com/photo-1544776527-4cf0eb8fc1a4?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Dining Room",
    age: "All ages",
    capacity: "20 children",
    icon: Utensils,
    description:
      "A spacious dining area where children enjoy nutritious, freshly prepared meals and learn about healthy eating and table manners.",
    features: [
      "Child-sized furniture",
      "Servery hatch",
      "Hand washing station",
      "Display boards",
      "Adjacent kitchen",
    ],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Nap Area",
    age: "All ages",
    capacity: "15 children",
    icon: Moon,
    description:
      "A quiet, comfortable space for rest time with individual sleep mats and a peaceful atmosphere for children who need daytime sleep.",
    features: [
      "Individual sleep mats",
      "Blackout curtains",
      "Soft lighting",
      "Quiet corner",
      "Storage for belongings",
    ],
    image:
      "https://images.unsplash.com/photo-1586952518485-11b180e92764?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Toilets",
    age: "All ages",
    capacity: "N/A",
    icon: Bath,
    description:
      "Child-friendly toilet and washing facilities designed to promote independence and maintain the highest standards of hygiene.",
    features: [
      "Child-height facilities",
      "Baby changing unit",
      "Step stools",
      "Paper towel dispensers",
      "Privacy screens",
    ],
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop&crop=center",
  },
];

const dailySchedule = [
  { time: "7:30 - 8:30", activity: "Arrival & Free Play" },
  { time: "8:30 - 9:00", activity: "Morning Circle Time" },
  { time: "9:00 - 10:00", activity: "Structured Learning Activities" },
  { time: "10:00 - 10:15", activity: "Morning Snack" },
  { time: "10:15 - 11:30", activity: "Outdoor Play" },
  { time: "11:30 - 12:00", activity: "Lunch Time" },
  { time: "12:00 - 14:00", activity: "Rest Time / Quiet Activities" },
  { time: "14:00 - 14:15", activity: "Afternoon Snack" },
  { time: "14:15 - 15:30", activity: "Creative Play & Arts" },
  { time: "15:30 - 16:00", activity: "Story Time & Songs" },
  { time: "16:00 - 18:00", activity: "Free Play & Collection" },
];

export default function RainbowStarsNursery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-nursery-purple/10 to-nursery-pink/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              Rainbow Stars Croydon
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive early years setting offering specialized rooms and
            facilities for children from 6 weeks to 5 years, providing
            exceptional care and learning opportunities in a purpose-built
            environment.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-nursery-purple" />
              <span>1A Heathfield Road, Thornton Heath, Croydon, Surrey</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-nursery-purple" />
              <span>7:30 AM - 6:00 PM</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Rooms & Facilities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Our Rooms & Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Rainbow Stars Croydon features purpose-built rooms and specialized
              facilities designed to support every aspect of your child's
              development and daily care needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomsAndFacilities.map((room, index) => {
              const IconComponent = room.icon;
              return (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 group"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-nursery-purple" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-sm font-medium text-nursery-purple">
                          {room.age}
                        </div>
                        {room.capacity !== "N/A" && (
                          <div className="text-xs text-gray-500 flex items-center justify-end">
                            <Users className="h-3 w-3 mr-1" />
                            {room.capacity}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {room.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">
                        Features:
                      </h4>
                      <div className="space-y-1">
                        {room.features.slice(0, 3).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <Heart className="h-2 w-2 text-nursery-pink mr-2" />
                            {feature}
                          </div>
                        ))}
                        {room.features.length > 3 && (
                          <div className="text-xs text-gray-500 italic">
                            +{room.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Daily Schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our carefully planned daily routine ensures children experience a
              perfect balance of structured learning, free play, rest, and
              nutrition throughout their time with us.
            </p>
          </motion.div>

          <div className="glass-card">
            <div className="p-8">
              <div className="space-y-4">
                {dailySchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 px-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-nursery-purple" />
                      <span className="font-semibold text-nursery-purple">
                        {item.time}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {item.activity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After School Care */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Extended Care Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card text-center"
            >
              <div className="p-8">
                <Calendar className="h-12 w-12 text-nursery-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Before School
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Early morning drop-off available from 7:30 AM with breakfast
                  and supervised activities before school transport.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card text-center"
            >
              <div className="p-8">
                <Calendar className="h-12 w-12 text-nursery-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  After School
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  After school care until 6:00 PM including healthy snacks,
                  homework support, and recreational activities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card text-center"
            >
              <div className="p-8">
                <Calendar className="h-12 w-12 text-nursery-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Holiday / Half Term
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Full-day holiday care with exciting trips, activities, and
                  themed weeks during school holidays and half terms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              Visit Rainbow Stars Croydon
            </h2>

            <div className="glass-card">
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="h-6 w-6 text-nursery-purple" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">
                        020 3827 6414 / 07368 429780
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="h-6 w-6 text-nursery-purple" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">
                        rainbowstarsnursery@gmail.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MapPin className="h-6 w-6 text-nursery-purple" />
                    <div className="font-semibold">Address</div>
                  </div>
                  <div className="text-gray-600">
                    1A Heathfield Road
                    <br />
                    Thornton Heath, Croydon
                    <br />
                    Surrey CR7 6DP
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <div className="font-semibold mb-1">
                    Ofsted Unique Reference No: ET368449
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-nursery-purple to-nursery-pink hover:scale-105 transform transition-all duration-300"
                asChild
              >
                <a href="/apply">Apply for a Place</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-nursery-purple text-nursery-purple hover:bg-nursery-purple hover:text-white transition-all duration-300"
                asChild
              >
                <a href="/contact">Schedule a Visit</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
