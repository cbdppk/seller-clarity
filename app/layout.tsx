import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Seller Clarity",
  description: "AI sales assistant for informal sellers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
