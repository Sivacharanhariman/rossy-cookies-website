"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const cookieVariants = [
  {
    id: "rose",
    label: "Rose",
    color: "#D989A6",
    notes: [
      { label: "Floral", icon: "🌸", desc: "Delicate rose extract from fresh petals" },
      { label: "Sweet", icon: "✨", desc: "Light natural sweetness, never overpowering" },
      { label: "Delicate", icon: "🍃", desc: "Subtle finish that lingers beautifully" },
    ],
  },
  {
    id: "vanilla",
    label: "Vanilla",
    color: "#C89B63",
    notes: [
      { label: "Creamy", icon: "🥛", desc: "Rich Madagascar vanilla bean" },
      { label: "Smooth", icon: "💫", desc: "Silky, buttery melt-in-mouth texture" },
      { label: "Rich", icon: "🌟", desc: "Deep warm vanilla notes throughout" },
    ],
  },
  {
    id: "chocolate",
    label: "Chocolate",
    color: "#8B4A3A",
    notes: [
      { label: "Deep Cocoa", icon: "🍫", desc: "Premium 70% Belgian dark chocolate" },
      { label: "Premium", icon: "👑", desc: "Single-origin cocoa, ethically sourced" },
      { label: "Luxurious", icon: "✦", desc: "Intense finish with rose undertones" },
    ],
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState("rose");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const cookieRef = useRef<HTMLDivElement>(null);

  const activeVariant = cookieVariants.find((c) => c.id === active)!;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cookieRef.current) return;
    const rect = cookieRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -20;
    const ry = ((e.clientX - cx) / rect.width) * 20;
    setRotation({ x: rx, y: ry });
  };

  return (
    <section
      ref={ref}
      id="showcase"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeVariant.color}15 0%, transparent 70%)`,
          filter: "blur(60px)",
          transition: "background 0.5s ease",
        }}
      />

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
            Interactive Experience
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Taste the <span className="rose-text">Difference</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Variant selector */}
        <div className="flex justify-center gap-4 mb-16">
          {cookieVariants.map((v) => (
            <motion.button
              key={v.id}
              onClick={() => setActive(v.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{
                fontFamily: "Poppins, sans-serif",
                background: active === v.id ? v.color : "rgba(255,255,255,0.05)",
                color: active === v.id ? "#FFF8F2" : "rgba(255,248,242,0.5)",
                border: `1px solid ${active === v.id ? v.color : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {v.label} Notes
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left notes */}
          <div className="space-y-6">
            {activeVariant.notes.map((note, i) => (
              <motion.div
                key={note.label}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5, borderColor: "rgba(217,137,166,0.3)" }}
              >
                <div className="text-2xl mb-2">{note.icon}</div>
                <div className="font-bold mb-1" style={{ color: activeVariant.color, fontFamily: "Playfair Display, serif" }}>
                  {note.label}
                </div>
                <div className="text-sm" style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                  {note.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Cookie Visual */}
          <div className="flex items-center justify-center">
            <motion.div
              ref={cookieRef}
              className="relative w-64 h-64 flex items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setRotation({ x: 0, y: 0 });
              }}
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ perspective: 800, transformStyle: "preserve-3d" }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: isHovering ? 1.1 : 1, opacity: isHovering ? 1 : 0.5 }}
                style={{
                  background: `radial-gradient(circle, ${activeVariant.color}30 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />

              {/* Cookie SVG */}
              <motion.div
                animate={{
                  rotate: isHovering ? 0 : [0, 360],
                  scale: isHovering ? 1.1 : 1,
                }}
                transition={isHovering ? { type: "spring" } : { duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                  {/* Cookie base */}
                  <circle cx="110" cy="110" r="100" fill="#8B6914" />
                  <circle cx="110" cy="110" r="95" fill="#A07820" />

                  {/* Texture dots — deterministic radii */}
                  {[68,72,65,78,60,70,74,63,76,67,71,62].map((r, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const dotR = [4.2, 3.1, 5.0, 3.8, 4.6, 3.4, 5.2, 3.7, 4.9, 3.2, 5.5, 4.0][i];
                    return (
                      <circle key={i}
                        cx={110 + Math.cos(angle) * r}
                        cy={110 + Math.sin(angle) * r}
                        r={dotR}
                        fill="rgba(0,0,0,0.2)"
                      />
                    );
                  })}

                  {/* Rose frosting petals */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <ellipse key={i}
                      cx="110" cy="110" rx="18" ry="30"
                      fill={activeVariant.color}
                      fillOpacity={0.7 + i * 0.03}
                      transform={`rotate(${angle} 110 110)`}
                    />
                  ))}
                  {[22, 67, 112, 157, 202, 247].map((angle, i) => (
                    <ellipse key={`m${i}`}
                      cx="110" cy="110" rx="12" ry="20"
                      fill={activeVariant.color}
                      fillOpacity={0.85}
                      transform={`rotate(${angle} 110 110)`}
                    />
                  ))}
                  {/* Center */}
                  <circle cx="110" cy="110" r="16" fill={activeVariant.color} />
                  <circle cx="110" cy="110" r="8" fill="#C89B63" />
                  <circle cx="108" cy="108" r="3" fill="rgba(255,255,255,0.4)" />

                  {/* Gold dust particles */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    return (
                      <circle key={`g${i}`}
                        cx={110 + Math.cos(angle) * 75}
                        cy={110 + Math.sin(angle) * 75}
                        r="2"
                        fill="#C89B63"
                        opacity="0.8"
                      />
                    );
                  })}
                </svg>
              </motion.div>

              {/* Hover label */}
              <AnimatePresence>
                {!isHovering && (
                  <motion.div
                    className="absolute bottom-0 text-xs text-center"
                    style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}
                    exit={{ opacity: 0 }}
                  >
                    Hover to explore
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right — ingredients */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
              Premium Ingredients
            </h3>
            {["Rose Extract", "Belgian Chocolate", "Madagascan Vanilla", "Cultured Butter", "Edible Gold Leaf", "Organic Rose Petals"].map((ing, i) => (
              <motion.div
                key={ing}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: activeVariant.color }} />
                <span className="text-sm" style={{ color: "rgba(255,248,242,0.65)", fontFamily: "Poppins, sans-serif" }}>{ing}</span>
              </motion.div>
            ))}

            <motion.div
              className="mt-8 glass rounded-2xl p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-xs tracking-widest uppercase mb-1"
                style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
                Quality Promise
              </div>
              <div className="text-sm" style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
                No artificial flavours, no preservatives. Just pure, premium ingredients in every single bite.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
