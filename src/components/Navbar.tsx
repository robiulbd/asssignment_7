'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

// সকল ক্যাটাগরি তালিকা
const CATEGORIES = [
  { name: 'চাল', slug: 'chal', icon: '🍚' },
  { name: 'ডাল', slug: 'dal', icon: '🫘' },
  { name: 'তেল', slug: 'tel', icon: '🛢️' },
  { name: 'সবজি', slug: 'sobji', icon: '🥬' },
  { name: 'মাছ', slug: 'mach', icon: '🐟' },
  { name: 'মাংস', slug: 'mangso', icon: '🍗' },
  { name: 'ডিম-দুধ', slug: 'dim-dui', icon: '🥛' },
  { name: 'মসলা', slug: 'mosla', icon: '🌶️' },
];

export default function Navbar() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const [currentDate, setCurrentDate] = useState<string>('');

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হওয়ার লজিক
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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


  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    setDropdownOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/sign-in');
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* লোগো */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600 shrink-0">
          🛒 <span>বাজার দর</span>
          <span> {currentDate}</span>
        </Link>
        </div>
       

        {/* সবগুলি ক্যাটাগরি মেনু (অফিসিয়াল লিস্ট) */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-xs font-semibold text-gray-700 overflow-x-auto py-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* সাইন ইন / ইউজার নাম ও ড্রপডাউন */}
        <div className="flex items-center gap-3 shrink-0">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse"></div>
          ) : session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium px-3.5 py-2 rounded-lg text-sm border border-emerald-200 transition-colors cursor-pointer"
              >
                <span>👤</span>
                <span className="max-w-[100px] sm:max-w-[140px] truncate">
                  {session.user.name || 'ইউজার'}
                </span>
                <span className="text-xs">▼</span>
              </button>

              {/* প্রোফাইল ও লগ আউট ড্রপডাউন */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[11px] text-gray-400">সাইন ইন করা আছে:</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{session.user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    <span>⚙️</span> প্রোফাইল
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 cursor-pointer"
                  >
                    <span>🚪</span> লগ আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-xs"
            >
              সাইন ইন
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}