// src/app/layout.tsx
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের বাজার দর জানুন সহজেই।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        {/* কাস্টম টোস্টার কনফিগারেশন */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#e6666f',
              color: '#6ddf44',
              fontSize: '14px',
              borderRadius: '10px',
            },
          }}
        />
        
        {/* নেভবার এবং রানিং হেডলাইন/টিকার */}
        <Navbar />
        <PriceTicker />

        {/* মূল কনটেন্ট এরিয়া */}
        <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-6">
          {children}
        </main>

        {/* ফুটার */}
        <Footer />
      </body>
    </html>
  );
}