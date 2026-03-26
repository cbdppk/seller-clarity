import "./globals.css";
import { ReactNode } from "react";
import { AppNavbar } from "@/components/app/app-navbar";

export const metadata = {
  title: "Seller Clarity",
  description: "AI sales assistant for informal sellers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}
