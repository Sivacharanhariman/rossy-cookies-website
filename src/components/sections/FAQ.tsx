"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/products";

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="faq"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      <div className="absolute inset-0 rose-pattern opacity-30" />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            Got Questions?
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Frequently <span className="rose-text">Asked</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl overflow-hidden gradient-border"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm pr-4"
                  style={{ color: open === i ? "#D989A6" : "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                  style={{ color: "#C89B63" }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px mb-4"
                        style={{ background: "linear-gradient(90deg, #D989A6, transparent)" }} />
                      <p className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm mb-4" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
            Still have questions?
          </p>
          <a href="#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #D989A6, #C89B63)",
                color: "#FFF8F2",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Contact Us
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
