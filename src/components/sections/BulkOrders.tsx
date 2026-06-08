"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";

const features = [
  { icon: "🏷️", title: "Custom Branding", desc: "Your logo and brand colours on every box" },
  { icon: "📦", title: "Personalised Packaging", desc: "Bespoke designs tailored to your event" },
  { icon: "💼", title: "Corporate Solutions", desc: "Dedicated account manager for bulk orders" },
  { icon: "🎪", title: "Event Catering", desc: "Perfect for conferences, galas, and launches" },
  { icon: "🚀", title: "Fast Turnaround", desc: "Delivered within 48 hours for large orders" },
  { icon: "💬", title: "White-Label Options", desc: "Full white-label cookies for your brand" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  quantity: string;
  message: string;
}

export default function BulkOrders() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="bulk-orders"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      <div className="absolute inset-0 rose-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}>
            For Businesses & Events
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Corporate <span className="shimmer-text">Gifting</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8"
              style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
              Why Businesses Choose Rossy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="glass rounded-2xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(200,155,99,0.3)" }}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-semibold mb-1 text-sm"
                    style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>
                    {f.title}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,248,242,0.5)", fontFamily: "Poppins, sans-serif" }}>
                    {f.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              {[["100+", "Corporate Clients"], ["5,000+", "Min. Batch Size"], ["48h", "Delivery"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold shimmer-text" style={{ fontFamily: "Playfair Display, serif" }}>{num}</div>
                  <div className="text-xs" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            className="glass rounded-3xl p-8 gradient-border"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-5xl mb-4">🌹</div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  Quote Received!
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
                  We&apos;ll get back to you within 2 business hours with a custom quote tailored to your needs.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6"
                  style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  Request a Custom Quote
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {[
                    { name: "name" as const, label: "Full Name", placeholder: "Sarah Johnson", type: "text" },
                    { name: "email" as const, label: "Email Address", placeholder: "sarah@company.com", type: "email" },
                    { name: "company" as const, label: "Company Name", placeholder: "Your Company Ltd", type: "text" },
                    { name: "quantity" as const, label: "Order Quantity", placeholder: "e.g. 500 cookies", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium mb-1.5"
                        style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                        {field.label}
                      </label>
                      <input
                        {...register(field.name, { required: true })}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl text-sm"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: `1px solid ${errors[field.name] ? "#D989A6" : "rgba(217,137,166,0.2)"}`,
                          color: "#FFF8F2",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium mb-1.5"
                      style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                      Message / Requirements
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Tell us about your event, branding requirements, and delivery date..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm resize-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(217,137,166,0.2)",
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(217,137,166,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #D989A6, #C89B63)",
                      color: "#FFF8F2",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Request Custom Quote →
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
