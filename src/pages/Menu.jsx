import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Plus,
  Soup,
  Pizza,
  UtensilsCrossed,
  Coffee,
  Sandwich,
  ShoppingBag,
} from "lucide-react";
import { menuData } from "../data/foodData";
import { useCart } from "../context/CartContext";

// --- CONFIG: Map Categories ---
const CATEGORY_ICONS = {
  ramen: { icon: Soup, color: "text-orange-500" },
  pizza: { icon: Pizza, color: "text-red-500" },
  momos: { icon: UtensilsCrossed, color: "text-yellow-500" },
  handhelds: { icon: Sandwich, color: "text-amber-600" },
  drinks: { icon: Coffee, color: "text-blue-400" },
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("ramen");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart Context
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Drag Constraints Logic
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  const currentCategory = menuData[activeCategory] || menuData.ramen;
  const dishes = currentCategory.items;
  const activeDish = dishes[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Recalculate drag width when dishes change
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth + 24,
      );
    }
  }, [dishes]);

  const handleAdd = () => {
    addToCart(activeDish);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    // ROOT: Added pb-64 on mobile to ensure content isn't hidden behind the fixed filmstrip
    <div className="relative w-full h-screen bg-sera-cream text-sera-charcoal overflow-hidden flex flex-col md:pb-0">
      {/* --- 1. HEADER --- */}
      <div className="pt-24 px-6 md:px-12 flex-shrink-0 z-40 relative">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">
              Current Menu
            </p>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-2 text-3xl md:text-5xl font-serif hover:text-sera-red transition-colors"
            >
              {currentCategory.label}
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={28} className="text-sera-red" />
              </motion.div>
            </button>
          </div>
          <div className="text-right">
            <motion.p
              key={activeDish.price}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-serif text-sera-red italic"
            >
              {activeDish.price}
            </motion.p>
          </div>
        </div>
      </div>

      {/* --- 2. THE MAIN STAGE (Scrollable on mobile if content is tall) --- */}
      {/* Added 'pb-48' on mobile so user can scroll text above the fixed filmstrip */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden relative flex flex-col md:flex-row items-center justify-center px-4 pb-48 md:pb-0 hide-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDish.id}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full md:h-full flex flex-col md:justify-center items-center z-10"
          >
            {/* Dish Image - Max Height Constraints */}
            <img
              src={activeDish.image}
              alt={activeDish.name}
              className="max-h-[40vh] md:max-h-[60%] w-auto object-contain drop-shadow-2xl mb-6 md:mb-0"
            />

            {/* Info Block - Directly below image on mobile */}
            <div className="text-center md:absolute md:bottom-10 md:left-12 md:text-left max-w-xs mx-auto md:mx-0">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-serif mb-2"
              >
                {activeDish.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 font-sans leading-relaxed text-xs md:text-sm"
              >
                {activeDish.desc}
              </motion.p>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-black/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Add Button (Desktop Only or Safe Corner) */}
        <div className="absolute top-1/2 right-6 md:bottom-12 md:top-auto md:right-12 z-20">
          <button
            onClick={handleAdd}
            className={`${isAdded ? "bg-green-600 scale-110" : "bg-sera-charcoal hover:bg-sera-red"} text-white h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300`}
          >
            <Plus
              size={24}
              className={`transition-transform duration-300 ${isAdded ? "rotate-45 opacity-0 absolute" : "opacity-100"}`}
            />
            <span
              className={`absolute font-bold text-[10px] md:text-xs ${isAdded ? "opacity-100" : "opacity-0"}`}
            >
              ADDED
            </span>
          </button>
        </div>
      </div>

      {/* --- 3. THE FILMSTRIP (Fixed Bottom on Mobile) --- */}
      {/* MOBILE: Fixed at bottom-24 (above dock). z-40 ensures it's above content. */}
      {/* DESKTOP: Static flow. */}
      <div className="fixed bottom-[90px] left-0 w-full md:static md:h-40 md:border-t md:border-sera-stone/20 overflow-hidden z-40 md:z-auto">
        {/* Gradient backdrop for mobile legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-sera-cream via-sera-cream/90 to-transparent md:hidden pointer-events-none" />

        <div className="relative w-full h-full flex items-center py-4 md:py-0">
          <motion.div
            ref={carouselRef}
            className="flex gap-4 px-6 cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            dragElastic={0.2}
          >
            {dishes.map((dish, index) => (
              <motion.button
                key={dish.id}
                onTap={() => setCurrentIndex(index)}
                className={`group relative flex-shrink-0 w-20 md:w-32 aspect-square rounded-xl transition-all duration-300 shadow-sm md:shadow-none ${
                  index === currentIndex
                    ? "bg-sera-cream ring-2 ring-sera-red scale-105"
                    : "bg-white md:bg-gray-50 hover:bg-gray-100 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="absolute inset-0 p-2 md:p-3 flex items-center justify-center">
                  <img
                    src={dish.image}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
                {index === currentIndex && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-sera-red rounded-full shadow-glow" />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- 4. MENU SWITCHER --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[120px] left-6 md:left-12 z-50 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-2 w-64 origin-top-left"
          >
            <div className="flex flex-col gap-1">
              {Object.keys(menuData).map((key) => {
                const Icon = CATEGORY_ICONS[key]?.icon || Soup;
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-sera-cream text-sera-charcoal" : "hover:bg-gray-50 text-gray-500"}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${isActive ? "bg-white shadow-sm" : "bg-transparent"}`}
                    >
                      <Icon size={20} className={CATEGORY_ICONS[key]?.color} />
                    </div>
                    <span className="font-serif text-lg">
                      {menuData[key].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
