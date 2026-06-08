"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Heart, Star, Filter, Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/ui/FloatingCart";
import LuxuryCursor from "@/components/ui/LuxuryCursor";

export default function ShopPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "single" | "box">("all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted);

  const filtered = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <LuxuryCursor />
      <FloatingCart />
      <Navbar theme={theme} onThemeToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />

      <main style={{ background: "#0F0A0A", minHeight: "100vh", paddingTop: "100px" }}>
        {/* Header */}
        <div className="text-center py-16 px-6">
          <h1 className="text-5xl font-bold mb-4 shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
            Shop All Cookies
          </h1>
          <p className="text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
            Every cookie, a masterpiece. Every order, a luxury experience.
          </p>
          <div className="luxury-divider mt-6" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,248,242,0.3)" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cookies..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(217,137,166,0.2)",
                  color: "#FFF8F2",
                  fontFamily: "Poppins, sans-serif",
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {(["all", "single", "box"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-full text-xs font-medium capitalize"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    background: filter === f ? "linear-gradient(135deg, #D989A6, #C89B63)" : "rgba(255,255,255,0.05)",
                    color: filter === f ? "#FFF8F2" : "rgba(255,248,242,0.5)",
                    border: "1px solid rgba(217,137,166,0.2)",
                  }}
                >
                  {f === "all" ? "All" : f === "single" ? "Single" : "Boxes"}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="px-3 py-2.5 rounded-xl text-xs"
              style={{
                background: "rgba(15,10,10,0.8)",
                border: "1px solid rgba(217,137,166,0.2)",
                color: "#FFF8F2",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                className="glass rounded-3xl overflow-hidden gradient-border group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(217,137,166,0.15)" }}
              >
                <div className="relative h-48 img-zoom">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                  <motion.button
                    onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full glass flex items-center justify-center"
                    whileHover={{ scale: 1.15 }}
                  >
                    <Heart size={14} fill={isWishlisted(product.id) ? "#D989A6" : "none"} style={{ color: "#D989A6" }} />
                  </motion.button>
                  {product.badge && (
                    <span className="absolute top-6 left-6 text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="flex justify-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="#C89B63" style={{ color: "#C89B63" }} />)}
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-center" style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                    {product.name}
                  </h3>
                  <p className="text-xs mb-4 text-center" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
                    {product.subtitle}
                  </p>
                  <div className="w-full flex flex-col items-center gap-3 mt-2">
                    <span className="text-xl font-bold gold-text" style={{ fontFamily: "Playfair Display, serif" }}>
                      {formatPrice(product.price)}
                    </span>
                    <motion.button
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      style={{
                        background: "linear-gradient(135deg, #D989A6, #C89B63)",
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <ShoppingCart size={13} /> Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🌹</div>
              <p style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
                No cookies found. Try a different search.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
