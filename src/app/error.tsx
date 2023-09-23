"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex-col items-center flex h-screen justify-center">
      <p>Something went wrong.</p>
      <Link href="/">
        <button className="border-black border-2 px-8 py-2 rounded-lg mt-6">
          Return to home
        </button>
      </Link>
    </div>
  );
}
