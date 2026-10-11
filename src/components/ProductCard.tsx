'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toBengaliNumber } from '@/lib/utils';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleCardClick = () => {
    const targetUrl = `/products/${product.id || product._id}`;

    if (isPending) return;

    if (session) {
      // সাইন-ইন করা থাকলে সরাসরি প্রোডাক্ট পেজে যাবে
      router.push(targetUrl);
    } else {
      // সাইন-ইন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট হবে
      router.push(`/auth/sign-in?callbackUrl=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-3xl">{product.categoryIcon || product.image || '🌾'}</span>
          <span className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
            {product.unit || 'কেজি'}
          </span>
        </div>
        <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
          {product.nameBn}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-end">
        <div>
          <p className="text-[11px] text-gray-400">আজকের দাম</p>
          <p className="text-xl font-extrabold text-gray-900">
            {toBengaliNumber(product.today ?? product.price ?? 0)} <span className="text-xs font-normal">টাকা</span>
          </p>
        </div>
        <span className="text-xs font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
          বিস্তারিত →
        </span>
      </div>
    </div>
  );
}