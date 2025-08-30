import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Shield,
  Utensils,
  BookOpen,
  Users,
  Heart,
  Sun,
  Clock,
  Trees,
} from "lucide-react";

export default function DayNursery() {
  const features = [
    {
      icon: Shield,
      title: "Safe Environment",
      desc: "24/7 security and child-safe facilities",
    },
    {
      icon: Utensils,
      title: "Nutritious Meals",
      desc: "Healthy, balanced meals and snacks provided",
    },
    {
      icon: BookOpen,
      title: "Educational Activities",
      desc: "Age-appropriate learning and development",
    },
    {
      icon: Users,
      title: "Social Development",
      desc: "Group activities and peer interaction",
    },
    {
      icon: Heart,
      title: "Nurturing Care",
      desc: "Individual attention and emotional support",
    },
    {
      icon: CheckCircle,
      title: "Qualified Staff",
      desc: "Experienced and certified childcare professionals",
    },
  ];

  const schedule = [
    [
      {
        title: "Arrival & Free Play",
        time: "7:00 AM - 8:30 AM",
        desc: "Children arrive and engage in supervised free play",
      },
      {
        title: "Learning Centers",
        time: "9:00 AM - 10:00 AM",
        desc: "Structured educational activities and crafts",
      },
      {
        title: "Outdoor Play",
        time: "10:30 AM - 11:30 AM",
        desc: "Physical activities and fresh air",
      },
      {
        title: "Lunch",
        time: "12:00 PM - 1:00 PM",
        desc: "Nutritious meal and table manners",
      },
      {
        title: "Afternoon Activities",
        time: "3:00 PM - 4:00 PM",
        desc: "Creative play and learning centers",
      },
      {
        title: "Free Play & Departure",
        time: "4:30 PM - 6:00 PM",
        desc: "Supervised play until pickup",
      },
    ],
    [
      {
        title: "Morning Circle",
        time: "8:30 AM - 9:00 AM",
        desc: "Group activities, songs, and daily planning",
      },
      {
        title: "Snack Time",
        time: "10:00 AM - 10:30 AM",
        desc: "Healthy snack and social interaction",
      },
      {
        title: "Story Time",
        time: "11:30 AM - 12:00 PM",
        desc: "Reading and literacy development",
      },
      {
        title: "Rest Time",
        time: "1:30 PM - 3:00 PM",
        desc: "Quiet time and nap for younger children",
      },
      {
        title: "Afternoon Snack",
        time: "4:00 PM - 4:30 PM",
        desc: "Light snack and preparation for departure",
      },
    ],
  ];

  const curriculum = [
    {
      title: "Language & Literacy",
      desc: "Reading, writing, and communication skills",
    },
    { title: "Mathematics", desc: "Numbers, shapes, and problem-solving" },
    {
      title: "Science & Discovery",
      desc: "Exploration and understanding the world",
    },
    { title: "Creative Arts", desc: "Music, art, and creative expression" },
    { title: "Physical Development", desc: "Gross and fine motor skills" },
    {
      title: "Social Skills",
      desc: "Cooperation, sharing, and emotional intelligence",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="relative px-4 pt-16 pb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/60 to-rose-100/60" />
        <div className="relative max-w-4xl mx-auto">
          <Badge className="mb-4 bg-orange-100 text-orange-700">
            Ages 2–6 Years
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Day{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Nursery
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Full-day care in a nurturing environment where children learn, grow,
            and develop essential skills through play-based learning and
            structured activities.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Schedule a Visit
            </Button>
            <Button
              variant="outline"
              className="border-orange-300 text-orange-700"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Why Choose Our Day Nursery?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            We provide comprehensive care that supports your child's development
            in every way
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl bg-white shadow-sm p-5 border border-orange-100"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Daily Schedule
          </h2>
          <p className="text-gray-600 text-center mb-8">
            A structured day that balances learning, play, and rest
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {schedule.map((col, ci) => (
              <div key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-lg bg-white border border-orange-100 shadow-sm p-4"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-xs text-orange-600 font-semibold whitespace-nowrap">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Our Curriculum
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Comprehensive learning areas that prepare children for future
            success
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((c, i) => (
              <div
                key={i}
                className="rounded-xl bg-white shadow-sm p-5 border border-orange-100"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="font-semibold text-gray-800">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to Enroll Your Child?
          </h3>
          <p className="text-white/90 mb-6">
            Join our nurturing community and give your child the best start in
            life
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-6">
            {["Schedule a Visit", "Complete Application", "Start Date"].map(
              (s, i) => (
                <div key={i} className="rounded-lg bg-white/10 p-4">
                  <div className="text-3xl font-bold">{i + 1}</div>
                  <div>{s}</div>
                </div>
              ),
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-white/90">
              Schedule a Visit
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Request Information
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
