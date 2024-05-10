import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import Footer from "@/components/Footer";
import NextTopLoaderUI from "@/components/providers/NextTopLoaderUI";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MERN Todo App",
  description: "A simple MERN app where you can manage you daily task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoaderUI />
          {children}
          <Toaster />

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
