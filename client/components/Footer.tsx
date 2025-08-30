import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl shadow-sm bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400" />
              <span className="font-semibold">Rainbow Childcare</span>
            </div>
            <p className="text-sm text-white/70">
              Nurturing young minds with love, care, and education since 2010.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/day-nursery" className="hover:underline">Day Nursery</Link></li>
              <li><Link to="/pre-nursery" className="hover:underline">Pre-Nursery</Link></li>
              <li><Link to="/afterschool" className="hover:underline">Afterschool Care</Link></li>
              <li>Summer Programs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>123 Rainbow Street, City</li>
              <li>(555) 123-4567</li>
              <li><a href="mailto:info@rainbowchildcare.com" className="hover:underline">info@rainbowchildcare.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Hours</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Mon–Fri: 7:00 AM - 6:00 PM</li>
              <li>Sat: 8:00 AM - 4:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/60">
          © 2024 Rainbow Childcare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
