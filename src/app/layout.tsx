import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rossy Cookies | Luxury Handcrafted Rose Cookies",
  description:
    "Handcrafted rose-infused cookies made with premium ingredients. Perfect for weddings, birthdays, corporate gifts, and special occasions. Order online with fast UK delivery.",
  keywords: [
    "luxury cookies",
    "rose cookies",
    "artisanal cookies",
    "gift boxes",
    "wedding cookies",
    "handmade cookies UK",
    "premium biscuits",
    "Rossy Cookies",
  ],
  openGraph: {
    title: "Rossy Cookies | Luxury Handcrafted Rose Cookies",
    description: "Premium rose-infused artisanal cookies, beautifully packaged for every occasion.",
    type: "website",
    url: "https://rossycookies.co.uk",
    siteName: "Rossy Cookies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rossy Cookies | Luxury Rose Cookies",
    description: "Handcrafted luxury cookies with rose elegance. Shop now.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
