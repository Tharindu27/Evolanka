import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EVOLANKA — Sri Lanka Tourism Platform",
  description:
    "Centralized tourism management platform for Sri Lanka. Multi-vendor marketplace connecting tourists with local vendors, guides, hotels, rentals, and taxis.",
  keywords: ["Sri Lanka", "Tourism", "Travel", "Marketplace", "EVOLANKA"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
