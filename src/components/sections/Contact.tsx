"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  message: string;
}

const eventTypes = ["Wedding", "Birthday", "Anniversary", "Corporate Event", "Other"];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0A0608" }}
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
            We'd Love to Hear From You
          </span>
          <h2 className="section-title mb-4" style={{ color: "#FFF8F2" }}>
            Get in <span className="rose-text">Touch</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6"
              style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
              Let&apos;s Create Something Beautiful
            </h3>
            <p className="text-sm leading-relaxed mb-8"
              style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
              Whether you&apos;re planning a wedding, celebrating a birthday, or need corporate gifts,
              we&apos;re here to help create the perfect Rossy Cookies experience for you.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: "hello@rossycookies.co.uk" },
                { icon: Phone, label: "Phone", value: "+44 7700 000 000" },
                { icon: MapPin, label: "Location", value: "London, United Kingdom" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0"
                    style={{ color: "#D989A6" }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "rgba(255,248,242,0.4)", fontFamily: "Poppins, sans-serif" }}>{label}</div>
                    <div className="text-sm font-medium" style={{ color: "#FFF8F2", fontFamily: "Poppins, sans-serif" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/447700000000", color: "#25D366" },
                { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/rossycookies", color: "#E1306C" },
                { icon: FacebookIcon, label: "Facebook", href: "#", color: "#1877F2" },
                { icon: Mail, label: "Email", href: "mailto:hello@rossycookies.co.uk", color: "#C89B63" },
              ].map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass"
                  style={{ color: color, fontFamily: "Poppins, sans-serif", border: `1px solid ${color}30` }}
                >
                  <Icon size={16} /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
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
                <div className="text-6xl mb-4">🌹</div>
                <h3 className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "Playfair Display, serif", color: "#FFF8F2" }}>
                  Message Received!
                </h3>
                <p className="text-sm"
                  style={{ color: "rgba(255,248,242,0.55)", fontFamily: "Poppins, sans-serif" }}>
                  We&apos;ll be in touch within 24 hours. Thank you for reaching out to Rossy Cookies!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5"
                      style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                      Name *
                    </label>
                    <input
                      {...register("name", { required: true })}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${errors.name ? "#D989A6" : "rgba(217,137,166,0.2)"}`,
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5"
                      style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                      Email *
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="you@email.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${errors.email ? "#D989A6" : "rgba(217,137,166,0.2)"}`,
                        color: "#FFF8F2",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5"
                    style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="+44 7700 000 000"
                    className="w-full px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(217,137,166,0.2)",
                      color: "#FFF8F2",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5"
                    style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                    Event Type
                  </label>
                  <select
                    {...register("eventType")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      background: "rgba(15,10,10,0.8)",
                      border: "1px solid rgba(217,137,166,0.2)",
                      color: "#FFF8F2",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5"
                    style={{ color: "rgba(255,248,242,0.6)", fontFamily: "Poppins, sans-serif" }}>
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your order, event, or any special requests..."
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
                  Send Message 🌹
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
