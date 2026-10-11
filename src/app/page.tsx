import Link from 'next/link';
import { Suspense } from 'react';
import { getProducts } from '@/lib/api';
import ProductSection from '@/components/ProductSelection';
import CurrentDate from '@/components/CurrentDate';

async function HomeContent() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">🔍</div>
        <h2 className="text-xl font-bold text-gray-700">কোনো পণ্য পাওয়া যায়নি!</h2>
        <p className="text-xs text-gray-500">এপিআই সার্ভার অথবা ডাটাবেস চেক করুন।</p>
      </div>
    );
  }

  return (
    <ProductSection
      products={products}
      title="সব পণ্য"
      icon="🛍️"
    />
  );
}

function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-6 mt-8">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-44 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* ব্যানার সেকশন */}
      <section className="bg-emerald-50/60 rounded-3xl p-6 md:p-10 border border-emerald-100/80 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              আজকের দাম
            </span>
            <span className="text-xs font-semibold text-gray-500">
              (<CurrentDate />)
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="pt-2">
            <a
              href="#products"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="w-48 md:w-64 flex justify-center">
          <div className="text-8xl">🧺</div>
        </div>
      </section>

      {/* প্রোডাক্ট সেকশন */}
      <div id="products">
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent />
        </Suspense>
      </div>
    </div>
  );
}