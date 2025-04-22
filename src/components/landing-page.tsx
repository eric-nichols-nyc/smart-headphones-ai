'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShinyButton } from '@/components/ui/shiny-button'

const FEATURED_HEADPHONES = [
  {
    name: 'Model X',
    image: '/images/image1.png'
  },
  {
    name: 'Model Y',
    image: '/images/image2.png'
  },
  {
    name: 'Model Z',
    image: '/images/image3.png'
  }
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center mb-24">
          <div>
            <h1 className="text-4xl lg:text-6xl font-normal mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Discover the<br />Future of Sound
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              AI will help you find the perfect headphones
            </p>
            {/* AI Chat Preview */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-sm">AI</span>
                </div>
                <p className="text-white">AI Chatbot</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p>Hi there! What type of music do you like?</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full bg-transparent text-gray-400 outline-none"
                  disabled
                />
              </div>
            </div>
            <ShinyButton
              asChild
              size="lg"
              className="text-lg px-8"
            >
              <Link href="/products">
                Get Started
              </Link>
            </ShinyButton>
          </div>

          <div className="relative flex justify-center items-center">
            <Image
              src="/images/hero-headphones-2.png"
              alt="Premium Headphones"
              width={500}
              height={500}
              className="w-auto h-auto max-w-[80%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Headphones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURED_HEADPHONES.map((headphone) => (
              <Card
                key={headphone.name}
                className="bg-gray-900 border-gray-800 p-8 flex flex-col items-center"
              >
                <div className="aspect-square relative w-full mb-6">
                  <Image
                    src={headphone.image}
                    alt={headphone.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{headphone.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}