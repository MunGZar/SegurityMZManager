import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "@/components/RootLayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SegurityMZ Manager",
  description: "Sistema de gestión privado de instalación y venta de cámaras de seguridad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full bg-zinc-950 text-zinc-100 dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full font-sans antialiased bg-zinc-950 text-zinc-100`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
