import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Users, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitVisitBooking } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function Booking() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    location: "hillcrest",
    date: "",
    time_slot: "",
    attendees: 1,
    child_age_group: "pre-nursery",
    name: "",
    email: "",
    phone: "",
    notes: "",
    consent_contact: false,
  });

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  const update = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time_slot) {
      toast({ title: "Missing Information", description: "Please complete all required fields.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await submitVisitBooking({
        location: form.location as "hillcrest" | "rainbow_stars",
        visit_date: form.date,
        time_slot: form.time_slot,
        attendees: form.attendees,
        child_age_group: form.child_age_group,
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes || null,
        consent_contact: form.consent_contact,
      });
      if (error) {
        toast({ title: "Booking Failed", description: error.message || "Unable to book a visit right now.", variant: "destructive" });
        return;
      }
      setSubmitted(true);
      toast({ title: "Visit Booked!", description: "We've received your request and will confirm shortly." });
    } catch (err) {
      console.error(err);
      toast({ title: "Unexpected Error", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card max-w-2xl w-full text-center">
          <div className="p-12">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Request Sent</h1>
            <p className="text-xl text-gray-600 mb-8">Thank you for your interest. We'll confirm your visit time by email.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => (window.location.href = "/")} className="bg-gradient-to-r from-nursery-purple to-nursery-pink">Back to Home</Button>
              <Button variant="outline" onClick={() => (window.location.href = "/contact")}>Contact Us</Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book a Visit</h1>
          <p className="text-lg text-gray-600">Come see our facilities and meet the team. Choose your preferred location and time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Visit Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Select value={form.location} onValueChange={(v) => update("location", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hillcrest">Hillcrest Rising Stars</SelectItem>
                          <SelectItem value="rainbow_stars">Rainbow Stars Croydon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Child Age Group *</Label>
                      <Select value={form.child_age_group} onValueChange={(v) => update("child_age_group", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-nursery">Pre-Nursery (2–3)</SelectItem>
                          <SelectItem value="day-nursery">Day Nursery (3–5)</SelectItem>
                          <SelectItem value="afterschool">Afterschool (5+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <div className="relative">
                        <Input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
                        <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Preferred Time *</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => update("time_slot", slot)}
                            className={`px-3 py-2 rounded-md border text-sm flex items-center justify-center gap-1 ${form.time_slot === slot ? "bg-nursery-purple text-white border-nursery-purple" : "bg-white hover:bg-gray-50"}`}
                          >
                            <Clock className="w-4 h-4" /> {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Attendees *</Label>
                      <Input type="number" min={1} max={6} value={form.attendees} onChange={(e) => update("attendees", Number(e.target.value))} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Notes</Label>
                      <Textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any specific questions or requirements" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Phone</Label>
                      <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="consent" checked={form.consent_contact} onCheckedChange={(v) => update("consent_contact", v)} />
                    <Label htmlFor="consent" className="text-sm">I consent to be contacted about my booking *</Label>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full bg-nursery-purple hover:bg-nursery-purple/90">
                    {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking...</>) : ("Book Visit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <p>• Guided tour of our rooms and facilities</p>
                <p>• Meet our friendly team and ask questions</p>
                <p>• Discuss availability, fees, and start dates</p>
                <p>• Typical visit length: 20–30 minutes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-nursery-purple" />
                  <div>
                    <div className="font-medium">Hillcrest Rising Stars</div>
                    <div>Clockhouse Community Association, Coulsdon, CR5 2PT</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-nursery-purple" />
                  <div>
                    <div className="font-medium">Rainbow Stars Croydon</div>
                    <div>1A Headcorn Road, Thornton Heath, CR7 6RJ</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 mt-0.5 text-nursery-purple" />
                  <div>
                    <div className="font-medium">Opening Hours</div>
                    <div>Mon–Fri: 7:30am – 6:30pm (Open 50 weeks)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
