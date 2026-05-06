import type { Metadata } from "next";
import { Lora, Nunito_Sans, Old_Standard_TT } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteContent } from "@/data/site-content";
import "./globals.css";

const displayFont = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const brandFont = Old_Standard_TT({
  subsets: ["latin", "cyrillic"],
  variable: "--font-brand",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.siteUrl),
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  keywords: [...siteContent.meta.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: siteContent.siteUrl,
    siteName: siteContent.siteName,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: siteContent.meta.ogImage,
        width: 1200,
        height: 630,
        alt: siteContent.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    images: [siteContent.meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "hospitality",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${brandFont.variable} bg-linen font-sans text-stone antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
