"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const timelineItems = [
  { year: "2019", title: "The Idea Blooms", desc: "A love for roses and baking combined into one beautiful passion project in a small London kitchen." },
  { year: "2020", title: "First Batch", desc: "Rossy's first rose-infused shortbread cookies were gifted to friends and family — and the response was overwhelming." },
  { year: "2021", title: "Going Premium", desc: "We began sourcing only the finest ingredients: Belgian chocolate, Madagascan vanilla, and real rose extract." },
  { year: "2022", title: "Gift Boxes Launch", desc: "Our luxury gift box line was born — featuring bespoke packaging designed by a British artisan." },
  { year: "2024", title: "10,000+ Smiles", desc: "Today, Rossy Cookies is trusted by thousands of customers for weddings, birthdays, and corporate gifting." },
];

export default function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="story"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 rose-pattern" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,137,166,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,155,99,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            The Rossy Journey
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Our <span className="rose-text">Story</span>
          </h2>
          <div className="luxury-divider" />
          <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontStyle: "italic" }}>
            Born from a passion for combining timeless floral elegance with artisanal baking.
            Every cookie is crafted to bring beauty, flavour, and memorable experiences to every occasion.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden img-zoom">
              <Image src="/images/story.png" alt="Rossy Cookies - Our Story" fill className="object-cover" />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(15,10,10,0.6) 0%, transparent 60%)"
              }} />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-2xl p-5"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-3xl font-bold shimmer-text mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
                10,000+
              </div>
              <div className="text-xs" style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                Cookies Crafted with Love
              </div>
            </motion.div>

            {/* Rose ornament */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full glass flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <ellipse key={a} cx="16" cy="16" rx="4" ry="9"
                    fill="rgba(217,137,166,0.6)" transform={`rotate(${a} 16 16)`} />
                ))}
                <circle cx="16" cy="16" r="4" fill="#C89B63" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, #D989A6, #C89B63, transparent)" }}
              />

              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative flex gap-8 mb-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, #D989A6, #C89B63)",
                        fontFamily: "Poppins, sans-serif",
                        color: "#FFF8F2",
                      }}
                    >
                      {item.year.slice(2)}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
                      {item.year}
                    </div>
                    <h3 className="text-lg font-bold mb-2"
                      style={{ color: "#FFF8F2", fontFamily: "Playfair Display, serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
