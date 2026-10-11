// src/lib/api.ts

// ১. সকল প্রোডাক্ট একসাথে ফেচ করার জন্য
export async function getProducts() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data?.data || data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// ২. আইডি ধরে নির্দিষ্ট প্রোডাক্টের ডিটেইলস ফেচ করার জন্য
export async function getProductById(id: string) {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}