'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // ইমেইল/পাসওয়ার্ড হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError('একটি সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // গুগল সাইন-ইন হ্যান্ডলার
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: callbackUrl, // সাইন-ইন শেষে কাঙ্ক্ষিত পেজে নিয়ে যাবে
      });
    } catch (err) {
      setError('গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে।');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>
        <p className="text-xs text-gray-500">পণ্যের বিস্তারিত দাম দেখতে সাইন ইন প্রয়োজন</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* ১. গুগল সাইন-ইন বাটন */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm shadow-sm cursor-pointer disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        {googleLoading ? 'গুগলে কানেক্ট হচ্ছে...' : 'Google দিয়ে সাইন ইন করুন'}
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-200 w-full"></div>
        <span className="bg-white px-3 text-xs text-gray-400 absolute">অথবা</span>
      </div>

      {/* ২. ইমেইল পাসওয়ার্ড ফর্ম */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            ইমেইল অ্যাড্রেস
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'প্রসেস হচ্ছে...' : 'সাইন ইন'}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500">
        নতুন ব্যবহারকারী?{' '}
        <Link
          href={`/auth/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-emerald-600 font-bold hover:underline"
        >
          এখানে সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-sm text-gray-500">লোডিং...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}