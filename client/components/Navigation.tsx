import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Home, Building2, School, CalendarDays, Menu, X } from "lucide-react";

const RainbowLogo = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-xl shadow-sm bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400" />
    <span className="hidden sm:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
      Rainbow Childcare
    </span>
  </div>
);

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Day Nursery", path: "/day-nursery", icon: Building2 },
  { name: "Afterschool", path: "/afterschool", icon: School },
  { name: "Pre-Nursery", path: "/pre-nursery", icon: CalendarDays },
];

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-navbar sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <RainbowLogo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className={cn(
                  "flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors",
                  location.pathname === path && "text-gray-900"
                )}
              >
                <Icon className="h-4 w-4 text-gray-500" />
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-2 pt-2">
            <div className="flex flex-col py-2">
              {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-3 text-sm text-gray-700 hover:text-gray-900",
                    location.pathname === path && "text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
