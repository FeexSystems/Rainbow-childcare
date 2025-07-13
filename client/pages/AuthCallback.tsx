import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }

        if (data.session) {
          setStatus("success");
          setMessage(
            "Email verified successfully! Redirecting to dashboard...",
          );

          // Redirect after a short delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          setStatus("error");
          setMessage("No session found. Please try signing in again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred.");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-md w-full text-center"
      >
        <div className="p-8">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-6 text-nursery-purple animate-spin" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Verifying Email
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Email Verified!
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Redirecting...</span>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-nursery-purple to-nursery-pink"
                >
                  Back to Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Go Home
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
