import "./globals.css";
import { ReactNode } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { AppNavbar } from "@/components/app/app-navbar";
import { AppFooter } from "@/components/app/app-footer";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "Seller Clarity",
  description: "Turn rough seller notes into clean sales clarity.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-[#fcfcfb] font-sans text-slate-950 antialiased">
        <AppNavbar />
        <div className="flex min-h-[calc(100vh-81px)] flex-col">
          <div className="flex-1">{children}</div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
