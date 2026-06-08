"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/lib/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      {/* Background */}
      <div className="absolute inset-0 rose-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(217,137,166,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            What Our Customers Say
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            <span className="rose-text">Loved</span> by Thousands
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -60, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="glass rounded-3xl p-10 text-center gradient-border">
                {/* Quote mark */}
                <div className="text-7xl leading-none mb-4 font-serif"
                  style={{ color: "rgba(217,137,166,0.3)", fontFamily: "Playfair Display, serif" }}>
                  "
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ color: "#C89B63", fontSize: "1.2rem" }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-xl font-light italic mb-8 leading-relaxed"
                  style={{ color: "rgba(255,248,242,0.85)", fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem" }}>
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden"
                    style={{ outline: "2px solid #D989A6", outlineOffset: "2px" }}>
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm"
                      style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                      {testimonial.name}
                    </div>
                    <div className="text-xs"
                      style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              style={{ color: "#D989A6" }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background: i === current ? "linear-gradient(90deg, #D989A6, #C89B63)" : "rgba(255,248,242,0.2)",
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              style={{ color: "#D989A6" }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
