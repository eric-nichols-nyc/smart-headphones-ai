import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { ProductDetail } from '@/components/product-detail'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  sku: string
  stock_quantity: number
}

async function getProduct(id: string): Promise<Product> {
  const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'https://products-api-jade.vercel.app'
  const apiUrl = `${PRODUCTS_API_URL}/api/products/${id}`
  
  console.log('Fetching product from API:', apiUrl)
  
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      console.error('API Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      })
      
      if (response.status === 404) {
        notFound()
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const product = await response.json()
    console.log('API Response:', product)
    return product
  } catch (error) {
    console.error('Error in getProduct:', error)
    throw error // Let the error boundary handle it
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log('Rendering product page for ID:', id)
  const product = await getProduct(id)

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/products"
          className="group inline-flex items-center relative px-4 py-2 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <ChevronLeft className="w-5 h-5 mr-2 text-purple-400 group-hover:text-fuchsia-400 transition-colors duration-300" />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent font-medium group-hover:from-purple-300 group-hover:via-fuchsia-400 group-hover:to-indigo-300 transition-all duration-300">
            Back to Products
          </span>
        </Link>
        
        <ProductDetail product={product} />
      </div>
    </main>
  )
} 