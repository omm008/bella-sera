import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. Import useLocation
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // 2. Detect current page
  const [isVisible, setIsVisible] = useState(false);

  // --- FEATURE 1: AUTO-SCROLL ON ROUTE CHANGE ---
  // Whenever the URL path changes (e.g., Home -> Menu), snap to top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // --- FEATURE 2: MANUAL SCROLL BUTTON ---
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-50 bg-sera-red text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-red-700 transition-colors border border-white/20 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
