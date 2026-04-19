import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Подземелья Максвелла",
  description: "Погрузитесь в мир загадок и приключений с мультиплеерным онлайн-режимом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={jost.variable}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}