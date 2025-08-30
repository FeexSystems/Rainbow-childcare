import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Heart, BookOpen, Camera, MessageSquare, QrCode, Calendar, FileText } from "lucide-react";

export default function About() {
  const values = [
    { icon: Heart, title: "Nurturing Care", desc: "Every child is valued, respected, and nurtured in a loving environment" },
    { icon: Shield, title: "Safety First", desc: "Robust safeguarding and health & safety policies guide everything we do" },
    { icon: Users, title: "Family Partnership", desc: "Strong communication and collaboration with parents and carers" },
    { icon: BookOpen, title: "Learning Through Play", desc: "Play-based curriculum aligned with Early Years Foundation Stage" },
  ];

  const platform = [
    { icon: Camera, title: "Daily Photo Updates" },
    { icon: MessageSquare, title: "Real-time Communication" },
    { icon: QrCode, title: "Secure QR Pickup" },
    { icon: Calendar, title: "Interactive Calendar" },
  ];

  const policies = [
    { title: "Safeguarding", desc: "Protecting children's welfare with clear procedures and staff training" },
    { title: "Data Protection", desc: "Your privacy is protected in accordance with GDPR" },
    { title: "Positive Behaviour", desc: "Encouraging kindness, respect, and emotional development" },
    { title: "British Values", desc: "Promoting democracy, rule of law, liberty, and mutual respect" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <section className="py-16 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <Badge className="mb-4 bg-purple-100 text-purple-700">About Rainbow Childcare</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Our Story & Approach</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide exceptional early years education and care in a warm, inclusive environment—partnering with families to support each child's unique journey.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <Card key={i} className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <v.icon className="w-6 h-6 text-purple-600" />
                  {v.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">{v.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Smart, Family-Friendly Platform</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platform.map((p, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-purple-100 text-center">
                <p.icon className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <div className="font-semibold text-gray-800">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Policies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((p, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-purple-100">
                <div className="font-semibold text-gray-800">{p.title}</div>
                <div className="text-sm text-gray-600">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/fees" className="text-purple-600 hover:underline">View Fees</a>
          </div>
        </div>
      </section>
    </div>
  );
}
