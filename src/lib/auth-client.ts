// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL
});

// সোশ্যাল সাইন ইন (গুগল) ফাংশন
export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/", // গুগল সাইন-ইন শেষে যে পেজে রিডাইরেক্ট হবে
  });
}; 