# Smart Headphones Store Frontend

A Next.js application that provides an AI-powered shopping experience for headphones, featuring product listings and an intelligent shopping assistant.

## 🚀 Features

- **AI Shopping Assistant**: Intelligent product recommendations based on user preferences and requirements
- **Real-time Product Listings**: Dynamic display of products with detailed information and stock status
- **Responsive Design**: Mobile-first approach using Tailwind CSS and shadcn/ui components
- **Server-Side Integration**: Seamless connection with backend services
- **Streaming AI Responses**: Real-time AI responses using Server-Sent Events (SSE)
- **Product Details**: Comprehensive product information with high-quality images and specifications

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   ├── (app)/              # App routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── template.js         # App template
│   └── globals.css         # Global styles
├── components/             # React Components
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components
│   ├── chat/             # Chat interface components
│   ├── ai-assistant/     # AI assistant components
│   ├── product-card.tsx  # Product card component
│   ├── product-list.tsx  # Product grid component
│   ├── product-detail.tsx # Product details view
│   ├── header.tsx        # Application header
│   └── landing-page.tsx  # Main landing page
├── lib/                   # Utility functions
│   ├── recommendations/  # AI recommendation logic
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
```

## 🧩 Key Components

### Product Components
- **ProductList**: Responsive grid of products with filtering and sorting capabilities
- **ProductCard**: Individual product display with image, price, and quick actions
- **ProductDetail**: Comprehensive product information view with specifications
- **LandingPage**: Main product showcase with featured items and categories

### Layout Components
- **Header**: Navigation and search functionality
- **Layout**: Reusable layout components for consistent UI structure

### AI Assistant Components
- Interactive chat interface with real-time responses
- Product recommendation system
- Context-aware conversation handling
- Integration with AI services for intelligent suggestions

## 🔌 API Integration

### Products API
- Product listing and details
- Category management
- Stock status tracking
- Image handling and optimization

### AI Assistant API
- Real-time chat communication
- Streaming responses via SSE
- Product-aware recommendations
- Contextual conversation handling

## 💻 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI & Styling**:
  • Tailwind CSS for utility-first styling
  • shadcn/ui for pre-built components
- **State Management**: React Hooks and Context
- **API Layer**:
  • REST APIs
  • Server-Sent Events (SSE)
- **Image Optimization**: Next.js Image component
- **Development Tools**:
  • ESLint for code quality
  • Prettier for code formatting
  • TypeScript for type safety

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Environment variables configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ASSETS_URL=your_assets_url
AI_SERVICE_KEY=your_ai_service_key
```

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## 🎯 Features in Detail

### Product Display
- Responsive grid layout with dynamic sizing
- Optimized image loading and caching
- Real-time stock status updates
- Price formatting and currency handling
- Category and tag filtering

### AI Shopping Assistant
- Natural language product search
- Personalized recommendations
- Product comparison assistance
- Real-time chat interface
- Context retention between sessions

## 🔒 Security Considerations

- Environment variable protection
- API request validation
- Rate limiting implementation
- Error boundary handling
- Input sanitization
- Secure data transmission

## 🚀 Performance Optimizations

- Image optimization with Next.js
- Component code splitting
- Dynamic imports for large components
- API response caching
- Efficient state management
- Optimized re-rendering

## 📱 Responsive Design

- Mobile-first development approach
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Touch-friendly interface
- Adaptive layouts
- Responsive images
- Accessible design patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
