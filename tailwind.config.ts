import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0F0A0A",
          900: "#0F0A0A",
          800: "#1A1218",
          700: "#251820",
        },
        rose: {
          pink: "#D989A6",
          soft: "#F5D6DE",
          gold: "#C89B63",
          dark: "#A0506D",
          light: "#FCEEF3",
        },
        cream: "#FFF8F2",
        gold: "#C89B63",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "petal-fall": "petalFall 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(5deg)" },
          "66%": { transform: "translateY(-10px) rotate(-5deg)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(217,137,166,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(217,137,166,0.7)" },
        },
      },
      backgroundImage: {
        "rose-gradient": "linear-gradient(135deg, #D989A6 0%, #C89B63 100%)",
        "dark-gradient": "linear-gradient(180deg, #0F0A0A 0%, #1A1218 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(200,155,99,0.3), transparent)",
        "hero-gradient": "radial-gradient(ellipse at 50% 50%, rgba(217,137,166,0.15) 0%, rgba(15,10,10,0) 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "rose": "0 0 30px rgba(217,137,166,0.3)",
        "gold": "0 0 30px rgba(200,155,99,0.3)",
        "luxury": "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(217,137,166,0.1)",
        "card": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
