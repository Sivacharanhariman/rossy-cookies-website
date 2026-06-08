"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { giftBoxes } from "@/lib/products";

const RibbonSVG = () => (
  <svg className="ribbon-anim absolute -top-4 right-8" width="40" height="60" viewBox="0 0 40 60" fill="none">
    <path d="M20 0 L35 20 L20 15 L5 20 Z" fill="#C89B63" opacity="0.7" />
    <rect x="17" y="18" width="6" height="42" rx="3" fill="#C89B63" opacity="0.6" />
  </svg>
);

export default function GiftBoxes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="gift-boxes"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0A0608" }}
    >
      {/* Background */}
      <div className="absolute inset-0 rose-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,155,99,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

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
            Designed to Delight
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Premium <span className="gold-text">Gift Boxes</span>
          </h2>
          <div className="luxury-divider" />
          <p className="mt-6 max-w-xl mx-auto"
            style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontStyle: "italic" }}>
            Every occasion deserves a gift as beautiful as the memory it creates.
          </p>
        </motion.div>

        {/* Gift box grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftBoxes.map((box, i) => (
            <motion.div
              key={box.id}
              className="relative rounded-3xl overflow-hidden glass gradient-border group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(200,155,99,0.2)" }}
            >
              {/* Ribbon decoration */}
              <RibbonSVG />

              {/* Image */}
              <div className="relative h-52 img-zoom">
                <Image src={box.image} alt={box.title} fill className="object-cover" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(10,6,8,0.9) 0%, rgba(10,6,8,0.3) 60%, transparent 100%)"
                }} />

                {/* Shine overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(45deg, transparent 40%, rgba(200,155,99,0.2) 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{ backgroundPosition: ["200% 200%", "-200% -200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">{box.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-center"
                  style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  {box.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 text-center"
                  style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                  {box.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, rgba(217,137,166,0.2), rgba(200,155,99,0.2))",
                    border: "1px solid rgba(200,155,99,0.3)",
                    color: "#C89B63",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Explore →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature highlight */}
        <motion.div
          className="mt-16 rounded-3xl p-10 text-center gradient-border"
          style={{ background: "rgba(217,137,166,0.03)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {["Custom Ribbon", "Personalised Card", "Premium Box", "Gift Wrapping", "Handwritten Note"].map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C89B63" }} />
                <span className="text-sm" style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>{feat}</span>
              </div>
            ))}
          </div>
          <p className="text-2xl font-light italic mb-6"
            style={{ color: "rgba(255,248,242,0.7)", fontFamily: "Cormorant Garamond, serif" }}>
            &ldquo;Every Rossy gift box is a moment of pure joy, beautifully wrapped.&rdquo;
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(200,155,99,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #C89B63, #D989A6)",
              color: "#FFF8F2",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Customise Your Gift Box
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
