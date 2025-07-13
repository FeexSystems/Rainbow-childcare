import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Heart,
  Star,
  Check,
  DollarSign,
  Calendar,
  Users,
  Utensils,
  BookOpen,
  Shield,
  Phone,
  Mail,
  Gift,
} from "lucide-react";

const fundingOptions = [
  {
    title: "15 Hours Free Funding",
    subtitle: "For 3 & 4 Year Olds",
    description:
      "Government funded early years education for all 3 and 4 year olds",
    icon: Gift,
    color: "from-green-500 to-green-600",
    features: [
      "15 hours per week",
      "38 weeks per year",
      "Term time only",
      "Educational activities included",
    ],
  },
  {
    title: "30 Hours Free Funding",
    subtitle: "For Working Parents",
    description: "Extended free childcare for eligible working families",
    icon: Clock,
    color: "from-blue-500 to-blue-600",
    features: [
      "30 hours per week",
      "For working parents",
      "Subject to eligibility",
      "Can be split across settings",
    ],
  },
  {
    title: "2 Year Old Funding",
    subtitle: "For Eligible Families",
    description: "Free early education for 2 year olds from eligible families",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    features: [
      "15 hours per week",
      "Means tested",
      "Support for development",
      "Early intervention",
    ],
  },
];

const feeStructure = [
  {
    ageGroup: "Babies (6 weeks - 18 months)",
    dailyRate: "£55",
    hourlyRate: "£7.50",
    features: [
      "1:3 staff to child ratio",
      "Individual care plans",
      "All meals & milk included",
      "Nappy changing included",
      "Sleep routines maintained",
    ],
    color: "from-pink-500 to-pink-600",
  },
  {
    ageGroup: "Toddlers (18 months - 2 years)",
    dailyRate: "£48",
    hourlyRate: "£6.50",
    features: [
      "1:3 staff to child ratio",
      "Structured activities",
      "All meals included",
      "Potty training support",
      "Language development focus",
    ],
    color: "from-orange-500 to-orange-600",
  },
  {
    ageGroup: "Pre-School (2 - 3 years)",
    dailyRate: "£45",
    hourlyRate: "£6.00",
    features: [
      "1:4 staff to child ratio",
      "School readiness activities",
      "Free funding available",
      "Educational curriculum",
      "Social skills development",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    ageGroup: "Pre-School (3 - 5 years)",
    dailyRate: "£42",
    hourlyRate: "£5.50",
    features: [
      "1:8 staff to child ratio",
      "15/30 hours free funding",
      "Reception preparation",
      "Advanced learning activities",
      "Independence building",
    ],
    color: "from-purple-500 to-purple-600",
  },
];

const additionalServices = [
  {
    service: "Before School Care",
    time: "7:30 AM - 8:45 AM",
    price: "£8 per session",
    description: "Including breakfast and school transport",
  },
  {
    service: "After School Care",
    time: "3:15 PM - 6:00 PM",
    price: "£15 per session",
    description: "Including snack and homework support",
  },
  {
    service: "Holiday Care",
    time: "7:30 AM - 6:00 PM",
    price: "£45 per day",
    description: "Full day care during school holidays",
  },
  {
    service: "Late Collection",
    time: "After 6:00 PM",
    price: "£1 per minute",
    description: "Emergency late collection service",
  },
];

const whatsIncluded = [
  "All nutritious meals and snacks",
  "Educational activities and resources",
  "Outdoor play and garden time",
  "Regular development assessments",
  "Daily diary and photo updates",
  "Specialist sessions (music, PE)",
  "Nappies and wipes (babies/toddlers)",
  "Bedding and comfort items",
];

export default function Fees() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-nursery-purple/10 to-nursery-pink/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <DollarSign className="h-12 w-12 text-nursery-purple mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              Fees & Funding
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transparent, competitive pricing with comprehensive care packages.
            We accept government funding and offer flexible payment options to
            support all families.
          </p>
          <div className="glass-card inline-block">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-nursery-purple mb-2">
                💫 FREE Early Years Funding Available
              </h3>
              <p className="text-gray-600">
                15 & 30 hours free entitlement for 2, 3 & 4 year olds
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Government Funding Options */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Government Funding Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're proud to offer government-funded places to make quality
              early years education accessible to all families in our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {fundingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-card group hover:scale-105 transition-all duration-300"
                >
                  <div className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-nursery-purple font-medium mb-4">
                      {option.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Fee Structure by Age Group
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our fees are competitive and include everything your child needs
              for a full day of care, learning, and development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feeStructure.map((fee, index) => (
              <motion.div
                key={fee.ageGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card group hover:scale-105 transition-all duration-300"
              >
                <div className="p-6">
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${fee.color} rounded-t-lg mb-6`}
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {fee.ageGroup}
                  </h3>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-nursery-purple mb-1">
                      {fee.dailyRate}
                    </div>
                    <div className="text-sm text-gray-600">per day</div>
                    <div className="text-lg font-semibold text-gray-700 mt-2">
                      {fee.hourlyRate}/hour
                    </div>
                  </div>
                  <div className="space-y-2">
                    {fee.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start text-xs text-gray-600"
                      >
                        <Check className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Extended care options to fit around your family's schedule and
              needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card"
              >
                <div className="p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {service.service}
                    </h3>
                    <p className="text-nursery-purple font-medium mb-2">
                      {service.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-nursery-purple">
                      {service.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
              What's Included in Your Fees
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our all-inclusive fees mean no hidden costs or surprise extras -
              everything your child needs is included.
            </p>
          </motion.div>

          <div className="glass-card">
            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whatsIncluded.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information & Contact */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              Ready to Apply?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card">
                <div className="p-8 text-center">
                  <Users className="h-12 w-12 text-nursery-purple mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Payment Options
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>• Monthly invoicing</p>
                    <p>• Childcare vouchers accepted</p>
                    <p>• Tax-Free Childcare eligible</p>
                    <p>• Flexible payment plans available</p>
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <div className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-nursery-purple mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Registration
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>• £50 registration fee</p>
                    <p>• One week's deposit required</p>
                    <p>• 4 weeks notice for leaving</p>
                    <p>• Visit before enrolling</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
              <Button
                size="sm"
                className="bg-gradient-to-r from-nursery-purple to-nursery-pink hover:scale-105 transform transition-all duration-300 text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none max-w-[140px] sm:max-w-none"
                asChild
              >
                <a href="/apply">Apply for a Place</a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-nursery-purple text-nursery-purple hover:bg-nursery-purple hover:text-white transition-all duration-300 text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none max-w-[150px] sm:max-w-none"
                asChild
              >
                <a href="/contact">Discuss Funding</a>
              </Button>
            </div>

            <div className="glass-card">
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-4">
                  Have questions about fees or funding eligibility?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-nursery-purple" />
                    <span>Call us: 07940 960829</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-nursery-purple" />
                    <span>Email: info@hillcrestrisingstars.com</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
