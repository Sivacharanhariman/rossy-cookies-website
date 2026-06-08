"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/ui/FloatingCart";
import LuxuryCursor from "@/components/ui/LuxuryCursor";

export default function CartPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { items, removeItem, updateQuantity, getTotal, applyCoupon, coupon, discount } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);
  const total = getTotal();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCoupon = () => {
    const success = applyCoupon(couponInput);
    setCouponSuccess(success);
    setCouponError(!success);
  };

  return (
    <>
      <LuxuryCursor />
      <FloatingCart />
      <Navbar theme={theme} onThemeToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />

      <main style={{ background: "#0F0A0A", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2 shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
            Your Cart
          </h1>
          <div className="luxury-divider mb-10" style={{ margin: "16px 0 40px" }} />

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌹</div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                Your cart is empty
              </h2>
              <p className="mb-6" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>
                Add some luxury cookies to get started.
              </p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 rounded-full font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}
                >
                  Shop Now
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="glass rounded-2xl p-4 flex gap-4"
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-1" style={{ color: "#FFF8F2", fontFamily: "Playfair Display, serif" }}>
                        {item.name}
                      </div>
                      <div className="text-sm mb-3 gold-text font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                        {formatPrice(item.price)} each
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center glass rounded-xl overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1.5 hover:bg-white/10" style={{ color: "#FFF8F2" }}>
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1.5 font-semibold text-sm"
                            style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1.5 hover:bg-white/10" style={{ color: "#FFF8F2" }}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} style={{ color: "rgba(217,137,166,0.5)" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold text-lg shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="glass rounded-3xl p-6 gradient-border h-fit">
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  Order Summary
                </h2>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(false); }}
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 rounded-xl text-xs"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${couponError ? "#D989A6" : "rgba(217,137,166,0.2)"}`,
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                    <motion.button onClick={handleCoupon} whileHover={{ scale: 1.05 }}
                      className="px-3 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                      <Tag size={14} />
                    </motion.button>
                  </div>
                  {couponSuccess && <p className="text-xs mt-1" style={{ color: "#D989A6", fontFamily: "Poppins, sans-serif" }}>
                    🎉 {discount}% discount applied!
                  </p>}
                  {couponError && <p className="text-xs mt-1" style={{ color: "rgba(217,137,166,0.5)", fontFamily: "Poppins, sans-serif" }}>
                    Invalid code. Try ROSSY10
                  </p>}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm"
                    style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm"
                      style={{ color: "#D989A6", fontFamily: "Poppins, sans-serif" }}>
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(subtotal * discount / 100)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm"
                    style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                    <span>Shipping</span>
                    <span className="text-xs" style={{ color: "#D989A6" }}>Calculated at checkout</span>
                  </div>
                  <div className="h-px" style={{ background: "rgba(217,137,166,0.15)" }} />
                  <div className="flex justify-between font-bold text-lg">
                    <span style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>Total</span>
                    <span className="shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
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
                    Proceed to Checkout →
                  </motion.button>
                </Link>

                <Link href="/shop">
                  <p className="text-center text-xs mt-3"
                    style={{ color: "rgba(255,248,242,0.3)", fontFamily: "Poppins, sans-serif" }}>
                    ← Continue Shopping
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
