import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import { Toaster } from 'react-hot-toast';
import SideBar from "./components/SideBar"
import TanProvider from "../../lib/TanProvider";
import { ThemeProvider } from 'next-themes'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMS",
  description: "Property management system",
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }
  export default async function RootLayout({
    children,
    params
  }: Readonly<RootLayoutProps>) {

      // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
    return (
      <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-all`}
      >
      <NextIntlClientProvider>
        <ThemeProvider  defaultTheme="system">
    
        <TanProvider>

       
        <SideBar/>
               {children}

        <Toaster/>
        </TanProvider>
      
        </ThemeProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
