import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/products"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="mt-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </main>
  );
}
