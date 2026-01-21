import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { foodData } from "../data/foodData";

const Story = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The Red Thread (SVG Path Length)
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="bg-sera-cream min-h-[300vh] relative overflow-hidden"
    >
      {/* --- THE RED THREAD (Fixed Background) --- */}
      <div className="fixed inset-0 pointer-events-none z-5 flex justify-center">
        <svg
          className="h-full w-full md:w-[600px]"
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 50 0 C 50 100, 80 150, 80 250 C 80 350, 20 450, 20 550 C 20 650, 50 700, 50 800"
            fill="transparent"
            stroke="#B93627" // sera-red
            strokeWidth="2"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* --- CHAPTER 1: THE SPARK (Jabalpur, 2024) --- */}
      <section className="h-screen flex items-center justify-center relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto px-6 items-center">
          <div className="text-right md:pr-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
              Est. 2024 • Wright Town
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-sera-charcoal mb-6">
              More than <br />{" "}
              <span className="text-sera-red italic">Roast & Toast.</span>
            </h1>
            <p className="font-sans text-gray-600 leading-relaxed max-w-md ml-auto">
              It began with a simple idea in the heart of Jabalpur: a space for
              conversation. But as the coffee brewed, so did our hunger for
              something greater.
            </p>
          </div>
          <div className="md:pl-12 mt-10 md:mt-0">
            <div className="relative w-64 h-80 bg-white p-2 shadow-2xl rotate-3">
              <img
                src={foodData.environment.cafe}
                className="w-full h-full object-cover sepia-[.3]"
                alt="The Beginning"
              />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-serif text-xs border border-gray-300">
                '24
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHAPTER 2: THE KNOT (Italy x Asia) --- */}
      <section className="h-screen flex items-center justify-center relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto px-6 items-center">
          {/* Image First on this row */}
          <div className="order-2 md:order-1 flex justify-end md:pr-12 mt-10 md:mt-0">
            <div className="relative w-72 aspect-square">
              {/* Composition of fusion */}
              <img
                src={foodData.ramen.bowl}
                className="absolute top-0 left-0 w-2/3 shadow-xl z-10"
              />
              <img
                src={foodData.featured.pizza.image}
                className="absolute bottom-0 right-0 w-2/3 shadow-xl z-0 grayscale-[50%]"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 md:pl-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
              The Philosophy
            </h2>
            <h1 className="text-5xl md:text-6xl font-serif text-sera-charcoal mb-6">
              A Tale of <br />{" "}
              <span className="text-sera-red italic">Two Worlds.</span>
            </h1>
            <p className="font-sans text-gray-600 leading-relaxed max-w-md">
              Why choose between the warmth of an Italian oven and the precision
              of a Japanese broth? We traveled (in spirit and flavor) to knot
              these two culinary threads together.
            </p>
          </div>
        </div>
      </section>

      {/* --- CHAPTER 3: THE ARRIVAL --- */}
      <section className="h-screen flex items-center justify-center relative z-20 text-center">
        <div className="max-w-3xl px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <span className="font-logo text-6xl md:text-8xl text-sera-charcoal">
              Bella Sera
            </span>
          </motion.div>

          <p className="text-xl md:text-2xl font-serif italic text-gray-500 mb-12">
            "We didn't just build a cafe. We built a feeling."
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
            <img
              src={foodData.drinks.mojito.image}
              className="h-24 w-auto mx-auto object-contain"
            />
            <img
              src={foodData.featured.momos.image}
              className="h-24 w-auto mx-auto object-contain"
            />
            <img
              src={foodData.drinks.shake.image}
              className="h-24 w-auto mx-auto object-contain"
            />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-sera-red font-bold">
            Come for the story. Stay for the food.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Story;
