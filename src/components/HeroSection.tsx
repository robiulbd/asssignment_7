'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const today = new Date();
    // বাংলা ফরম্যাটে বার, দিন, মাস এবং বছর জেনারেট করা
    const formattedDate = today.toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    
    setCurrentDate(formattedDate);
  }, []);
  return (
    <section className="bg-emerald-50/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Text Section */}
      <div className="space-y-4 max-w-lg">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
          {currentDate || 'তারিখ লোড হচ্ছে...'}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm">
          সব পণ্য দেখুন
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full max-w-[px] md:max-w-[280px] aspect-square flex justify-center items-center">
        <Image
          src="/bazar-hero.png"
          alt="Bazar Hero Basket"
          width={220}
          height={240}
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}