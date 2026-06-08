"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  { src: "/images/hero.png", alt: "Premium Rose Cookies", cols: 2, label: "Signature Collection" },
  { src: "/images/cookie-rose.png", alt: "Rose Cookie", cols: 1, label: "Rose Flavoured" },
  { src: "/images/gallery-baking.png", alt: "Baking Process", cols: 1, label: "Behind the Scenes" },
  { src: "/images/gift-box.png", alt: "Gift Box", cols: 1, label: "Gift Boxes" },
  { src: "/images/gallery-wedding.png", alt: "Wedding Cookies", cols: 2, label: "Wedding Collection" },
  { src: "/images/gallery-packaging.png", alt: "Premium Packaging", cols: 1, label: "Premium Packaging" },
  { src: "/images/assorted-box.png", alt: "Assorted Box", cols: 1, label: "Assorted Premium" },
  { src: "/images/cookie-vanilla.png", alt: "Vanilla Cookie", cols: 1, label: "Vanilla Rose" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0A0608" }}
    >
      <div className="absolute inset-0 rose-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            @RossyCookies
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Instagram <span className="rose-text">Gallery</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl overflow-hidden img-zoom group ${img.cols === 2 ? "col-span-2" : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(img)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: "rgba(15,10,10,0)" }}
                whileHover={{ background: "rgba(15,10,10,0.7)" }}
              >
                <motion.div
                  className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn size={24} style={{ color: "#D989A6" }} />
                  <span className="text-xs font-medium"
                    style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                    {img.label}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://instagram.com/rossycookies"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #D989A6, #C89B63)",
              color: "#FFF8F2",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @RossyCookies
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setLightbox(null)} />
            <motion.div
              className="relative max-w-2xl w-full h-[70vh] rounded-3xl overflow-hidden z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
                style={{ color: "#FFF8F2" }}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
