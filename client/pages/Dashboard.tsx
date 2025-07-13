import { useEffect, useState } from "react";
import { InteractiveDashboard } from "@/components/InteractiveDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const [creatingProfile, setCreatingProfile] = useState(false);

  // If still loading auth, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-nursery-purple" />
          <h2 className="text-xl font-medium text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access your dashboard
          </h2>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  // If user exists but no profile, check if it's demo mode or try to create profile
  if (user && !profile && !creatingProfile) {
    const isDemo = localStorage.getItem("is_demo");

    if (isDemo) {
      // For demo mode, create a basic profile object
      const demoProfile = {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || "Demo User",
        role: user.user_metadata?.role || "parent",
        phone: null,
        avatar_url: null,
        emergency_contact_name: null,
        emergency_contact_phone: null,
        address: null,
        date_of_birth: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return <InteractiveDashboard userRole={demoProfile.role as any} />;
    }

    const createProfile = async () => {
      setCreatingProfile(true);
      try {
        const { error } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || "New User",
          role: user.user_metadata?.role || "parent",
          phone: user.user_metadata?.phone || null,
        });

        if (error) {
          console.error("Error creating profile:", error);
        }

        // Refresh the page to trigger profile fetch
        window.location.reload();
      } catch (error) {
        console.error("Error creating profile:", error);
        setCreatingProfile(false);
      }
    };

    createProfile();

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-nursery-purple" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Setting up your account...
          </h2>
          <p className="text-gray-600">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  // If still creating profile, show loading
  if (creatingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-nursery-purple" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Setting up your account...
          </h2>
          <p className="text-gray-600">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  // If we have both user and profile, show dashboard
  if (user && profile) {
    return <InteractiveDashboard userRole={profile.role as any} />;
  }

  // Fallback - should not reach here normally
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to load dashboard
        </h2>
        <p className="text-gray-600 mb-4">
          There was an issue loading your account. Please try refreshing the
          page.
        </p>
        <div className="space-x-4">
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          <Button variant="outline" asChild>
            <a href="/login">Back to Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
