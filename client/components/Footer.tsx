import { Button } from "./ui/button";

const StarLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
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
);

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export function Footer() {
  const partnerLogos = [
    { name: "Forest School", src: "/api/placeholder/80/40" },
    { name: "Early Years", src: "/api/placeholder/80/40" },
    { name: "Childcare Choices", src: "/api/placeholder/80/40" },
    { name: "NDNA", src: "/api/placeholder/80/40" },
  ];

  return (
    <footer className="bg-white">
      {/* Partner Logos Section */}
      <div className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 md:space-x-16">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="gradient-footer text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hillcrest Rising Stars */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <StarLogo />
                <h3 className="text-xl font-bold">Hillcrest Rising Stars</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>Clockhouse Community Association</p>
                <p>Hillcrest Hall, Fyshton Avenue</p>
                <p>Coulsdon, Surrey</p>
                <p>CR5 2PT</p>
                <p className="pt-2">
                  <a
                    href="mailto:hillcrest.risingstarsnursery@outlook.com"
                    className="hover:underline"
                  >
                    hillcrest.risingstarsnursery@outlook.com
                  </a>
                </p>
                <p>07340 960829</p>
                <p>Ofsted Unique Reference No. EY558506</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <GoogleIcon />
                </Button>
              </div>
            </div>

            {/* Rainbow Stars Nursery */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Rainbow Stars Nursery</h3>
              <div className="space-y-2 text-sm">
                <p>1A Headcorn Road,</p>
                <p>Thornton Heath,</p>
                <p>Croydon, Surrey</p>
                <p>CR7 6RJ</p>
                <p className="pt-2">
                  <a
                    href="mailto:rainbowstarsnursery@gmail.com"
                    className="hover:underline"
                  >
                    rainbowstarsnursery@gmail.com
                  </a>
                </p>
                <p>020 3827 6414 / 07368 429760</p>
                <p>Ofsted Unique Reference No. EY268429</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <GoogleIcon />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <div className="space-y-2 text-sm opacity-90">
              <p>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="/powered-by" className="hover:underline">
                  Powered by Parentis
                </a>
              </p>
              <p>
                © 2025 Hillcrest Rising Stars Nursery. All content on this
                website (including images) are owned by us and our licensors. Do
                not attempt to copy without our consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
