// src/app/products/[id]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { getProductById } from '@/lib/api';
import { toBengaliNumber } from '@/lib/utils';

// ডাটা ফেচিং ও রেন্ডারিং কম্পোনেন্ট
async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">🔍</div>
        <h2 className="text-xl font-bold text-gray-700">পণ্যের তথ্য পাওয়া যায়নি</h2>
        <Link href="/" className="inline-block text-emerald-600 underline text-sm">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product?.change?.dir === 'up';

  // সার্বিক সর্বনিম্ন, সর্বাধিক ও গড় দাম হিসাব করা
  const markets = product.markets || [];
  const minPrices = markets.map((m: any) => m.min).filter(Boolean);
  const maxPrices = markets.map((m: any) => m.max).filter(Boolean);

  const overallMin = minPrices.length > 0 ? Math.min(...minPrices) : product.today;
  const overallMax = maxPrices.length > 0 ? Math.max(...maxPrices) : product.today;
  const overallAvg = Math.round((overallMin + overallMax) / 2);

  return (
    <div className="space-y-8">
      {/* ব্রেডক্রাম্ব নেভিগেশন */}
      <nav className="text-sm text-gray-500 space-x-2">
        <Link href="/" className="hover:underline hover:text-emerald-600">হোম</Link>
        <span>/</span>
        <span>{product.categoryNameBn || product.category || 'ক্যাটাগরি'}</span>
        <span>/</span>
        <span className="font-semibold text-gray-800">{product.nameBn}</span>
      </nav>

      {/* প্রোডাক্ট হেডার কার্ড */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          {/* নির্দিষ্ট পণ্যের নিজস্ব ইমেজ/ইমোজি */}
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl border border-emerald-100 shadow-xs">
            {product.image || product.categoryIcon || '🌾'}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900">{product.nameBn}</h1>
            
            {/* ক্যাটাগরি আইকন ও ইউনিট ট্যাগ */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium border border-emerald-100 flex items-center gap-1">
                <span>{product.categoryIcon || '🛍️'}</span>
                <span>{product.categoryNameBn || 'ক্যাটাগরি'}</span>
              </span>
              <span>·</span>
              <span>প্রতি {product.unit || 'কেজি'}</span>
            </div>

            {product.change && (
              <p className="text-xs text-gray-600 pt-1">
                গতকাল থেকে দাম{' '}
                <span className={`font-bold ${isUp ? 'text-red-600' : 'text-emerald-600'}`}>
                  {isUp ? 'বেড়েছে' : 'কমেছে'} · {toBengaliNumber(Math.abs(product.today - product.yesterday))} টাকা
                </span>
              </p>
            )}
          </div>
        </div>

        {/* আজকের গড় দাম */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center min-w-[140px] w-full md:w-auto">
          <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-3xl font-black text-gray-900">{toBengaliNumber(product.today)}</p>
          <p className="text-xs text-gray-500 my-0.5">টাকা / {product.unit || 'কেজি'}</p>
          {product.change && (
            <p className={`text-xs font-bold ${isUp ? 'text-red-600' : 'text-emerald-600'}`}>
              {isUp ? '▲' : '▼'} {toBengaliNumber(product.change.pct)}%
            </p>
          )}
        </div>
      </div>

      {/* দামের সারসংক্ষেপ (Summary) */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
            <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-emerald-600">{toBengaliNumber(overallMin)} টাকা</p>
            <p className="text-[11px] text-gray-400 mt-2">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
            <p className="text-xs text-gray-500 mb-1">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">{toBengaliNumber(overallMax)} টাকা</p>
            <p className="text-[11px] text-gray-400 mt-2">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
            <p className="text-xs text-gray-500 mb-1">গড় দাম</p>
            <p className="text-2xl font-bold text-emerald-700">{toBengaliNumber(overallAvg)} টাকা</p>
            <p className="text-[11px] text-gray-400 mt-2">প্রতি {product.unit || 'কেজি'}-এর হিসাবে</p>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Table) */}
      {markets.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100 text-xs">
                  <th className="py-3 px-5">বাজার</th>
                  <th className="py-3 px-5">বিভাগ</th>
                  <th className="py-3 px-5">সর্বনিম্ন</th>
                  <th className="py-3 px-5">সর্বাধিক</th>
                  <th className="py-3 px-5 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {markets.map((m: any, idx: number) => {
                  const marketName = m.market || 'অজানা বাজার';
                  const division = m.division || 'N/A';
                  const minP = m.min ?? 0;
                  const maxP = m.max ?? 0;
                  const avgP = Math.round((minP + maxP) / 2);

                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-5 font-semibold">{marketName}</td>
                      <td className="py-3.5 px-5 text-gray-500">{division}</td>
                      <td className="py-3.5 px-5">{toBengaliNumber(minP)} টাকা</td>
                      <td className="py-3.5 px-5">{toBengaliNumber(maxP)} টাকা</td>
                      <td className="py-3.5 px-5 font-bold text-right">{toBengaliNumber(avgP)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// লোডার স্ক্যালিটন
function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-5xl mx-auto py-8">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded-2xl"></div>
      <div className="h-28 bg-gray-200 rounded-2xl"></div>
      <div className="h-64 bg-gray-200 rounded-2xl"></div>
    </div>
  );
}

// মূল পেজ ফাংশন
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}