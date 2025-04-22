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
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
        
        <ProductDetail product={product} />
      </div>
    </main>
  )
} 