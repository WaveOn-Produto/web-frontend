import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/app-css/globals.css";
import "@/styles/components-css/nav-bar.css";
import "@/styles/components-css/hero.css";
import "@/styles/components-css/home-carousel.css";
import "@/styles/components-css/product-card.css";
import "@/styles/components-css/store-carousel.css";
import "@/styles/components-css/store-card.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockIO",
  description: "App de controle de estoque para estabelecimentos.",
  icons: {
    icon: "/Stockio_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
