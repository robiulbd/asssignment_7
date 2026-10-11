'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

type SortOption = 'default' | 'lowToHigh' | 'highToLow';

export default function ProductSection({
  products,
  title = 'পণ্যসমূহ',
  icon = '🛍️',
}: {
  products: any[];
  title?: string;
  icon?: string;
}) {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // সর্টিং লজিক
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a?.today ?? a?.price ?? 0;
    const priceB = b?.today ?? b?.price ?? 0;

    if (sortBy === 'lowToHigh') {
      return priceA - priceB; // কম থেকে বেশি (Ascending)
    }
    if (sortBy === 'highToLow') {
      return priceB - priceA; // বেশি থেকে কম (Descending)
    }
    return 0; // ডিফল্ট (API ক্রমানুসারে)
  });

  return (
    <section className="space-y-6">
      {/* হেডার ও ডানের সর্টিং বাটন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-3 border-gray-200">
        {/* বা দিকে ক্যাটাগরি/সেকশন টাইটেল */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-2xl font-bold text-gray-800">
            {title} ({products.length})
          </h2>
        </div>

        {/* ডান দিকে সর্টিং ড্রপডাউন বাটন */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort" className="text-xs font-semibold text-gray-500 whitespace-nowrap">
            ক্রমানুসারে:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি ⬆️</option>
            <option value="highToLow">দাম: বেশি থেকে কম ⬇️</option>
          </select>
        </div>
      </div>

      {/* প্রোডাক্ট গ্রিড (প্রতি রো-তে ৩টি করে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedProducts.map((product: any) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </section>
  );
}