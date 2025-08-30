import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    is_urgent: false,
    preferred_contact_method: "email",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Quick booking state
  const [location, setLocation] = useState("hillcrest");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await submitContactForm(formData);

      if (error) {
        toast({
          title: "Submission Failed",
          description:
            error.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card max-w-2xl w-full text-center"
        >
          <div className="p-12">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Message Sent!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for contacting us. We've received your message and will
              get back to you
              {formData.is_urgent
                ? " within 24 hours"
                : " within 2-3 business days"}
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-nursery-purple to-nursery-pink"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    is_urgent: false,
                    preferred_contact_method: "email",
                  });
                }}
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Hero header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(700px 300px at 10% 0%, rgba(139,92,246,0.4), transparent), radial-gradient(500px 300px at 90% 0%, rgba(236,72,153,0.4), transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">We'd love to hear from you. Reach out with questions or book a visit to see us in person.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-nursery-purple mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Hillcrest Rising Stars
                    </h3>
                    <p className="text-gray-600">
                      Clockhouse Community Association
                      <br />
                      Hillcrest Hall, Fyshton Avenue
                      <br />
                      Coulsdon, Surrey
                      <br />
                      CR5 2PT
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-nursery-purple mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Rainbow Stars Nursery
                    </h3>
                    <p className="text-gray-600">
                      1A Headcorn Road
                      <br />
                      Thornton Heath
                      <br />
                      Croydon, Surrey
                      <br />
                      CR7 6RJ
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-nursery-purple flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">07340 960829</p>
                    <p className="text-gray-600">
                      020 3827 6414 / 07368 429760
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-nursery-purple flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">
                      hillcrest.risingstarsnursery@outlook.com
                    </p>
                    <p className="text-gray-600">
                      rainbowstarsnursery@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-nursery-purple mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Opening Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 7:30am - 6:30pm
                      <br />
                      Open 50 weeks a year
                      <br />
                      Closed: Bank holidays, Christmas week & New Year
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form + Quick Booking */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Visit Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hillcrest">Hillcrest Rising Stars</SelectItem>
                        <SelectItem value="rainbow_stars">Rainbow Stars Croydon</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Calendar */}
                    <div className="rounded-xl border bg-white/70 backdrop-blur p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Button type="button" variant="outline" size="sm" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth()-1, 1))}>Prev</Button>
                        <div className="font-semibold">
                          {calendarMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth()+1, 1))}>Next</Button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs text-gray-600 mb-1">
                        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d)=> (
                          <div key={d} className="text-center py-1">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: getFirstDayOfMonth(calendarMonth.getFullYear(), calendarMonth.getMonth()) }).map((_,i)=> (
                          <div key={`pad-${i}`} className="h-8" />
                        ))}
                        {Array.from({ length: getDaysInMonth(calendarMonth.getFullYear(), calendarMonth.getMonth()) }).map((_,i)=> {
                          const day = i + 1;
                          const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                          const isSelected = selectedDate === dateStr;
                          return (
                            <button
                              type="button"
                              key={day}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`h-8 rounded-md text-sm flex items-center justify-center border ${isSelected ? "bg-nursery-purple text-white border-nursery-purple" : "bg-white hover:bg-gray-50"}`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Time</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {times.map((t)=> (
                        <button key={t} type="button" onClick={()=> setSelectedTime(t)} className={`px-3 py-2 rounded-md border text-sm ${selectedTime===t? "bg-nursery-purple text-white border-nursery-purple" : "bg-white hover:bg-gray-50"}`}>{t}</button>
                      ))}
                    </div>
                    <Button asChild disabled={!selectedDate || !selectedTime} className="w-full bg-nursery-purple hover:bg-nursery-purple/90">
                      <a href={`/book-visit?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&location=${encodeURIComponent(location)}`}>Continue to Booking</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => updateField("subject", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admissions">
                          Admissions Inquiry
                        </SelectItem>
                        <SelectItem value="visit">Schedule a Visit</SelectItem>
                        <SelectItem value="fees">Fees & Funding</SelectItem>
                        <SelectItem value="policies">
                          Policies & Procedures
                        </SelectItem>
                        <SelectItem value="general">
                          General Question
                        </SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred_contact">
                      Preferred Contact Method
                    </Label>
                    <Select
                      value={formData.preferred_contact_method}
                      onValueChange={(value) =>
                        updateField("preferred_contact_method", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="either">Either</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={formData.is_urgent}
                      onCheckedChange={(checked) =>
                        updateField("is_urgent", checked)
                      }
                    />
                    <Label htmlFor="urgent" className="text-sm">
                      This is urgent (we'll respond within 24 hours)
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-nursery-purple hover:bg-nursery-purple/90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
