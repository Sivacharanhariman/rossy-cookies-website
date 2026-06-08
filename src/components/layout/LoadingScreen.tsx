"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Petals — deterministic to avoid hydration mismatch */}
          {[
            { yEnd: 420, xEnd: 17, rot: 380, dur: 4.1, del: 0.0 },
            { yEnd: 350, xEnd: 24, rot: 290, del: 0.3, dur: 3.5 },
            { yEnd: 480, xEnd: 31, rot: 450, del: 0.8, dur: 4.7 },
            { yEnd: 390, xEnd: 38, rot: 310, del: 1.1, dur: 3.8 },
            { yEnd: 440, xEnd: 45, rot: 420, del: 0.5, dur: 4.3 },
            { yEnd: 360, xEnd: 52, rot: 270, del: 1.5, dur: 3.6 },
            { yEnd: 500, xEnd: 59, rot: 490, del: 0.2, dur: 4.9 },
            { yEnd: 410, xEnd: 66, rot: 330, del: 1.0, dur: 4.0 },
            { yEnd: 370, xEnd: 73, rot: 400, del: 0.7, dur: 3.4 },
            { yEnd: 460, xEnd: 80, rot: 260, del: 1.8, dur: 4.6 },
            { yEnd: 430, xEnd: 20, rot: 350, del: 0.4, dur: 3.9 },
            { yEnd: 380, xEnd: 88, rot: 440, del: 1.3, dur: 4.2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, p.yEnd],
                x: [`${20 + i * 7}%`, `${p.xEnd}%`],
                rotate: [0, p.rot],
              }}
              transition={{
                duration: p.dur,
                delay: p.del,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M8 0C8 0 14 5 14 10C14 15 11 18 8 20C5 18 2 15 2 10C2 5 8 0 8 0Z"
                  fill={i % 2 === 0 ? "#D989A6" : "#C89B63"}
                  opacity="0.7"
                />
              </svg>
            </motion.div>
          ))}

          {/* Logo */}
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo Image */}
            <motion.div
              className="mb-6 flex justify-center"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-[#D989A6]/30 shadow-rose">
                <img 
                  src="/logo.jpg" 
                  alt="Rossy Cookies Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="shimmer-text">ROSSY</span>
            </motion.h1>
            <motion.p
              className="text-lg tracking-[0.4em] uppercase"
              style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              COOKIES
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-10 w-48 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div
                className="h-px w-full rounded-full"
                style={{ background: "rgba(217,137,166,0.2)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #D989A6, #C89B63)",
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
              <p
                className="text-xs mt-2 text-center"
                style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}
              >
                Crafting luxury...
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
