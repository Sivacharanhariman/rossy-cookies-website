"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import { Lock, CreditCard, Package } from "lucide-react";

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function CheckoutPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ordered, setOrdered] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const { register, handleSubmit } = useForm<CheckoutData>();

  const onSubmit = (data: CheckoutData) => {
    if (step === 1) { setStep(2); return; }
    if (step === 2) { setStep(3); return; }
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <>
        <LuxuryCursor />
        <Navbar theme={theme} onThemeToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />
        <main style={{ background: "#0F0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >🌹</motion.div>
            <h1 className="text-4xl font-bold mb-4 shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
              Order Placed!
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
              Thank you for your Rossy Cookies order. We&apos;ll email your confirmation shortly.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-full font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #D989A6, #C89B63)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </main>
      </>
    );
  }

  const steps = [
    { num: 1, label: "Delivery", icon: Package },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Review", icon: Lock },
  ];

  return (
    <>
      <LuxuryCursor />
      <Navbar theme={theme} onThemeToggle={() => setTheme(t => t === "dark" ? "light" : "dark")} />

      <main style={{ background: "#0F0A0A", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>
            Checkout
          </h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-10">
            {steps.map(({ num, label, icon: Icon }, i) => (
              <div key={num} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step >= num ? "linear-gradient(135deg, #D989A6, #C89B63)" : "rgba(255,255,255,0.1)",
                      color: "#FFF8F2",
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-medium hidden sm:block"
                    style={{ color: step >= num ? "#D989A6" : "rgba(255,248,242,0.3)", fontFamily: "Poppins, sans-serif" }}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="h-px w-8 sm:w-16" style={{ background: step > num ? "#D989A6" : "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
              <div className="glass rounded-3xl p-8 gradient-border">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                      Delivery Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "firstName" as const, label: "First Name", placeholder: "Sarah" },
                        { name: "lastName" as const, label: "Last Name", placeholder: "Johnson" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="block text-xs font-medium mb-1.5"
                            style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                            {field.label}
                          </label>
                          <input {...register(field.name, { required: true })} placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,137,166,0.2)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }} />
                        </div>
                      ))}
                    </div>
                    {[
                      { name: "email" as const, label: "Email", placeholder: "sarah@email.com" },
                      { name: "phone" as const, label: "Phone", placeholder: "+44 7700 000 000" },
                      { name: "address" as const, label: "Address", placeholder: "123 Rose Street" },
                    ].map(field => (
                      <div key={field.name} className="mt-4">
                        <label className="block text-xs font-medium mb-1.5"
                          style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                          {field.label}
                        </label>
                        <input {...register(field.name, { required: true })} placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 rounded-xl text-sm"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,137,166,0.2)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {[
                        { name: "city" as const, label: "City", placeholder: "London" },
                        { name: "postcode" as const, label: "Postcode", placeholder: "SW1A 1AA" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="block text-xs font-medium mb-1.5"
                            style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                            {field.label}
                          </label>
                          <input {...register(field.name, { required: true })} placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,137,166,0.2)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                      Payment Details
                    </h2>
                    <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3">
                      <Lock size={16} style={{ color: "#C89B63" }} />
                      <p className="text-xs" style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                        Your payment is secured with 256-bit SSL encryption. Stripe-powered checkout.
                      </p>
                    </div>
                    {[
                      { name: "cardNumber" as const, label: "Card Number", placeholder: "4242 4242 4242 4242" },
                    ].map(field => (
                      <div key={field.name} className="mb-4">
                        <label className="block text-xs font-medium mb-1.5"
                          style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                          {field.label}
                        </label>
                        <input {...register(field.name)} placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 rounded-xl text-sm"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,137,166,0.2)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "expiry" as const, label: "Expiry", placeholder: "MM/YY" },
                        { name: "cvv" as const, label: "CVV", placeholder: "123" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="block text-xs font-medium mb-1.5"
                            style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                            {field.label}
                          </label>
                          <input {...register(field.name)} placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,137,166,0.2)", color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                      Review Your Order
                    </h2>
                    <div className="space-y-3 mb-6">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm"
                          style={{ color: "rgba(255,248,242,0.7)", fontFamily: "Poppins, sans-serif" }}>
                          <span>{item.name} × {item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="h-px" style={{ background: "rgba(217,137,166,0.15)" }} />
                      <div className="flex justify-between font-bold">
                        <span style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>Total</span>
                        <span className="shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-6 py-3 rounded-xl font-semibold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #D989A6, #C89B63)",
                    color: "#FFF8F2",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {step === 1 ? "Continue to Payment →" : step === 2 ? "Review Order →" : "Place Order 🌹"}
                </motion.button>
              </div>
            </form>

            {/* Order Summary Sidebar */}
            <div className="glass rounded-3xl p-6 gradient-border h-fit">
              <h3 className="font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>Order Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-xs"
                    style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                    <span className="truncate mr-2">{item.name} ×{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="h-px mb-4" style={{ background: "rgba(217,137,166,0.15)" }} />
              <div className="flex justify-between font-bold">
                <span style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>Total</span>
                <span className="shimmer-text text-xl" style={{ fontFamily: "Playfair Display, serif" }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
