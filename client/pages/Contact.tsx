import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
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
