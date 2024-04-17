import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const Luciole_regular = localFont({
    src: '../../public/Fonts/Luciole-Regular.ttf',
    display: 'swap',
    variable: '--font-Luciole_Regular',
});

export const metadata: Metadata = {
    title: "E-commernce",
    description: "Site e-commerce en ligne",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${Luciole_regular.variable} font-Luciole_Regular lg:overflow-x-hidden m-5 mg:m-0`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
