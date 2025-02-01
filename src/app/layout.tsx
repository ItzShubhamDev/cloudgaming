import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import ToastProvider from "@/providers/ToastProvider";
import { Suspense } from "react";
import Loader from "@/components/loader";
import ThemeProvider from "@/providers/ThemeProvider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Cloudgaming Template",
    description: "A template for cloud gaming services",
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
                <NextTopLoader color="#2563eb" />
                <ThemeProvider>
                    <ToastProvider>
                        <Navbar />
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </ToastProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
