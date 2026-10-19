import type { Metadata, Viewport } from "next";
import { Marcellus, Manrope } from "next/font/google";
import { brand } from "./lib/brand";
import "./globals.css";

const displayFont = Marcellus({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const shareImage = brand.institutionalPhoto;
const title = "Dra. Fabiana Mota | Advogada Previdenciária em Araxá";
const description = "Seu direito começa com informação. Dra. Fabiana Mota, especialista em Direito Previdenciário em Araxá, MG. Aposentadorias, BPC/LOAS, incapacidade e pensão.";

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title,
  description,
  keywords: [brand.businessName, brand.name, "advogada em Araxá", "Direito Previdenciário", "BPC LOAS", "pensão por morte", "aposentadorias", "benefícios por incapacidade"],
  icons: { icon: [{ url: brand.logo, type: "image/png" }] },
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    siteName: brand.businessName,
    type: "website",
    images: metadataBase
      ? [
          {
            url: shareImage,
            width: 680,
            height: 192,
            alt: brand.businessName,
          },
        ]
      : undefined,
  },
  twitter: {
    card: metadataBase ? "summary_large_image" : "summary",
    title,
    description,
    ...(metadataBase ? { images: [shareImage] } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#043b54",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={bodyFont.variable + " " + displayFont.variable}>
      <body className="min-h-screen bg-mist font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
