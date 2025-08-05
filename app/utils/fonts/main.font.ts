import { Cairo } from "next/font/google";

export const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-cairo",
});
