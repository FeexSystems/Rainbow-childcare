import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Save,
  FileText,
  Loader2,
} from "lucide-react";
import { submitApplication } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FormData {
  // Step 1: Child Information
  childName: string;
  childDOB: string;
  childAddress: string;
  allergies: string;
  medicalConditions: string;

  // Step 2: Parent/Guardian Information
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentOccupation: string;
  emergencyContact: string;
  emergencyPhone: string;

  // Step 3: Nursery Preferences
  preferredNursery: string;
  startDate: string;
  sessionType: string;
  additionalRequests: string;

  // Step 4: Documents
  documents: string[];
  agreedToTerms: boolean;
}

const STORAGE_KEY = "nursery_application_draft";

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    childDOB: "",
    childAddress: "",
    allergies: "",
    medicalConditions: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentOccupation: "",
    emergencyContact: "",
    emergencyPhone: "",
    preferredNursery: "",
    startDate: "",
    sessionType: "",
    additionalRequests: "",
    documents: [],
    agreedToTerms: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData);
        setCurrentStep(parsed.currentStep);
      } catch (error) {
        console.error("Failed to load saved application:", error);
      }
    }
  }, []);

  // Save data to localStorage
  const saveProgress = () => {
    const dataToSave = {
      formData,
      currentStep,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  // Update form data
  const updateFormData = (field: keyof FormData, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Auto-save
    const dataToSave = {
      formData: newFormData,
      currentStep,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      saveProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      saveProgress();
    }
  };

  const submitApplicationForm = async () => {
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Required",
        description:
          "Please agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Map form data to application schema
      const applicationData = {
        parent_email: formData.parentEmail,
        parent_name: formData.parentName,
        parent_phone: formData.parentPhone,
        child_name: formData.childName,
        child_dob: formData.childDOB,
        preferred_nursery:
          formData.preferredNursery === "hillcrest"
            ? ("hillcrest" as const)
            : ("rainbow_stars" as const),
        preferred_start_date: formData.startDate || null,
        days_required: [], // You might want to add this to the form
        hours_required: formData.sessionType,
        additional_info: `
Child Address: ${formData.childAddress}
Allergies: ${formData.allergies}
Medical Conditions: ${formData.medicalConditions}
Parent Occupation: ${formData.parentOccupation}
Emergency Contact: ${formData.emergencyContact} (${formData.emergencyPhone})
Additional Requests: ${formData.additionalRequests}
Documents: ${formData.documents.join(", ")}
        `.trim(),
      };

      const { data, error } = await submitApplication(applicationData);

      if (error) {
        toast({
          title: "Submission Failed",
          description:
            error.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);

      toast({
        title: "Application Submitted!",
        description:
          "Thank you! We'll review your application and be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const stepItems = [
    { title: "Child Information", completed: currentStep > 1 },
    { title: "Parent/Guardian Details", completed: currentStep > 2 },
    { title: "Nursery Preferences", completed: currentStep > 3 },
    { title: "Documents & Confirmation", completed: currentStep > 4 },
  ];

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apply for a Place
          </h1>
          <p className="text-xl text-gray-600">
            Join our nursery family - complete your application in simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <Badge variant="secondary">
              <Save className="w-3 h-3 mr-1" />
              Auto-saved
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {stepItems.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : currentStep === index + 1 ? (
                  <div className="w-8 h-8 bg-nursery-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                ) : (
                  <Circle className="w-8 h-8 text-gray-300" />
                )}
                <span className="text-xs text-center mt-2 max-w-20">
                  {step.title}
                </span>
              </div>
              {index < stepItems.length - 1 && (
                <div className="w-12 h-px bg-gray-300 mx-2 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{stepItems[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Full Name *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) =>
                        updateFormData("childName", e.target.value)
                      }
                      placeholder="Enter child's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childDOB">Date of Birth *</Label>
                    <Input
                      id="childDOB"
                      type="date"
                      value={formData.childDOB}
                      onChange={(e) =>
                        updateFormData("childDOB", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childAddress">Home Address *</Label>
                  <Textarea
                    id="childAddress"
                    value={formData.childAddress}
                    onChange={(e) =>
                      updateFormData("childAddress", e.target.value)
                    }
                    placeholder="Enter full home address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      updateFormData("allergies", e.target.value)
                    }
                    placeholder="List any known allergies or dietary restrictions"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      updateFormData("medicalConditions", e.target.value)
                    }
                    placeholder="List any medical conditions we should be aware of"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) =>
                        updateFormData("parentName", e.target.value)
                      }
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        updateFormData("parentEmail", e.target.value)
                      }
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        updateFormData("parentPhone", e.target.value)
                      }
                      placeholder="Mobile number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentOccupation">Occupation</Label>
                    <Input
                      id="parentOccupation"
                      value={formData.parentOccupation}
                      onChange={(e) =>
                        updateFormData("parentOccupation", e.target.value)
                      }
                      placeholder="Your occupation"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">
                      Emergency Contact Name *
                    </Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        updateFormData("emergencyContact", e.target.value)
                      }
                      placeholder="Emergency contact"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">
                      Emergency Contact Phone *
                    </Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) =>
                        updateFormData("emergencyPhone", e.target.value)
                      }
                      placeholder="Emergency phone"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredNursery">Preferred Nursery *</Label>
                  <select
                    id="preferredNursery"
                    value={formData.preferredNursery}
                    onChange={(e) =>
                      updateFormData("preferredNursery", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a nursery</option>
                    <option value="hillcrest">Hillcrest Rising Stars</option>
                    <option value="rainbow">
                      Rainbow Stars Day Nursery Croydon
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Preferred Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        updateFormData("startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionType">Session Type *</Label>
                    <select
                      id="sessionType"
                      value={formData.sessionType}
                      onChange={(e) =>
                        updateFormData("sessionType", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select session type</option>
                      <option value="full-day">
                        Full Day (7:30am - 6:30pm)
                      </option>
                      <option value="morning">Morning Session</option>
                      <option value="afternoon">Afternoon Session</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalRequests">
                    Additional Requests or Information
                  </Label>
                  <Textarea
                    id="additionalRequests"
                    value={formData.additionalRequests}
                    onChange={(e) =>
                      updateFormData("additionalRequests", e.target.value)
                    }
                    placeholder="Any additional information or special requirements"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Required Documents
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Please prepare the following documents (you can upload them
                    after submission):
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Child's birth certificate</li>
                    <li>• Proof of address</li>
                    <li>• Medical records/vaccination history</li>
                    <li>• Two passport-sized photos</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) =>
                        updateFormData("agreedToTerms", checked)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and privacy policy *
                    </Label>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Application Summary
                  </h3>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>
                      <strong>Child:</strong> {formData.childName}
                    </p>
                    <p>
                      <strong>Parent:</strong> {formData.parentName}
                    </p>
                    <p>
                      <strong>Nursery:</strong> {formData.preferredNursery}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {formData.startDate}
                    </p>
                    <p>
                      <strong>Session:</strong> {formData.sessionType}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <Button onClick={saveProgress} variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={submitApplicationForm}
                  disabled={!formData.agreedToTerms || submitting}
                  className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-nursery-purple hover:bg-nursery-purple/90 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
