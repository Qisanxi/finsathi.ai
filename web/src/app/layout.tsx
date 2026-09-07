import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FinSaathi — Financial literacy, made simple for India",
  description:
    "FinSaathi is an AI-powered financial literacy assistant for Indian users. Understand mutual funds, insurance, government schemes, tax-saving concepts and beginner financial planning in simple language.",
  keywords: [
    "FinSaathi",
    "financial literacy",
    "India",
    "mutual funds",
    "SIP",
    "ELSS",
    "PPF",
    "term insurance",
    "ULIP",
    "Section 80C",
    "personal finance",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "FinSaathi — Financial literacy, made simple for India",
    description:
      "AI-powered financial education for first-time Indian investors. Chat, learn, and compare financial products in plain language.",
    siteName: "FinSaathi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
