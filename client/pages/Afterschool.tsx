import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  BookOpen,
  Users,
  Palette,
  Dumbbell,
  Clock,
} from "lucide-react";

export default function Afterschool() {
  const features = [
    {
      icon: Shield,
      title: "Safe Environment",
      desc: "Supervised care in secure facility",
    },
    {
      icon: BookOpen,
      title: "Homework Support",
      desc: "Assistance with school assignments",
    },
    {
      icon: Users,
      title: "Social Development",
      desc: "Peer interaction and team activities",
    },
    {
      icon: Palette,
      title: "Creative Activities",
      desc: "Art, crafts, and creative expression",
    },
    {
      icon: Dumbbell,
      title: "Recreational Time",
      desc: "Games and physical activities",
    },
    {
      icon: Users,
      title: "Nurturing Care",
      desc: "Individual attention and support",
    },
  ];

  const activities = [
    [
      {
        title: "Homework Club",
        time: "3:00 PM - 4:00 PM",
        desc: "Dedicated time for assignments with support",
      },
      {
        title: "Physical Activities",
        time: "4:45 PM - 5:30 PM",
        desc: "Sports, games, and outdoor play",
      },
      {
        title: "Free Play",
        time: "5:45 PM - 6:00 PM",
        desc: "Supervised free time and departure",
      },
    ],
    [
      {
        title: "Creative Arts",
        time: "4:00 PM - 4:45 PM",
        desc: "Painting, crafts, and expression",
      },
      {
        title: "Snack Time",
        time: "5:30 PM - 5:45 PM",
        desc: "Healthy snacks and social interaction",
      },
    ],
  ];

  const benefits = [
    { title: "Academic Support", desc: "Homework assistance and enrichment" },
    { title: "Social Skills", desc: "Peer interaction and friendships" },
    { title: "Creative Expression", desc: "Art, music, and activities" },
    { title: "Physical Development", desc: "Sports and movement" },
    { title: "Safe Environment", desc: "Supervised care until parents arrive" },
    { title: "Flexible Schedule", desc: "Available until 6:00 PM daily" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <section className="relative px-4 pt-16 pb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/60 to-purple-100/60" />
        <div className="relative max-w-4xl mx-auto">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700">
            School-Age Children
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Afterschool{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Program
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Engaging afterschool care that combines homework support, creative
            activities, and social development in a fun, nurturing environment.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Schedule a Visit
            </Button>
            <Button
              variant="outline"
              className="border-indigo-300 text-indigo-700"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Why Choose Our Afterschool Program?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            We provide comprehensive afterschool care that supports your child's
            development
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl bg-white shadow-sm p-5 border border-indigo-100"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
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
            Daily Activities
          </h2>
          <p className="text-gray-600 text-center mb-8">
            A structured afternoon that balances learning, creativity, and fun
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {activities.map((col, ci) => (
              <div key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-lg bg-white border border-indigo-100 shadow-sm p-4"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-xs text-indigo-600 font-semibold whitespace-nowrap">
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
            Program Benefits
          </h2>
          <p className="text-gray-600 text-center mb-8">
            How our afterschool program supports your child's growth
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((c, i) => (
              <div
                key={i}
                className="rounded-xl bg-white shadow-sm p-5 border border-indigo-100"
              >
                <div className="font-semibold text-gray-800">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to Enroll Your Child?
          </h3>
          <p className="text-white/90 mb-6">
            Give your child a fun and enriching afterschool experience
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
            <Button className="bg-white text-indigo-700 hover:bg-white/90">
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
