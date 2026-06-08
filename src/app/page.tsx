"use client";

import { useState } from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Products from "@/components/sections/Products";
import ProductShowcase from "@/components/sections/ProductShowcase";
import GiftBoxes from "@/components/sections/GiftBoxes";
import BulkOrders from "@/components/sections/BulkOrders";
import WhyChoose from "@/components/sections/WhyChoose";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FloatingCart from "@/components/ui/FloatingCart";
import LuxuryCursor from "@/components/ui/LuxuryCursor";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    document.body.classList.toggle("light-mode");
  };

  return (
    <>
      <LoadingScreen />
      <LuxuryCursor />
      <FloatingCart />

      <main>
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <Hero />
        <Statistics />
        <Story />
        <Products />
        <ProductShowcase />
        <GiftBoxes />
        <BulkOrders />
        <WhyChoose />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
