import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Home,
  Scale,
  Lightbulb,
  Activity,
  Cpu,
  Heart,
  Globe,
  Target,
  Smile,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Colorful Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 hero-colorful opacity-90"></div>

        {/* Purple Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-nursery-purple to-nursery-pink"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hillcrest Rising Stars
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Nursery and Pre-school with Registered Manager - 3 Stars
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-80">
              We offer FREE year part-time placement funding for 2, 3 and 4 year
              old children
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-nursery-purple hover:bg-gray-100 font-semibold px-8"
              >
                <Link to="/apply">Apply Today</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Children Photos */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face"
            alt="Happy child"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face"
            alt="Smiling child"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </section>

      {/* Oral Health Section */}
      <section className="py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            FIND OUT HOW WE ARE SUPPORTING YOUR CHILD'S
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8">ORAL HEALTH</h3>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
          >
            <Link to="/oral-health">Find out more</Link>
          </Button>
        </div>
      </section>

      {/* Rainbow Day Nursery */}
      <section className="py-16 bg-nursery-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rainbow Stars Day Nursery and Wrap around
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Childcare</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-8">Croydon</h4>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Full daycare for children aged 6 months to 5 years and holiday and
            term time services.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=400&fit=crop"
                alt="Smiling child"
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                About Us
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We are a children's community nursery with a warm, relaxed and
                  nurturing environment. We offer the very best care and
                  education for every child that comes to us as we value their
                  individual achievement and overall wellbeing. We also offer a
                  very special childcare experience, where families are welcome
                  participants.
                </p>
                <p>Our skilled and approachable:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Qualified teachers and practitioners</li>
                  <li>• Registered Manager</li>
                  <li>• Management Team</li>
                </ul>
              </div>
              <Button
                asChild
                className="mt-6 bg-nursery-purple hover:bg-nursery-purple/90"
              >
                <Link to="/about">Find out more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Aims Section */}
      <section className="py-16 gradient-teal-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Aims
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Educational Excellence</h3>
              <p className="text-sm opacity-90">
                Providing top-quality early years education
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nurturing Environment</h3>
              <p className="text-sm opacity-90">
                Creating a safe and loving space for growth
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Focus</h3>
              <p className="text-sm opacity-90">
                Building strong connections with families
              </p>
            </div>
            <div className="text-center">
              <Scale className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Individual Development</h3>
              <p className="text-sm opacity-90">
                Supporting each child's unique journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Times & Fees */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Opening Times & Fees
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We are open Monday to Friday all year round except for 1 week at
            Christmas and 2 weeks during summer holidays.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            We are free with child care all kids and 3-5 years.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-nursery-orange hover:bg-nursery-orange/90 text-white"
          >
            <Link to="/fees">View Schedule of Fees</Link>
          </Button>
        </div>
      </section>

      {/* Effective Learning Section */}
      <section className="py-16 bg-nursery-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Effective Learning
          </h2>
          <p className="text-center text-lg mb-12 max-w-4xl mx-auto">
            We believe in promoting children's Early Years Foundation Stage
            (EYFS) this allows them to develop the fundamental early foundations
            and skills building to become life-long learners and to develop the
            characteristics of effective learning.
          </p>
          <p className="text-center text-lg mb-12 max-w-4xl mx-auto">
            We understand that all children young and old, construct their
            feelings and emotions through four characteristics of effective
            learning, developing children's interests towards the Early Years
            Foundation Stage aims.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Lightbulb className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Playing & Exploring</h3>
            </div>
            <div>
              <Activity className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Active Learning</h3>
            </div>
            <div>
              <Cpu className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                Creating & Thinking Critically
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            <div className="bg-nursery-teal text-white p-8 text-center">
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">A Unique Child</h3>
              <p className="text-sm">
                Every child is a unique child, who is constantly learning and
                can be resilient, capable, confident and self-assured.
              </p>
            </div>
            <div className="bg-nursery-pink text-white p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Positive Relationships</h3>
              <p className="text-sm">
                Children learn to be strong and independent through positive
                relationships.
              </p>
            </div>
            <div className="bg-nursery-green text-white p-8 text-center">
              <Home className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Enabling Environments</h3>
              <p className="text-sm">
                Children learn and develop well in enabling environments, in
                which their experiences respond to their individual needs.
              </p>
            </div>
            <div className="bg-nursery-purple text-white p-8 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Learning & Development</h3>
              <p className="text-sm">
                Children develop and learn in different ways and at different
                rates. The framework covers the education and care of all
                children.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-colorful opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-white/90">
              Please make your choice below or take a more up to you further
              we'll email detail
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input type="email" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea className="w-full" rows={4} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-nursery-purple hover:bg-nursery-purple/90"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
