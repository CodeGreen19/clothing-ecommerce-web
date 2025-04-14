import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import { Toaster } from "react-hot-toast";
import { GlobalNetworkErrorHandler } from "@/lib/global-network-error";

const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothing",
  description: "ecommerce web applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable} font-quickSand antialiased`}>
        <GlobalNetworkErrorHandler />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="bottom-center" toastOptions={{ duration: 6000 }} />
      </body>
    </html>
  );
}
