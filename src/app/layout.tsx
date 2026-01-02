import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Nunito } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "One Trip",
  description: "A shopping list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}
      >
        <div className="appWrapper">{children}</div>
        <Toaster toastOptions={{ duration: 3000 }}></Toaster>
      </body>
    </html>
  );
}
