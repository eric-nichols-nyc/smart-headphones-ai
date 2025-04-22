/** @type {import('next').NextConfig} */
const nextConfig = {}

import withBundleAnalyzer from '@next/bundle-analyzer'
const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default config(nextConfig)