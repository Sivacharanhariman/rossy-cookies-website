"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { products, Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative glass-dark rounded-3xl overflow-hidden max-w-2xl w-full grid md:grid-cols-2 z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="relative h-64 md:h-auto img-zoom">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-8">
          {product.badge && (
            <span className="text-xs px-3 py-1 rounded-full font-semibold mb-3 inline-block"
              style={{ background: "rgba(217,137,166,0.2)", color: "#D989A6", fontFamily: "Poppins, sans-serif" }}>
              {product.badge}
            </span>
          )}
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
            {product.name}
          </h2>
          <p className="text-sm mb-3" style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>{product.subtitle}</p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
            {product.description}
          </p>
          {product.flavorNotes && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.flavorNotes.map(n => (
                <span key={n} className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(200,155,99,0.15)", color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
                  {n}
                </span>
              ))}
            </div>
          )}
          <div className="text-3xl font-bold mb-6 shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
            {formatPrice(product.price)}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center glass rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 hover:bg-white/10 transition-colors" style={{ color: "#FFF8F2" }}>−</button>
              <span className="px-4 py-2 font-semibold" style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)}
                className="px-3 py-2 hover:bg-white/10 transition-colors" style={{ color: "#FFF8F2" }}>+</button>
            </div>
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{
              background: added ? "rgba(217,137,166,0.3)" : "linear-gradient(135deg, #D989A6, #C89B63)",
              color: "#FFF8F2",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {added ? "✓ Added to Cart!" : <><ShoppingCart size={16} /> Add to Cart</>}
          </motion.button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center"
          style={{ color: "rgba(255,248,242,0.6)" }}>✕</button>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <motion.div
        className="product-card relative rounded-3xl overflow-hidden glass gradient-border group"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(217,137,166,0.2)" }}
      >
        {/* Card shine overlay */}
        <div className="card-shine rounded-3xl" />

        {/* Image */}
        <div className="relative h-56 img-zoom">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(15,10,10,0.8) 0%, transparent 60%)"
          }} />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-6 left-6">
              <span className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
            className="absolute top-6 right-6 w-9 h-9 rounded-full glass flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={16}
              fill={isWishlisted ? "#D989A6" : "none"}
              style={{ color: "#D989A6" }}
            />
          </motion.button>

          {/* Quick view button */}
          <AnimatePresence>
            {hovered && (
              <motion.button
                onClick={() => setQuickView(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass flex items-center gap-2 text-xs font-medium whitespace-nowrap"
                style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Eye size={14} /> Quick View
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#C89B63" style={{ color: "#C89B63" }} />
            ))}
            <span className="text-xs ml-1" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>(47)</span>
          </div>

          <h3 className="text-lg font-bold mb-1 text-center" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
            {product.name}
          </h3>
          <p className="text-xs mb-3 text-center" style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
            {product.subtitle}
          </p>

          {product.flavorNotes && (
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {product.flavorNotes.slice(0, 2).map(n => (
                <span key={n} className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(200,155,99,0.1)", color: "rgba(200,155,99,0.8)", fontFamily: "Poppins, sans-serif" }}>
                  {n}
                </span>
              ))}
            </div>
          )}

          <div className="w-full flex flex-col items-center gap-3 mt-2">
            <span className="text-2xl font-bold gold-text" style={{ fontFamily: "Playfair Display, serif" }}>
              {formatPrice(product.price)}
            </span>
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              style={{
                background: addedToCart ? "rgba(217,137,166,0.3)" : "linear-gradient(135deg, #D989A6, #C89B63)",
                color: "#FFF8F2",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {addedToCart ? "✓ Added" : <><ShoppingCart size={14} /> Add to Cart</>}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<"all" | "single" | "box">("all");

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <section ref={ref} id="products" className="section-pad relative" style={{ background: "#0A0608" }}>
      <div className="absolute inset-0 rose-pattern opacity-30" />

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
            Handcrafted with Love
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Our <span className="shimmer-text">Collection</span>
          </h2>
          <div className="luxury-divider" />
          <p className="mt-6 max-w-xl mx-auto text-base"
            style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontStyle: "italic" }}>
            Each cookie is a masterpiece — handcrafted daily with the finest ingredients.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(["all", "single", "box"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all"
              style={{
                fontFamily: "Poppins, sans-serif",
                background: filter === f ? "linear-gradient(135deg, #D989A6, #C89B63)" : "rgba(255,255,255,0.05)",
                color: filter === f ? "#FFF8F2" : "rgba(255,248,242,0.55)",
                border: filter === f ? "none" : "1px solid rgba(217,137,166,0.2)",
              }}
            >
              {f === "all" ? "All Products" : f === "single" ? "Single Cookies" : "Gift Boxes"}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full text-sm font-semibold gradient-border"
              style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}
            >
              View Full Collection →
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
