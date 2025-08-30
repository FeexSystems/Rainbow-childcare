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
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(700px 300px at 10% 0%, rgba(139,92,246,0.4), transparent), radial-gradient(500px 300px at 90% 0%, rgba(236,72,153,0.4), transparent)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with questions or book a visit
            to see us in person.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="bg-nursery-purple hover:bg-nursery-purple/90"
            >
              <a href="/book-visit">Book a Visit</a>
            </Button>
          </div>
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
                      Rainbow Childcare
                    </h3>
                    <p className="text-gray-600">
                      123 Rainbow Street
                      <br />
                      City
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-nursery-purple flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-nursery-purple flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">info@rainbowchildcare.com</p>
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

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-8">
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
