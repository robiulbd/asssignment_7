'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const [name, setName] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('অনুগ্রহ করে নাম লিখুন');
      return;
    }
    // BetterAuth update logic
    toast.success('তথ্য সফলভাবে আপডেট করা হয়েছে!');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-gray-100 space-y-4">
      <h2 className="text-lg font-bold">তথ্য আপডেট করুন</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="text-sm font-medium block text-gray-700">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নতুন নাম লিখুন"
            className="w-full border border-gray-200 p-2 rounded-md text-sm mt-1 focus:outline-emerald-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium text-sm hover:bg-emerald-700"
        >
          আপডেট তথ্য
        </button>
      </form>
    </div>
  );
}