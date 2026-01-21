import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom"; // Added Link
import { foodData } from "../data/foodData";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // --- CONFIG: Mobile Detection for Tighter Animations ---
      const isMobile = window.innerWidth < 768;
      const m = isMobile ? 0.5 : 1; // Movement Multiplier (50% on mobile)

      // ===========================================
      // 1. HERO INTRO (BRAND FIRST STRATEGY)
      // ===========================================
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // PHASE A: The Brand (0s - 1.2s)
      introTl
        .from(".hero-bg-text", {
          opacity: 0,
          scale: 0.8,
          y: 50,
          duration: 1.5,
          ease: "expo.out",
        })
        .from(
          ".hero-text-content",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.2,
          },
          0,
        );

      // PHASE B: The Product (1.2s+)
      introTl
        .from(
          ".bowl-main",
          {
            y: 300,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.5",
        )

        // Ingredients float in tightly (Halo Effect)
        .from(
          ".float-chopsticks",
          { x: 50 * m, y: -20, opacity: 0, scale: 0.9, duration: 1 },
          "-=1",
        )
        .from(
          ".float-egg",
          { y: -50 * m, opacity: 0, scale: 0.5, duration: 1 },
          "-=0.9",
        )
        .from(".float-nori", { x: 30 * m, opacity: 0, duration: 1 }, "-=0.8")
        .from(
          ".float-naruto",
          { rotation: 180, scale: 0, opacity: 0, duration: 1 },
          "-=0.8",
        );

      // ===========================================
      // 2. HERO SCROLL (TIGHTER SPREAD)
      // ===========================================
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      scrollTl
        .to(".bowl-main", { y: 150 * m, ease: "none" }, 0)
        // Reduced movement distances using 'm' multiplier
        .to(
          ".float-egg",
          { y: -200 * m, x: -40 * m, rotation: -20, ease: "none" },
          0,
        )
        .to(
          ".float-nori",
          { y: -220 * m, x: 80 * m, rotation: 10, ease: "none" },
          0,
        )
        .to(
          ".float-naruto",
          { y: 150 * m, x: -100 * m, rotation: 90, ease: "none" },
          0,
        )
        // Chopsticks come CLOSER (Scale) instead of moving away
        .to(
          ".float-chopsticks",
          { y: -50 * m, scale: 1.3, rotation: -5, ease: "none" },
          0,
        )
        .to(".hero-bg-text", { y: -100 * m, opacity: 0.5, ease: "none" }, 0);

      // ===========================================
      // 3. SECTIONS BELOW (Float In)
      // ===========================================
      gsap.from(".philosophy-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray(".menu-card").forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="bg-sera-stone overflow-hidden w-full min-h-screen text-sera-charcoal"
    >
      {/* ------------------------------------------------
          SECTION 1: THE HERO 
      -------------------------------------------------- */}
      <section className="hero-container relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h1 className="hero-bg-text text-[22vw] font-serif font-bold text-slate-900/20 opacity-40 leading-none whitespace-nowrap">
            RAMEN SOUL
          </h1>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 items-center h-full">
          {/* Left: Copy */}
          <div className="hero-text-content order-2 md:order-1 text-center md:text-left pt-10 md:pt-0">
            <span className="block text-sera-red font-sans font-medium tracking-[0.4em] text-xs uppercase mb-4">
              Est. Jabalpur 2024
            </span>
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-6">
              Bella <br />{" "}
              <span className="italic font-light text-gray-500">Sera Café</span>
              <br />
              <span className="italic  font-sans-serif text-5xl text-gray-800">
                Roast & Toast
              </span>
            </h2>
            <p className="max-w-md text-lg  font-serif italic text-gray-700 font-sans leading-relaxed mx-auto md:mx-0">
              Carefully crafted ramen, inspired by Italy and Japan.
            </p>
          </div>

          {/* Right: The Composition */}
          <div className="order-1 md:order-2 relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            {/* INGREDIENTS (Z-Index is crucial for depth) */}

            {/* Chopsticks (Highest Z) */}
            <img
              src={foodData.ramen.floatables.chopsticks}
              className="float-chopsticks absolute w-48 md:w-64 z-30 -right-4 top-10 drop-shadow-xl"
              alt="Chopsticks"
            />

            {/* Egg (Medium Z) */}
            <img
              src={foodData.ramen.floatables.egg}
              className="float-egg absolute w-16 md:w-24 z-20 top-20 left-6 md:left-10 drop-shadow-lg"
              alt="Soft Boiled Egg"
            />

            {/* Nori (Medium Z) */}
            <img
              src={foodData.ramen.floatables.nori}
              className="float-nori absolute w-20 md:w-28 z-20 bottom-20 right-10 md:right-20 drop-shadow-md"
              alt="Nori"
            />

            {/* Naruto (Medium Z) */}
            <img
              src={foodData.ramen.floatables.naruto}
              className="float-naruto absolute w-12 md:w-16 z-20 top-0 right-1/4 drop-shadow-md"
              alt="Naruto"
            />

            {/* Main Bowl (Base Z) */}
            <img
              src={foodData.ramen.bowl}
              className="bowl-main relative z-10 w-[80%] md:w-full max-w-[480px] drop-shadow-2xl"
              alt="Signature Ramen Bowl"
            />

            {/* Glow (Background) */}
            <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/10 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 2: PHILOSOPHY 
      -------------------------------------------------- */}
      <section className="philosophy-section py-32 px-6 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="philosophy-content md:col-span-5 relative">
            <div className="overflow-hidden rounded-sm aspect-[3/4]">
              <img
                src={foodData.environment.kitchen}
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-10">
            <h3 className="philosophy-content text-5xl md:text-6xl font-serif leading-tight text-sera-charcoal">
              Taste the{" "}
              <span className="text-sera-red italic">extraordinary</span> in
              every bite.
            </h3>
            <div className="philosophy-content space-y-6 text-gray-600 font-sans text-lg max-w-xl">
              <p>
                At Bella Sera, we don't just cook; we curate. From the precision
                of our Japanese broths to the rustic warmth of our Italian
                ovens.
              </p>
            </div>
            <div className="philosophy-content pt-4">
              <span className="font-serif text-2xl italic text-sera-red">
                — The Chef's Table
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 3: MENU GRID (Staggered Load)
      -------------------------------------------------- */}
      <section className="menu-section py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <h2 className="text-5xl font-serif text-sera-charcoal">
              What's on the Plate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="menu-card group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-sera-green rounded-sm p-8 flex items-center justify-center">
                <img
                  src={foodData.ramen.bowl}
                  className="w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  alt="Ramen"
                />
              </div>
              <h3 className="text-2xl font-serif mb-2">
                {foodData.ramen.name}
              </h3>
              <p className="text-gray-500 font-sans text-sm">
                {foodData.ramen.description}
              </p>
            </div>

            {/* Card 2 */}
            <div className="menu-card group cursor-pointer md:mt-16">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-sera-green rounded-sm p-4 flex items-center justify-center">
                <img
                  src={foodData.featured.pizza.image}
                  className="w-[110%] max-w-none object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Pizza"
                />
              </div>
              <h3 className="text-2xl font-serif mb-2">
                {foodData.featured.pizza.name}
              </h3>
              <p className="text-gray-500 font-sans text-sm">
                Woodfired, Basil, San Marzano
              </p>
            </div>

            {/* Card 3 */}
            <div className="menu-card group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-sera-green rounded-sm flex items-center justify-center">
                <img
                  src={foodData.drinks.mojito.image}
                  className="h-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
                  alt="Mojito"
                />
              </div>
              <h3 className="text-2xl font-serif mb-2">
                {foodData.drinks.mojito.name}
              </h3>
              <p className="text-gray-500 font-sans text-sm">
                White Rum, Fresh Mint, Lime
              </p>
            </div>
          </div>

          {/* Button also floats in */}
          <div className="menu-card mt-24 text-center">
            <Link to="/menu">
              <button className="px-10 py-4 border border-sera-charcoal text-sera-charcoal hover:bg-sera-charcoal hover:text-white font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300">
                Explore Full Menu
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
