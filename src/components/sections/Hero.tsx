"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const FloatingPetal = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <motion.div
    className="absolute top-0 pointer-events-none"
    style={{ left: `${x}%` }}
    animate={{
      y: ["0vh", "110vh"],
      rotate: [0, 720],
      opacity: [0, 0.8, 0.5, 0],
      x: [0, 30, -20, 10],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none">
      <path
        d="M10 0C10 0 18 6 18 13C18 19 15 23 10 26C5 23 2 19 2 13C2 6 10 0 10 0Z"
        fill="rgba(217,137,166,0.5)"
      />
    </svg>
  </motion.div>
);

const petals = [
  { delay: 0, x: 10, size: 18, duration: 10 },
  { delay: 2, x: 25, size: 12, duration: 12 },
  { delay: 1, x: 40, size: 22, duration: 9 },
  { delay: 3, x: 55, size: 15, duration: 11 },
  { delay: 0.5, x: 70, size: 20, duration: 13 },
  { delay: 4, x: 85, size: 14, duration: 10 },
  { delay: 2.5, x: 15, size: 16, duration: 14 },
  { delay: 1.5, x: 90, size: 10, duration: 8 },
  { delay: 3.5, x: 60, size: 18, duration: 11 },
  { delay: 5, x: 35, size: 13, duration: 15 },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.3 + i * 0.2, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <Image
          src="/images/hero.png"
          alt="Rossy Cookies luxury rose cookies"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(15,10,10,0.3) 0%, rgba(15,10,10,0.5) 50%, rgba(15,10,10,0.95) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(217,137,166,0.15) 0%, transparent 60%)"
        }} />
      </motion.div>

      {/* Floating Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petals.map((p, i) => (
          <FloatingPetal key={i} {...p} />
        ))}
      </div>

      {/* Particle dots — deterministic positions to avoid hydration mismatch */}
      {[
        { w: 3.2, h: 3.2, l: 12, t: 24, dur: 3.8, del: 0.5 },
        { w: 1.8, h: 1.8, l: 27, t: 68, dur: 4.5, del: 1.2 },
        { w: 4.1, h: 4.1, l: 45, t: 15, dur: 3.2, del: 0.0 },
        { w: 2.5, h: 2.5, l: 63, t: 82, dur: 4.8, del: 2.1 },
        { w: 3.7, h: 3.7, l: 78, t: 38, dur: 3.5, del: 0.8 },
        { w: 1.5, h: 1.5, l: 91, t: 55, dur: 5.0, del: 3.4 },
        { w: 2.9, h: 2.9, l: 5,  t: 72, dur: 3.9, del: 1.7 },
        { w: 4.3, h: 4.3, l: 33, t: 41, dur: 4.2, del: 0.3 },
        { w: 2.1, h: 2.1, l: 52, t: 90, dur: 3.6, del: 2.8 },
        { w: 3.5, h: 3.5, l: 70, t: 10, dur: 4.7, del: 1.0 },
        { w: 1.9, h: 1.9, l: 18, t: 58, dur: 3.3, del: 4.2 },
        { w: 4.0, h: 4.0, l: 84, t: 77, dur: 5.0, del: 0.6 },
        { w: 2.7, h: 2.7, l: 39, t: 30, dur: 4.0, del: 3.1 },
        { w: 3.1, h: 3.1, l: 57, t: 63, dur: 3.7, del: 1.5 },
        { w: 1.6, h: 1.6, l: 74, t: 22, dur: 4.3, del: 2.4 },
        { w: 4.4, h: 4.4, l: 8,  t: 87, dur: 3.4, del: 0.9 },
        { w: 2.3, h: 2.3, l: 95, t: 47, dur: 4.6, del: 3.7 },
        { w: 3.8, h: 3.8, l: 23, t: 5,  dur: 3.1, del: 1.3 },
        { w: 1.7, h: 1.7, l: 48, t: 94, dur: 4.9, del: 2.6 },
        { w: 3.3, h: 3.3, l: 66, t: 33, dur: 3.6, del: 4.5 },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: dot.w,
            height: dot.h,
            left: `${dot.l}%`,
            top: `${dot.t}%`,
            background: i % 2 === 0 ? "#D989A6" : "#C89B63",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: dot.dur,
            delay: dot.del,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Label */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #C89B63)" }} />
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}
          >
            Luxury Artisanal Cookies
          </span>
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #C89B63, transparent)" }} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          <span className="block text-6xl md:text-8xl lg:text-9xl font-bold shimmer-text leading-none">
            Rossy
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl font-light italic mt-2"
            style={{ color: "#FFF8F2", opacity: 0.9 }}
          >
            Cookies
          </span>
        </motion.h1>

        {/* Divider rose */}
        <motion.div
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 my-6"
        >
          <div className="h-px flex-1 max-w-[100px]" style={{ background: "linear-gradient(90deg, transparent, #D989A6)" }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse key={a} cx="12" cy="12" rx="4" ry="8" fill="rgba(217,137,166,0.6)"
                transform={`rotate(${a} 12 12)`} />
            ))}
            <circle cx="12" cy="12" r="3.5" fill="#C89B63" />
          </svg>
          <div className="h-px flex-1 max-w-[100px]" style={{ background: "linear-gradient(90deg, #D989A6, transparent)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl mb-3 font-light italic"
          style={{ color: "#F5D6DE", fontFamily: "Cormorant Garamond, serif" }}
        >
          Delicate Rose. Timeless Taste.
        </motion.p>

        {/* Subheadline */}
        <motion.p
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}
        >
          Handcrafted rose-infused cookies made with premium ingredients, baked with love,
          and designed to create unforgettable moments.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(217,137,166,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider"
              style={{
                background: "linear-gradient(135deg, #D989A6, #C89B63)",
                color: "#FFF8F2",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              Shop Collection
            </motion.button>
          </Link>
          <a href="#gift-boxes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider gradient-border"
              style={{
                color: "#FFF8F2",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "0.1em",
                background: "transparent",
              }}
            >
              View Gift Boxes
            </motion.button>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}
        >
          Scroll
        </span>
        <ArrowDown size={16} style={{ color: "#D989A6" }} />
      </motion.div>
    </section>
  );
}
