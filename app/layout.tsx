import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";

import "./tailwind.css";

export const metadata: Metadata = {
  title: "YTheme",
  description: "show youtube chapter differently",
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.className}>
      <body>{children}</body>
    </html>
  );
}
