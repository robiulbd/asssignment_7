// src/app/category/[slug]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/api';
import ProductSection from '@/components/ProductSelection';

// ক্যাটাগরি নাম ও আইকন ম্যাপ
const CATEGORY_MAP: Record<string, { title: string; icon: string }> = {
  chal: { title: 'চাল', icon: '🍚' },
  dal: { title: 'ডাল', icon: '🫘' },
  tel: { title: 'তেল', icon: '🛢️' },
  sobji: { title: 'সবজি', icon: '🥬' },
  mach: { title: 'মাছ', icon: '🐟' },
  mangso: { title: 'মাংস', icon: '🍗' },
  'dim-dui': { title: 'ডিম ও দুধ', icon: '🥛' },
  mosla: { title: 'মসলা', icon: '🌶️' },
};

// ডাটা ফেচিং ও রেন্ডারিং চাইল্ড কম্পোনেন্ট (Suspense-এর ভেতরে থাকবে)
async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allProducts = await getProducts();

  // ১. ক্যাটাগরি অনুযায়ী ফিল্টার
  const categoryProducts = (allProducts || []).filter(
    (product: any) =>
      product?.category?.toLowerCase() === slug.toLowerCase() ||
      product?.slug?.toLowerCase() === slug.toLowerCase()
  );

  // ২. টাইটেল ও আইকন
  const meta = CATEGORY_MAP[slug] || {};
  const categoryTitle =
    categoryProducts[0]?.categoryNameBn || meta.title || slug;
  const categoryIcon =
    categoryProducts[0]?.categoryIcon || meta.icon || '🛍️';

  // ৩. খালি থাকলে Empty State
  if (!categoryProducts || categoryProducts.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="text-5xl">📦</div>
        <h2 className="text-2xl font-bold text-gray-800">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!
        </h2>
        <p className="text-gray-500 text-sm">
          অনুগ্রহ করে অন্য ক্যাটাগরি ব্রাউজ করুন অথবা মূল পেজে ফিরে যান।
        </p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // ৪. সর্টিং সহ প্রোডাক্ট সেকশন
  return (
    <ProductSection
      products={categoryProducts}
      title={categoryTitle}
      icon={categoryIcon}
    />
  );
}

// লোডার স্কালিটন
function CategorySkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-9 bg-gray-200 rounded w-36"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-44 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

// মূল ক্যাটাগরি পেজ কম্পোনেন্ট
export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* স্ট্রিমিং ও সাসপেন্স র‍্যাপার */}
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}