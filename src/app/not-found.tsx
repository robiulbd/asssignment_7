import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <span className="text-6xl">🔍</span>
      <h2 className="text-2xl font-bold text-gray-800">পেজটি পাওয়া যায়নি (404)</h2>
      <p className="text-gray-500 text-sm">আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই।</p>
      <Link
        href="/"
        className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}