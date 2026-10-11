// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// ১. মঙ্গোডিবি ক্লায়েন্ট এবং ডাটাবেস কানেকশন
const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
const db = client.db();

// ২. সমন্বিত Better-Auth কনফিগারেশন
export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  
  // ইমেইল এবং পাসওয়ার্ড অথেন্টিকেশন
  emailAndPassword: {
    enabled: true,
  },

  // সোশ্যাল প্রোভাইডার (গুগল লগইন)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});