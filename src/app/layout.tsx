import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Twin Beauty Saloon | Hair, Nails & Wigs in Freetown",
  description:
    "Twin Beauty Saloon on Adelaide Street, Freetown. Braids, weaves, nail art, manicures, pedicures, and a curated shop of wigs and beauty products. Walk-ins welcome.",
  keywords:
    "beauty salon Freetown, nail salon Freetown, braids Freetown, wigs Sierra Leone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-text grain-overlay">
        <CartProvider>
          <Providers>
            <CustomCursor />
            <Navigation />
            {children}
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
