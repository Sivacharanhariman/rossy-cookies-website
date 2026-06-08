"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function FloatingCart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const count = getItemCount();
  const total = getTotal();

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="floating-cart w-14 h-14 rounded-full flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, #D989A6, #C89B63)",
          boxShadow: "0 8px 32px rgba(217,137,166,0.4)",
        }}
        onClick={toggleCart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity } }}
      >
        <ShoppingCart size={22} style={{ color: "#FFF8F2" }} />
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "#0F0A0A", color: "#D989A6", fontFamily: "Poppins, sans-serif" }}
          >
            {count}
          </motion.div>
        )}
      </motion.button>

      {/* Cart drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
              style={{ background: "#1A1218", borderLeft: "1px solid rgba(217,137,166,0.15)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: "rgba(217,137,166,0.1)" }}>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  Your Cart ({count})
                </h2>
                <motion.button
                  onClick={toggleCart}
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center"
                  style={{ color: "rgba(255,248,242,0.6)" }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🌹</div>
                    <p className="text-sm" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
                      Your cart is empty. Add some luxury cookies!
                    </p>
                    <Link href="/shop" onClick={toggleCart}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-5 py-2 rounded-xl text-sm font-medium"
                        style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}
                      >
                        Shop Now
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4 glass rounded-2xl p-4"
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate"
                            style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                            {item.name}
                          </div>
                          <div className="text-sm mt-1 shimmer-text font-bold"
                            style={{ fontFamily: "Playfair Display, serif" }}>
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full glass flex items-center justify-center"
                              style={{ color: "rgba(255,248,242,0.6)" }}>
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-4 text-center"
                              style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full glass flex items-center justify-center"
                              style={{ color: "rgba(255,248,242,0.6)" }}>
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0"
                          style={{ color: "rgba(217,137,166,0.5)" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t" style={{ borderColor: "rgba(217,137,166,0.1)" }}>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm" style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>Total</span>
                    <span className="text-xl font-bold shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                  <Link href="/checkout" onClick={toggleCart}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 rounded-xl font-semibold text-sm"
                      style={{
                        background: "linear-gradient(135deg, #D989A6, #C89B63)",
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Checkout →
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
