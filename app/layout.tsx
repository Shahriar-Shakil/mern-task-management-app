import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import Footer from "@/components/Footer";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import NextTopLoaderUI from "@/components/providers/NextTopLoaderUI";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MERN Todo App",
  description: "A simple MERN app where you can manage you daily task.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider session={session}>
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
        </NextAuthProvider>
      </body>
    </html>
  );
}
