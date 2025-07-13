import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { NotificationSystem } from "./NotificationSystem";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User, Settings, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nurseryItems = [
    {
      name: "HillCrest Rising Stars",
      path: "/nurseries/hillcrest",
      description: "Toddlers, Preschoolers",
    },
    {
      name: "Rainbow Stars Croydon",
      path: "/nurseries/rainbow-stars",
      description:
        "Baby Room, Toddler Room, Pre-School Room, Sensory Room, Dining Room",
    },
  ];

  const publicNavItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "OUR NURSERIES", path: "/nurseries", hasDropdown: true },
    { name: "POLICIES", path: "/policies" },
    { name: "FEES", path: "/fees" },
    { name: "CONTACT", path: "/contact" },
    { name: "APPLY FOR A PLACE", path: "/apply" },
  ];

  const authenticatedNavItems = [
    { name: "HOME", path: "/" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "FORUM", path: "/forum" },
    { name: "MESSAGE BOARD", path: "/messageboard" },
    ...(profile?.role === "admin" ? [{ name: "ADMIN", path: "/admin" }] : []),
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="glass-navbar sticky top-0 z-50 shadow-lg">
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
            {navItems.map((item) => {
              if (item.hasDropdown && item.name === "OUR NURSERIES") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-nursery-purple",
                        location.pathname.startsWith("/nurseries")
                          ? "text-nursery-purple border-b-2 border-nursery-purple pb-1"
                          : "text-gray-700",
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                      {nurseryItems.map((nursery) => (
                        <DropdownMenuItem key={nursery.name} asChild>
                          <Link
                            to={nursery.path}
                            className="flex flex-col items-start p-4 space-y-1"
                          >
                            <div className="font-medium text-nursery-purple">
                              {nursery.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {nursery.description}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/nurseries" className="p-4 font-medium">
                          View All Nurseries
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
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
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user && <NotificationSystem />}
            {user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={profile.avatar_url || ""}
                        alt={profile.full_name}
                      />
                      <AvatarFallback className="bg-nursery-purple text-white">
                        {profile.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profile.full_name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {profile.email}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {profile.role.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {profile.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-nursery-purple hover:bg-nursery-purple/90"
                >
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && profile && <NotificationSystem />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 mt-4">
            <div className="py-4 space-y-3">
              {navItems.map((item) => {
                if (item.hasDropdown && item.name === "OUR NURSERIES") {
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="text-sm font-medium text-gray-700 px-2">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-2">
                        {nurseryItems.map((nursery) => (
                          <Link
                            key={nursery.name}
                            to={nursery.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-2 text-sm text-gray-600 hover:text-nursery-purple transition-colors"
                          >
                            <div className="font-medium">{nursery.name}</div>
                            <div className="text-xs text-gray-500">
                              {nursery.description}
                            </div>
                          </Link>
                        ))}
                        <Link
                          to="/nurseries"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 px-2 text-sm font-medium text-nursery-purple hover:text-nursery-purple/80 transition-colors"
                        >
                          View All Nurseries
                        </Link>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block py-2 px-2 text-sm font-medium transition-colors hover:text-nursery-purple",
                      location.pathname === item.path
                        ? "text-nursery-purple bg-white/10 rounded"
                        : "text-gray-700",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-white/20 space-y-2">
                {user && profile ? (
                  <>
                    <div className="px-2 py-2 text-sm">
                      <div className="font-medium text-gray-700">
                        {profile.full_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {profile.email}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {profile.role.replace("_", " ")}
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-nursery-purple transition-colors"
                    >
                      Dashboard
                    </Link>
                    {profile.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-nursery-purple transition-colors"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-nursery-purple transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/apply"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 px-2 text-sm font-medium bg-nursery-purple text-white rounded hover:bg-nursery-purple/90 transition-colors"
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
