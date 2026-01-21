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
    <div className="relative w-full h-screen bg-sera-stone text-sera-charcoal overflow-hidden flex flex-col">
      {/* --- 1. HEADER (Stays Fixed) --- */}
      <div className="pt-24 px-6 md:px-12 flex-shrink-0 z-40 relative">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-sera-charcoal/70 mb-1">
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

      {/* --- 2. THE MAIN STAGE (Now contains EVERYTHING including filmstrip) --- */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden relative flex flex-col items-center w-full hide-scrollbar">
        {/* WRAPPER: Centers content on Desktop, Allows scroll on Mobile */}
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center relative min-h-0">
          {/* A. BIG DISH DISPLAY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDish.id}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full flex flex-col md:justify-center items-center h-full  z-10 px-4 pt-4 md:pt-0"
            >
              {/* Dish Image */}
              <img
                src={activeDish.image}
                alt={activeDish.name}
                className="max-h-[35vh] md:max-h-[55vh] w-auto object-contain drop-shadow-2xl mb-6 md:mb-0"
              />

              {/* Info Block */}
              <div className="text-center md:absolute md:bottom-24 md:left-12 md:text-left max-w-xs mx-auto md:mx-0 relative z-20">
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
                  className="text-sera-charcoal/70 font-sans leading-relaxed text-xs md:text-sm"
                >
                  {activeDish.desc}
                </motion.p>
              </div>

              {/* Background Atmosphere */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] bg-black/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Add Button */}
          <div className="absolute top-[35vh] right-6 md:bottom-28 md:top-auto md:right-12 z-30 transform -translate-y-1/2 md:translate-y-0">
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

          {/* --- 3. THE FILMSTRIP (Integrated into flow) --- */}
          {/* MOBILE: Relative flow, placed after text, with bottom padding for dock */}
          {/* DESKTOP: Absolute positioned at bottom (Overlay style) */}
          <div className="w-full mt-16 pt-2 pb-32 md:pb-0 md:mt-0 md:absolute md:bottom-0 md:left-0 md:h-40 md:border-t md:border-sera-stone/20 overflow-hidden z-20">
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                ref={carouselRef}
                className="flex gap-4 px-6 cursor-grab active:cursor-grabbing h-[110%] touch-pan-y mx-auto md:mx-0"
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
        </div>
      </div>

      {/* --- 4. MENU SWITCHER (Overlay) --- */}
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
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-sera-cream text-sera-charcoal" : "hover:bg-gray-50 text-sera-charcoal/70"}`}
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
