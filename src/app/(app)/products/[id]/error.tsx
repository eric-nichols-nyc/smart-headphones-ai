'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product error:', error)
  }, [error])

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
          <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
          <p className="text-gray-400 text-lg mb-8">
            We encountered an error while loading the product.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => reset()}
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try again
            </button>
            <Link 
              href="/products" 
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 