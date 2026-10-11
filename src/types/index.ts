export interface MarketPrice {
  bazar: string;
  division: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categorySlug: string;
  unit: string;
  currentPrice: number;
  priceChange: number; // percentage or direct change
  changeType: 'up' | 'down' | 'flat';
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  marketPrices?: MarketPrice[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}