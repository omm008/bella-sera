import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { foodData } from "../data/foodData";

const Story = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the entire 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- ANIMATION PHASES ---

  // Phase 1: The Blueprint (0% -> 20%)
  // Starts visible, fades out as you scroll down
  const opacityPhase1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25],
    [1, 1, 0],
  );
  const scalePhase1 = useTransform(scrollYProgress, [0, 0.9], [1, 0.6]);

  // Phase 2: The Mess / Experimentation (25% -> 50%)
  // Fades in, stays for a bit, then fades out
  const opacityPhase2 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.5, 0.6],
    [0, 1, 1, 0],
  );
  const rotatePhase2 = useTransform(scrollYProgress, [0.25, 0.6], [-5, 5]); // Subtle rotation

  // Phase 3: The Result / Fusion (60% -> 100%)
  // Fades in and stays visible at the end
  const opacityPhase3 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const scalePhase3 = useTransform(scrollYProgress, [0.6, 1], [0.9, 1.1]); // Slow zoom in

  // Text Parallax: Moves text up slightly faster than scroll for depth
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="bg-sera-stone min-h-[350vh] relative">
      {/* ==============================================================
          LAYER 1: THE FIXED STAGE (The Tabletop)
          This stays pinned to the screen while content scrolls over it.
      =============================================================== */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* The Wooden Surface Texture */}
        <div
          className="absolute inset-0 bg-[#d4c5b0] opacity-30"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
            backgroundSize: "300px",
          }}
        />

        {/* --- SCENE 1: THE BLUEPRINT (Construction) --- */}
        <motion.div
          style={{ opacity: opacityPhase1, scale: scalePhase1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[90vw] md:w-[400px] aspect-[3/4] bg-blue-900/10 border-4 border-white/50 p-4 rotate-2 shadow-2xl backdrop-blur-sm">
            <img
              src={foodData.environment.cafe}
              className="w-full h-full object-cover opacity-60 grayscale contrast-125 mix-blend-multiply"
              alt="Blueprint"
            />
            {/* Decorative blueprint markings */}
            <div className="absolute top-4 left-4 border border-white/40 w-16 h-16 rounded-full flex items-center justify-center text-white/60 text-[10px] font-mono">
              FIG. A
            </div>
            <div className="absolute bottom-10 right-10 text-white/50 font-serif text-4xl rotate-[-15deg] opacity-40">
              Wright Town
            </div>

            {/* Coffee Stain */}
            <div className="absolute top-1/2 -right-12 w-32 h-32 bg-[#5C4033] rounded-full opacity-20 blur-xl mix-blend-multiply" />
          </div>
        </motion.div>

        {/* --- SCENE 2: THE CHAOS (Ingredients) --- */}
        <motion.div
          style={{ opacity: opacityPhase2, rotate: rotatePhase2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-4xl">
            {/* Scattered polaroids & notes */}
            <div className="absolute top-1/4 left-10 md:left-1/4 w-48 bg-white p-3 shadow-lg -rotate-6">
              <div className="h-40 bg-gray-100 mb-2 overflow-hidden">
                <img
                  src={foodData.environment.kitchen}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-gray-500 text-xs text-center">
                Testing the basics.
              </p>
            </div>

            {/* Floating Ingredients */}
            <img
              src={foodData.ramen.floatables.egg}
              className="absolute top-1/3 right-1/4 w-24 drop-shadow-lg rotate-12"
            />
            <img
              src={foodData.ramen.floatables.nori}
              className="absolute bottom-1/3 left-1/3 w-32 drop-shadow-xl -rotate-12"
            />
            <img
              src={foodData.ramen.floatables.chopsticks}
              className="absolute bottom-1/4 right-10 w-64 drop-shadow-2xl rotate-45"
            />

            {/* Flour dusting effect */}
            <div className="absolute inset-0 bg-white opacity-5 mix-blend-overlay noise-bg" />
          </div>
        </motion.div>

        {/* --- SCENE 3: THE MASTERPIECE (Final Dish) --- */}
        <motion.div
          style={{ opacity: opacityPhase3, scale: scalePhase3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* The Halo Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10">
              <img
                src={foodData.ramen.bowl}
                className="w-[80vw] md:w-[500px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                alt="Bella Sera Ramen"
              />
            </div>

            {/* Pizza slice leaning against bowl */}
            <img
              src={foodData.featured.pizza.image}
              className="absolute -bottom-10 -right-10 w-48 md:w-64 drop-shadow-2xl rotate-12 brightness-90"
              alt="Pizza Side"
            />
          </div>
        </motion.div>
      </div>

      {/* ==============================================================
          LAYER 2: THE SCROLLING TEXT (Storytelling)
          This content actually scrolls and triggers the background changes.
      =============================================================== */}
      <div className="relative z-10 pt-[50vh] pb-[50vh]">
        {/* TEXT BLOCK 1 */}
        <div className="h-screen flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ y: textY }}
            className="bg-white/90 backdrop-blur-md p-8 md:p-12 max-w-lg mx-6 shadow-2xl border-l-4 border-sera-charcoal"
          >
            <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-gray-500 mb-3">
              Chapter I
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-sera-charcoal mb-6">
              The Blank Slate
            </h2>
            <p className="font-serif text-lg leading-relaxed text-gray-700">
              Wright Town, 2024. It started with empty walls and a simple
              question: <br />
              <span className="italic text-sera-red">
                "What is Jabalpur missing?"
              </span>
            </p>
          </motion.div>
        </div>

        {/* TEXT BLOCK 2 */}
        <div className="h-screen flex items-center justify-end md:pr-32 pointer-events-none">
          <motion.div className="bg-sera-charcoal/95 backdrop-blur-md p-8 md:p-12 max-w-lg mx-6 shadow-2xl border-r-4 border-sera-red text-right">
            <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-sera-stone/60 mb-3">
              Chapter II
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-sera-stone mb-6">
              Trial & Error
            </h2>
            <p className="font-serif text-lg leading-relaxed text-sera-stone/80">
              Different ingredients, many mistakes, and long nights in the
              kitchen. <span className="italic text-white">Umami</span>.
            </p>
          </motion.div>
        </div>

        {/* TEXT BLOCK 3 */}
        <div className="h-screen flex items-center justify-center pointer-events-none">
          <motion.div className="text-center">
            <h1 className="font-logo text-7xl md:text-9xl text-sera-red drop-shadow-2xl mb-4">
              Bella Sera
            </h1>
            <p className="text-xl font-serif italic text-sera-charcoal bg-white/80 inline-block px-6 py-2 rounded-full shadow-sm">
              Est. 2024 • The Story Continues
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Story;
