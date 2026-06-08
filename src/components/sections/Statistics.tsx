"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  { value: 10000, suffix: "+", label: "Cookies Baked" },
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "+", label: "Corporate Orders" },
  { value: 5, suffix: "★", label: "Customer Rating" },
];

export default function Statistics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1218 0%, #0F0A0A 100%)" }}
    >
      {/* Shimmer line top */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D989A6, #C89B63, #D989A6, transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C89B63, #D989A6, #C89B63, transparent)" }} />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="counter-num shimmer-text">
                {inView ? <CountUp end={stat.value} /> : "0"}{stat.suffix}
              </div>
              <div className="text-sm mt-2"
                style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
