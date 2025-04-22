import { Metadata } from 'next'
import { ProductList } from '@/components/product-list'

export const metadata: Metadata = {
  title: 'Products | Smart Headphones Store',
  description: 'Browse our collection of premium headphones with AI-powered recommendations.',
}

// Revalidate page every 60 seconds
export const revalidate = 60

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-normal text-white mb-4">Our Products</h1>
          <p className="text-gray-400 text-lg">
            Discover our premium collection of headphones, each crafted for exceptional sound quality.
          </p>
        </div>
        <ProductList />
      </div>
    </div>
  )
} 