import React, { useState, useEffect } from "react";
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  BookOpen,
} from "lucide-react"; // Updated Icons
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return isMobile ? (
    <MobileNav isScrolled={isScrolled} cartCount={cartCount} />
  ) : (
    <DesktopNav isScrolled={isScrolled} cartCount={cartCount} />
  );
};

/* =========================================
   MOBILE LAYOUT (Clean Pill + Full Dock)
   ========================================= */
const MobileNav = ({ isScrolled, cartCount }) => (
  <>
    {/* TOP PILL (Status & Logo Only - No Search) */}
    <motion.header
      className="fixed top-2 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="bg-black/80 backdrop-blur-md text-sera-cream rounded-full flex items-center justify-center shadow-2xl pointer-events-auto border border-white/10 overflow-hidden relative"
        animate={{
          width: isScrolled ? "140px" : "90%",
          height: isScrolled ? "36px" : "50px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Left: Status Dot (Fades out on scroll) */}
        {!isScrolled && (
          <div className="absolute left-5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest opacity-80 font-sans">
              Open
            </span>
          </div>
        )}

        {/* Center: The Logo */}
        <div className="z-10">
          <span className="font-logo text-lg tracking-wide whitespace-nowrap">
            {isScrolled ? "BS" : "Bella Sera"}
          </span>
        </div>

        {/* Removed Search Icon from Right Side */}
      </motion.div>
    </motion.header>

    {/* BOTTOM GLASS DOCK (5 Items: Home, Menu, Order, Reserve, Story) */}
    <nav className="fixed bottom-6 left-2 right-2 z-50">
      <div className="bg-sera-charcoal/95 backdrop-blur-xl text-sera-stone rounded-2xl px-4 py-4 shadow-2xl border border-white/10 flex justify-between items-end">
        <NavItem to="/" icon={<Home size={20} />} label="Home" />
        <NavItem to="/menu" icon={<UtensilsCrossed size={20} />} label="Menu" />

        {/* CENTER CTA: ORDER (With Badge) */}
        <div className="relative -top-3">
          <NavLink to="/order">
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center border-4 border-sera-charcoal transition-all ${cartCount > 0 ? "bg-sera-red text-white" : "bg-sera-stone text-sera-charcoal"}`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0 -right-0 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-sera-red font-bold border-2 border-sera-charcoal">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider font-sans text-center block mt-1 opacity-80">
              Order
            </span>
          </NavLink>
        </div>

        <NavItem to="/reserve" icon={<Calendar size={20} />} label="Reserve" />
        <NavItem to="/story" icon={<BookOpen size={20} />} label="Story" />
      </div>
    </nav>
  </>
);

/* =========================================
   DESKTOP LAYOUT (Unchanged)
   ========================================= */
const DesktopNav = ({ isScrolled, cartCount }) => (
  <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
    <motion.div
      className="bg-sera-cream/80 backdrop-blur-md border border-sera-stone/50 text-sera-charcoal rounded-full px-8 py-3 shadow-lg pointer-events-auto flex items-center gap-12"
      animate={{
        y: isScrolled ? -10 : 0,
        scale: isScrolled ? 0.95 : 1,
      }}
    >
      <div className="flex gap-6 text-xs font-sans uppercase tracking-widest">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "text-sera-red" : "hover:text-sera-red transition-colors"
          }
        >
          Menu
        </NavLink>
        <NavLink
          to="/reserve"
          className="hover:text-sera-red transition-colors"
        >
          Reserve
        </NavLink>
      </div>

      <NavLink to="/">
        <div className="font-logo text-2xl font-bold tracking-tighter mx-4">
          Bella Sera
        </div>
      </NavLink>

      <div className="flex gap-6 items-center text-xs font-sans uppercase tracking-widest">
        <NavLink to="/story" className="hover:text-sera-red transition-colors">
          Story
        </NavLink>

        {cartCount > 0 ? (
          <Link to="/order">
            <button className="bg-sera-red text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 animate-pulse-slow">
              <ShoppingBag size={14} />
              <span>Ticket ({cartCount})</span>
            </button>
          </Link>
        ) : (
          <Link to="/menu">
            <button className="bg-sera-charcoal text-white px-5 py-2 rounded-full hover:bg-sera-red transition-colors">
              Order Now
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  </header>
);

const NavItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 transition-all duration-300 w-12 ${isActive ? "text-white scale-110" : "text-gray-500 hover:text-gray-300"}`
    }
  >
    {icon}
    <span className="text-[9px] uppercase tracking-wider font-sans">
      {label}
    </span>
  </NavLink>
);

export default Navigation;
