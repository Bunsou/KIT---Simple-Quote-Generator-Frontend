import Link from "next/link";
import { QuoteCreator } from "@/components/quote-creator";

export default function CreateQuote() {
  return (
    <main className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4 gap-6">
      <QuoteCreator />
      <Link
        href="/"
        className="px-6 py-2 bg-white text-slate-800 rounded-md font-medium hover:bg-gray-100 transition-colors"
      >
        Generate Quote
      </Link>
    </main>
  );
}
