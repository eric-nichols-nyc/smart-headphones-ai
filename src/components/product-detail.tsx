import Image from 'next/image'
import { GradientButton } from '@/components/ui/gradient-button'
import { formatPrice } from '@/lib/utils'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    category: string
    sku: string
    stock_quantity: number
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const isInStock = product.stock_quantity > 0
  // Remove .png from the image_url if it exists, then add it back
  const imageUrl = product.image_url.replace(/\.png$/, '') + '.png'

  return (
    <div className="relative min-h-[80vh] mt-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Card Overlay */}
      <div className="relative z-10 max-w-md mx-auto lg:mx-0">
        <div className="backdrop-blur-lg bg-black/50 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-2xl text-blue-400 mb-4">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className={`inline-block h-3 w-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm ${isInStock ? 'text-green-500' : 'text-red-500'}`}>
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <div>
            <GradientButton
              className="w-full text-lg py-6"
              disabled={!isInStock}
            >
              Add to Cart
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
} 