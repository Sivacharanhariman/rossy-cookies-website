"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  { icon: "🌹", title: "Premium Rose Ingredients", desc: "Sourced from the finest rose farms, our extract captures the pure essence of the flower." },
  { icon: "🍪", title: "Handmade Daily", desc: "Every batch is crafted fresh each morning by our skilled artisan bakers — never mass-produced." },
  { icon: "🎁", title: "Luxury Packaging", desc: "Our signature black and rose gold boxes are designed to impress before the first bite." },
  { icon: "❤️", title: "Baked With Love", desc: "Every cookie carries the warmth and care that only passionate artisan bakers can provide." },
  { icon: "🚚", title: "Fast Delivery", desc: "Next-day tracked delivery across the UK, carefully packaged to arrive in perfect condition." },
  { icon: "⭐", title: "Premium Quality", desc: "We never compromise. Only the finest ingredients, finest packaging, and finest experience." },
];

export default function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="why-choose"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0A0608" }}
    >
      <div className="absolute inset-0 rose-pattern opacity-40" />

      {/* Background gradient */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D989A6, #C89B63, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            Our Promise
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Why Choose <span className="rose-text">Rossy?</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass rounded-3xl p-7 text-center gradient-border"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(217,137,166,0.15)" }}
            >
              {/* Icon */}
              <motion.div
                className="text-5xl mb-5 inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.div>

              <h3 className="text-lg font-bold mb-3"
                style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed"
                style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                {item.desc}
              </p>

              {/* Bottom accent */}
              <div className="mt-5 h-px w-12 mx-auto"
                style={{ background: "linear-gradient(90deg, transparent, #C89B63, transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
