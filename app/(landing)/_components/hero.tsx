"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

const containerVars: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const wordVars: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
  show: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      
      {/* Curtain Reveal Animation */}
      <motion.div 
        className="absolute inset-0 z-50 bg-foreground"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0 }}
      />

      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <Image
          src="/hero-image.svg"
          alt="Luxury Real Estate"
          fill
          priority
          className="object-cover object-right"
        />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10">
        <motion.div 
          className="max-w-2xl mt-16 md:mt-24"
          variants={containerVars}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans tracking-tight text-foreground leading-[1.1] lg:leading-tight flex flex-wrap gap-x-3 md:gap-x-4">
            <motion.span variants={wordVars} className="font-bold">Real</motion.span>
            <motion.span variants={wordVars} className="italic font-light">People</motion.span>
            <div className="w-full h-0" /> {/* Line Break */}
            <motion.span variants={wordVars} className="italic font-light">Real</motion.span>
            <motion.span variants={wordVars} className="font-bold">Experience</motion.span>
          </h1>
          <motion.p variants={wordVars} className="mt-5 md:mt-6 text-base md:text-xl text-[var(--color-brand-dark)] max-w-lg">
            Honest feedback from clients I've had the privilege of working with.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollOpacity }} 
        className="absolute bottom-0 right-0 z-20"
      >
        <motion.div
          className="w-16 h-28 border-l border-t border-border/80 bg-background/80 backdrop-blur-md flex items-center justify-center rounded-tl-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [-5, 10, -5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="text-foreground w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
