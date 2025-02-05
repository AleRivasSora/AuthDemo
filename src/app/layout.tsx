import { ThemeProvider } from "@components/theme-provider";
import { ThemeToggle } from "@components/theme-toggle";
import { ModalProvider } from "@components/modal-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModalProvider>
            <div className="container mx-auto p-4">
              <ThemeToggle />
              {children}
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
