import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { NotificationSystem } from "./NotificationSystem";

const StarLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="relative">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M20 2L25.5 13.5L38 15L29 23.5L31.5 36L20 30L8.5 36L11 23.5L2 15L14.5 13.5L20 2Z"
          fill="url(#starGradient)"
          stroke="#FFF"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="25%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F72C5B" />
            <stop offset="75%" stopColor="#4E44CE" />
            <stop offset="100%" stopColor="#2CD5C4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "OUR NURSERIES", path: "/nurseries" },
    { name: "CONTACT", path: "/contact" },
    { name: "APPLY FOR A PLACE", path: "/apply" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <StarLogo />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-nursery-purple",
                  location.pathname === item.path
                    ? "text-nursery-purple border-b-2 border-nursery-purple pb-1"
                    : "text-gray-700",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button
              asChild
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-nursery-purple",
                  location.pathname === item.path
                    ? "text-nursery-purple"
                    : "text-gray-700",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
