"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface NavbarProps {
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

const navLinks = [
  { label: "Shop", href: "/shop", sub: ["All Cookies", "Gift Boxes", "New Arrivals"] },
  { label: "Gift Boxes", href: "#gift-boxes" },
  { label: "Our Story", href: "#story" },
  { label: "Corporate", href: "#bulk-orders" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark py-3 shadow-luxury"
            : "py-5 bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.05 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-10 h-10 overflow-hidden rounded-full border border-[#D989A6]/20 bg-[#FFF8F2]/10 flex-shrink-0"
            >
              <img 
                src="/logo.jpg" 
                alt="Rossy Cookies Logo" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            <div>
              <span
                className="text-xl font-bold tracking-wider shimmer-text"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                ROSSY
              </span>
              <span
                className="text-xs tracking-[0.3em] block"
                style={{ color: "#C89B63", fontFamily: "Poppins, sans-serif" }}
              >
                COOKIES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium hover:text-rose-400 transition-colors"
                  style={{ color: "rgba(255,248,242,0.85)", fontFamily: "Poppins, sans-serif" }}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={14} />}
                </Link>

                {link.sub && activeDropdown === link.label && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-44 glass-dark rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    {link.sub.map((s) => (
                      <Link
                        key={s}
                        href="/shop"
                        className="block px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                        style={{ color: "rgba(255,248,242,0.75)", fontFamily: "Poppins, sans-serif" }}
                      >
                        {s}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ color: "rgba(255,248,242,0.85)" }}
            >
              <Search size={20} />
            </motion.button>

            {/* Wishlist */}
            <Link href="/shop" className="relative p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: "rgba(255,248,242,0.85)" }}>
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="cart-badge text-white" style={{ background: "#D989A6" }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ color: "rgba(255,248,242,0.85)" }}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  className="cart-badge text-white"
                  style={{ background: "#D989A6" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ color: "rgba(255,248,242,0.85)" }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Mobile menu */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ color: "rgba(255,248,242,0.85)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="max-w-7xl mx-auto px-6 pt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="text"
                placeholder="Search cookies, gift boxes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(217,137,166,0.3)",
                  color: "#FFF8F2",
                  fontFamily: "Poppins, sans-serif",
                }}
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden glass-dark mt-2 mx-4 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-6 py-3 text-sm border-b hover:bg-white/5 transition-colors"
                    style={{
                      color: "rgba(255,248,242,0.85)",
                      borderColor: "rgba(217,137,166,0.1)",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
