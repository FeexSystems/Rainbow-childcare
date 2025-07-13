import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FileText,
  AlertTriangle,
  Users,
  Info,
  Shield,
  Lock,
  FileCheck,
  UserCheck,
  Megaphone,
  Download,
} from "lucide-react";

const policies = [
  {
    title: "British Values",
    description:
      "Our commitment to promoting fundamental British values including democracy, rule of law, individual liberty, and mutual respect.",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    downloadUrl: "/policies/british-values.pdf",
  },
  {
    title: "Complaints",
    description:
      "Guidelines for raising concerns and our process for handling complaints fairly and transparently.",
    icon: AlertTriangle,
    color: "from-orange-500 to-orange-600",
    downloadUrl: "/policies/complaints.pdf",
  },
  {
    title: "Diversity",
    description:
      "Our dedication to celebrating diversity and ensuring an inclusive environment for all children and families.",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    downloadUrl: "/policies/diversity.pdf",
  },
  {
    title: "Information",
    description:
      "How we manage and share information about your child's development and our nursery operations.",
    icon: Info,
    color: "from-cyan-500 to-cyan-600",
    downloadUrl: "/policies/information.pdf",
  },
  {
    title: "Data Protection",
    description:
      "Our commitment to protecting your personal data in accordance with GDPR and data protection laws.",
    icon: Lock,
    color: "from-green-500 to-green-600",
    downloadUrl: "/policies/data-protection.pdf",
  },
  {
    title: "Safeguarding",
    description:
      "Our comprehensive approach to keeping children safe and our procedures for protecting their welfare.",
    icon: Shield,
    color: "from-red-500 to-red-600",
    downloadUrl: "/policies/safeguarding.pdf",
  },
  {
    title: "Privacy Notice",
    description:
      "How we collect, use, and protect your personal information and your rights regarding your data.",
    icon: FileCheck,
    color: "from-indigo-500 to-indigo-600",
    downloadUrl: "/policies/privacy-notice.pdf",
  },
  {
    title: "Positive Behaviour",
    description:
      "Our approach to supporting children's emotional development and managing behaviour positively.",
    icon: UserCheck,
    color: "from-teal-500 to-teal-600",
    downloadUrl: "/policies/positive-behaviour.pdf",
  },
  {
    title: "Whistleblowing Policy",
    description:
      "Guidelines for staff and stakeholders to raise serious concerns about wrongdoing or malpractice.",
    icon: Megaphone,
    color: "from-pink-500 to-pink-600",
    downloadUrl: "/policies/whistleblowing.pdf",
  },
];

const handleDownload = (policy: (typeof policies)[0]) => {
  // In a real implementation, this would download the actual PDF
  // For demo purposes, we'll simulate the download
  const link = document.createElement("a");
  link.href = "#";
  link.download = `${policy.title.toLowerCase().replace(/\s+/g, "-")}.pdf`;

  // Create a mock PDF blob for demo
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

5 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${policy.title} Policy Document) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
492
%%EOF`;

  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  link.href = url;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export default function Policies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-nursery-purple/10 to-nursery-pink/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent mb-6">
            Policies
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our policies help us to make sure that the service provided by our
            setting is a high quality one and that being a member of this
            setting is an enjoyable and beneficial experience for each child and
            his/his parents.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our staff and parents work together to review and update our
            policies annually and they will always be happy to take part in the
            annual review of the policies. This review helps us to make sure
            that the policies are enabling our setting to provide a quality
            service for its members and the local community.
          </p>
        </motion.div>
      </section>

      {/* Policies Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card group hover:scale-105 transition-all duration-300"
                >
                  <div className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${policy.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-nursery-purple transition-colors">
                      {policy.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {policy.description}
                    </p>

                    {/* Download Button */}
                    <Button
                      onClick={() => handleDownload(policy)}
                      className="w-full bg-gradient-to-r from-nursery-purple to-nursery-pink hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-nursery-purple to-nursery-pink bg-clip-text text-transparent">
              Need More Information?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our staff can explain our policies and procedures to you. Copies
              of which are available in the setting. If you have any questions
              about our policies or would like to discuss any aspect of our
              service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
              <Button
                size="sm"
                className="bg-gradient-to-r from-nursery-purple to-nursery-pink hover:scale-105 transform transition-all duration-300 text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none max-w-[120px] sm:max-w-none"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-nursery-purple text-nursery-purple hover:bg-nursery-purple hover:text-white transition-all duration-300 text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none max-w-[140px] sm:max-w-none"
                asChild
              >
                <a href="/apply">Apply for a Place</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Organizations Logos */}
      <section className="py-12 px-4 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">
              Accredited & Supported By
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
              {/* Mock partner logos - in real implementation these would be actual organization logos */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-xs text-center font-medium text-blue-700">
                  OFSTED
                </div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div className="text-xs text-center font-medium text-green-700">
                  Early Years
                </div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <div className="text-xs text-center font-medium text-purple-700">
                  NDNA
                </div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="text-xs text-center font-medium text-orange-700">
                  Council
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
