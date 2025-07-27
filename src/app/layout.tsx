import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 Dashboard",
  description: "App to show F1 standings and results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
              <main className="flex-1 w-full max-w-none">
                <header className="flex items-center h-[64px] px-4 relative">
                  <div>
                    <Link href="/">
                      <Image
                        src="/f1-logo copy.svg"
                        alt="F1 Logo"
                        width={128}
                        height={48}
                        className="block"
                      />
                    </Link>
                  </div>
                  <div>
                    <Navigation></Navigation>
                  </div>
                </header>
                <div className="w-full px-4 sm:px-8">
                 {children}
                </div>
              </main>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
