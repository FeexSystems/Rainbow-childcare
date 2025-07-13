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
} from "lucide-react";

const roomsAndAges = [
  {
    name: "Toddlers Room",
    age: "18 months - 2.5 years",
    capacity: "12 children",
    description:
      "A nurturing environment designed for our youngest learners to explore, play, and develop essential life skills.",
    features: [
      "Sensory play areas",
      "Sleep room",
      "Outdoor play space",
      "Creative corner",
    ],
    image:
      "https://images.unsplash.com/photo-1544776527-4cf0eb8fc1a4?w=400&h=300&fit=crop&crop=center",
  },
  {
    name: "Preschoolers Room",
    age: "2.5 - 5 years",
    capacity: "16 children",
    description:
      "Pre-school preparation with structured learning activities to develop school readiness and independence.",
    features: [
      "Learning stations",
      "Library corner",
      "Art & craft area",
      "Role play zone",
    ],
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center",
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

export default function HillCrestNursery() {
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
            <Star className="h-12 w-12 text-nursery-purple mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              HillCrest Rising Stars
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A nurturing environment where toddlers and preschoolers flourish
            through play-based learning, creative exploration, and dedicated
            care from our experienced early years practitioners.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-nursery-purple" />
              <span>
                Clockhouse Community Association, Holmlea Walk, Croydon CR5 2RP
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-nursery-purple" />
              <span>7:30 AM - 6:00 PM</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Rooms & Age Groups */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Our Rooms & Age Groups
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each room is specially designed to meet the developmental needs of
              children at different stages, providing age-appropriate activities
              and learning opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {roomsAndAges.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {room.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-medium text-nursery-purple">
                        {room.age}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {room.capacity}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Room Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Heart className="h-3 w-3 text-nursery-pink mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Our structured yet flexible daily routine provides children with
              security and predictability while allowing for individual needs
              and interests.
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
              Visit HillCrest Rising Stars
            </h2>

            <div className="glass-card">
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="h-6 w-6 text-nursery-purple" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">07940 960829</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="h-6 w-6 text-nursery-purple" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">
                        hillcrest.risingstars@outlook.com
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
                    Clockhouse Community Association
                    <br />
                    Holmlea Walk, Croydon
                    <br />
                    CR5 2RP
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
