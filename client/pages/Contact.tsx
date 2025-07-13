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
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for admissions, questions, or to schedule a
            visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
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

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nursery">Which Nursery?</Label>
                    <select
                      id="nursery"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select a nursery</option>
                      <option value="hillcrest">Hillcrest Rising Stars</option>
                      <option value="rainbow">
                        Rainbow Stars Day Nursery Croydon
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                    />
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
      </div>
    </div>
  );
}
