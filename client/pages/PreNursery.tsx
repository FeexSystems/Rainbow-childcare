import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Utensils, Sprout, Users, Heart, CheckCircle, BookOpen } from "lucide-react";

export default function PreNursery() {
  const features = [
    { icon: Shield, title: "Safe Environment", desc: "Child-safe facilities with constant supervision" },
    { icon: Utensils, title: "Nutritious Meals", desc: "Age-appropriate healthy meals and snacks" },
    { icon: Sprout, title: "Early Development", desc: "Foundation for learning and growth" },
    { icon: Users, title: "Parent Involvement", desc: "Regular communication and family engagement" },
    { icon: Heart, title: "Nurturing Care", desc: "Individual attention and emotional support" },
    { icon: CheckCircle, title: "Qualified Staff", desc: "Experienced early childhood professionals" },
  ];

  const schedule = [
    [
      { title: "Arrival & Welcome", time: "8:00 AM - 8:30 AM", desc: "Gentle transition and morning greetings" },
      { title: "Circle Time", time: "9:00 AM - 9:30 AM", desc: "Songs, stories, and group activities" },
      { title: "Snack Time", time: "10:00 AM - 10:30 AM", desc: "Healthy snack and social interaction" },
      { title: "Story Time", time: "11:00 AM - 11:30 AM", desc: "Reading and language development" },
      { title: "Rest Time", time: "12:00 PM - 2:00 PM", desc: "Quiet time and nap for young children" },
      { title: "Afternoon Snack", time: "2:30 PM - 3:00 PM", desc: "Light snack and preparation for departure" },
    ],
    [
      { title: "Free Play", time: "8:30 AM - 9:00 AM", desc: "Exploration with age-appropriate toys" },
      { title: "Learning Activities", time: "9:30 AM - 10:00 AM", desc: "Simple educational games and crafts" },
      { title: "Outdoor Time", time: "10:30 AM - 11:00 AM", desc: "Fresh air and gentle physical activities" },
      { title: "Lunch", time: "11:30 AM - 12:00 PM", desc: "Nutritious meal and table manners" },
      { title: "Afternoon Activities", time: "2:00 PM - 2:30 PM", desc: "Gentle play and learning" },
      { title: "Free Play & Departure", time: "3:00 PM - 4:00 PM", desc: "Supervised play until pickup" },
    ],
  ];

  const learning = [
    { title: "Language Development", desc: "Early communication and vocabulary building" },
    { title: "Motor Skills", desc: "Gross and fine motor development" },
    { title: "Social Skills", desc: "Peer interaction and sharing" },
    { title: "Cognitive Development", desc: "Problem-solving and exploration" },
    { title: "Creative Expression", desc: "Art, music, and imaginative play" },
    { title: "Emotional Development", desc: "Self-regulation and emotional intelligence" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <section className="relative px-4 pt-16 pb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-100/60 to-yellow-100/60" />
        <div className="relative max-w-4xl mx-auto">
          <Badge className="mb-4 bg-lime-100 text-lime-700">Ages 1–2 Years</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Pre-<span className="bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">Nursery</span> <span className="bg-gradient-to-r from-lime-500 to-yellow-500 bg-clip-text text-transparent">Program</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Early learning foundation for the youngest learners, providing a gentle introduction to structured activities and social interaction in a nurturing environment.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-lime-600 hover:bg-lime-700">Schedule a Visit</Button>
            <Button variant="outline" className="border-lime-300 text-lime-700">Contact Us</Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Why Choose Our Pre-Nursery?</h2>
          <p className="text-gray-600 text-center mb-8">We provide gentle, age-appropriate care that supports early development</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl bg-white shadow-sm p-5 border border-lime-100">
                <div className="w-10 h-10 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-3">
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Daily Schedule</h2>
        <p className="text-gray-600 text-center mb-8">A gentle, structured day designed for young learners</p>
          <div className="grid md:grid-cols-2 gap-4">
            {schedule.map((col, ci) => (
              <div key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 rounded-lg bg-white border border-lime-100 shadow-sm p-4">
                    <div>
                      <div className="font-medium text-gray-800">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-xs text-lime-700 font-semibold whitespace-nowrap">{item.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Learning Areas</h2>
          <p className="text-gray-600 text-center mb-8">Comprehensive development areas that prepare children for future learning</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learning.map((c, i) => (
              <div key={i} className="rounded-xl bg-white shadow-sm p-5 border border-lime-100">
                <div className="font-semibold text-gray-800">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-lime-600 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to Start Your Child's Journey?</h3>
          <p className="text-white/90 mb-6">Give your little one the best foundation for learning and growth</p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-6">
            {["Schedule a Visit", "Complete Application", "Start Date"].map((s, i) => (
              <div key={i} className="rounded-lg bg-white/10 p-4">
                <div className="text-3xl font-bold">{i + 1}</div>
                <div>{s}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <Button className="bg-white text-lime-700 hover:bg-white/90">Schedule a Visit</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">Request Information</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
