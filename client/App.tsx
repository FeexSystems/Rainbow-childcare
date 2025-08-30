import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Forum from "./pages/Forum";
import Nurseries from "./pages/Nurseries";
import Fees from "./pages/Fees";
import Policies from "./pages/Policies";
import Login from "./pages/Login";
import QRPickup from "./pages/QRPickup";
import Messageboard from "./pages/Messageboard";
import Settings from "./pages/Settings";
import Features from "./pages/Features";
import HillCrestNursery from "./pages/HillCrestNursery";
import RainbowStarsNursery from "./pages/RainbowStarsNursery";
import DayNursery from "./pages/DayNursery";
import Afterschool from "./pages/Afterschool";
import PreNursery from "./pages/PreNursery";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/nurseries" element={<Nurseries />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/fees" element={<Fees />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/qr-pickup" element={<QRPickup />} />
                <Route path="/messageboard" element={<Messageboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/features" element={<Features />} />
                <Route path="/day-nursery" element={<DayNursery />} />
                <Route path="/afterschool" element={<Afterschool />} />
                <Route path="/pre-nursery" element={<PreNursery />} />
                <Route
                  path="/nurseries/hillcrest"
                  element={<HillCrestNursery />}
                />
                <Route
                  path="/nurseries/rainbow-stars"
                  element={<RainbowStarsNursery />}
                />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route
                  path="/auth/reset-password"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <PWAInstallPrompt />
            <ElevenLabsWidget />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
