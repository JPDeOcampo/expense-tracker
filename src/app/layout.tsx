import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import ShareState from "@/components/layout/shared/context/share-state";
export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ShareState>
          <NextUIProvider className="brand">
            <main className="h-lvh min-h-screen">{children}</main>
          </NextUIProvider>
        </ShareState>
      </body>
    </html>
  );
}
