import { InteractiveDashboard } from "@/components/InteractiveDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, profile } = useAuth();

  if (!user || !profile) {
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

  return <InteractiveDashboard userRole={profile.role as any} />;
}
