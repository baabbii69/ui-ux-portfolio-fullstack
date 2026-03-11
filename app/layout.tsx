import type { Metadata } from "next";
import { Archivo_Black, Lora, Courier_Prime } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yohanes Alemu — UI/UX Designer",
    template: "%s — Yohanes Alemu",
  },
  description:
    "UI/UX Designer & Backend Engineer from Adama, Ethiopia. Seven years turning complexity into clarity — one screen at a time.",
  keywords: [
    "UI/UX Designer",
    "Portfolio",
    "Yohanes Alemu",
    "Design Systems",
    "Mobile App Design",
    "Enterprise Dashboard",
  ],
  authors: [{ name: "Yohanes Alemu" }],
  creator: "Yohanes Alemu",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yohanes Alemu — Designer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${lora.variable} ${courierPrime.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
