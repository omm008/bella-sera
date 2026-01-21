import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-sera-charcoal text-sera-cream pt-20 pb-10 overflow-hidden">
      {/* --- Texture Overlay (Subtle grunge/noise effect) --- */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* === TOP SECTION: GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* COL 1: BRAND SOUL (Spans 5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              {/* Big Logo */}
              <h2 className="font-logo text-5xl md:text-7xl mb-6 tracking-tighter">
                Bella Sera
              </h2>
              {/* Short Note */}
              <p className="font-serif text-lg md:text-xl italic leading-relaxed text-sera-stone/80 max-w-md">
                "Where the warmth of an Italian evening meets the soul of Asian
                craft. A culinary dialogue, written daily in Jabalpur."
              </p>
            </div>
          </div>

          {/* COL 2: QUICK LINKS (Spans 3 cols) */}
          <div className="md:col-span-3 md:pl-8">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sera-stone mb-6">
              Explore
            </h3>
            <ul className="space-y-4 font-serif text-lg">
              <FooterLink to="/menu" label="Our Menu" />
              <FooterLink to="/reserve" label="Book a Table" />
              <FooterLink to="/story" label="The Story" />
              {/* Dummy link for completeness */}
              <FooterLink to="#" label="Private Events" />
            </ul>
          </div>

          {/* COL 3: ADDRESS & INFO (Spans 4 cols) */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sera-stone mb-6">
              Find Us
            </h3>
            <div className="space-y-6 font-sans text-sm text-sera-cream/90">
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="text-sera-red shrink-0 mt-1" />
                <p className="leading-relaxed">
                  123 Wright Town, Near Russel Chowk,
                  <br />
                  Jabalpur, MP 482001
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <Clock size={20} className="text-sera-red shrink-0" />
                <p>Mon-Sun: 11:00 AM - 11:00 PM</p>
              </div>

              <div className="flex gap-4 items-center">
                <Phone size={20} className="text-sera-red shrink-0" />
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        {/* === MIDDLE SECTION: NEWSLETTER BAR === */}
        <div className="bg-sera-cream/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-sera-red/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-serif text-2xl md:text-3xl mb-2">
              Join the Table
            </h3>
            <p className="font-sans text-sm text-sera-stone">
              Secret menu items and stories, delivered monthly.
            </p>
          </div>

          <form className="relative z-10 flex w-full md:w-auto max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border-b border-sera-stone/30 text-sera-cream placeholder:text-sera-stone/50 py-3 px-2 w-full focus:outline-none focus:border-sera-red transition-colors font-sans"
            />
            <button
              type="submit"
              className="group flex items-center gap-2 bg-sera-red hover:bg-red-700 transition-colors text-white px-6 py-3 ml-4 rounded-full font-thin uppercase tracking-widest text-xs"
            >
              <span>Sign Up</span>
            </button>
          </form>
        </div>

        {/* === BOTTOM SECTION: COPYRIGHT & SOCIALS === */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-sans text-xs text-sera-stone uppercase tracking-widest gap-6">
          <p>
            © {new Date().getFullYear()} Bella Sera Jabalpur. All rights
            reserved.
          </p>

          <div className="flex gap-6 items-center">
            <a
              href="https://www.instagram.com/bellasera_jbp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sera-red transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sera-red transition-colors">
              <Facebook size={20} />
            </a>
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for the fancy link hover effect
const FooterLink = ({ to, label }) => (
  <li>
    <Link to={to} className="group relative inline-block overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full relative z-10">
        {label}
      </span>
      <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-sera-red z-10 font-bold">
        {label}
      </span>
      {/* Subtle underline */}
      <span className="absolute bottom-0 left-0 w-full h-px bg-sera-red/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
);

export default Footer;
