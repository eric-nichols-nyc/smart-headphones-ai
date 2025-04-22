# Smart Headphones Store Frontend

A Next.js application that provides an AI-powered shopping experience for headphones, featuring product listings and an intelligent shopping assistant.

## 🚀 Features

- **AI Shopping Assistant**: Intelligent product recommendations based on user requirements
- **Real-time Product Listings**: Dynamic display of products with detailed information
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Server-Side Integration**: Seamless connection with Supabase backend
- **Streaming AI Responses**: Real-time AI responses using Server-Sent Events (SSE)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── products/      # Product API endpoints
│   │   │   └── products-ai/   # AI Assistant endpoint
│   │   ├── page.tsx           # Home page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React Components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── ProductCard.tsx   # Product display component
│   │   ├── ProductList.tsx   # Product grid component
│   │   └── AssistantAI.tsx   # AI chat interface
│   └── lib/                   # Utility functions
```

## 🧩 Key Components

### ProductList
- Displays a responsive grid of products
- Handles loading states and error conditions
- Fetches product data from the backend
- Integrates with ProductCard for individual product display

### ProductCard
- Displays individual product information
- Shows product image, name, description, and price
- Handles stock status with visual indicators
- Responsive image loading with Next.js Image optimization

### AssistantAI
- Provides an interactive chat interface
- Integrates with Anthropic's Claude AI
- Streams responses in real-time
- Displays product recommendations with cards
- Maintains chat history and context

## 🔌 API Integration

### Products API
- `GET /api/products`: Fetches all products from Supabase
- Returns product information including:
  - Name, description, price
  - Stock quantity
  - Images
  - Categories

### AI Assistant API
- `POST /api/products-ai`: Handles AI interactions
- Features:
  - Streaming responses using SSE
  - Product-aware recommendations
  - Structured response format
  - Error handling and logging

## 💻 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: Anthropic Claude API
- **Database**: Supabase
- **State Management**: React Hooks
- **API Communication**: Server-Sent Events (SSE)

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key

### Environment Variables
```env
ANTHROPIC_API_KEY=your_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PRODUCTS_API_URL=http://localhost:3001
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

## 🤝 Integration Points

### Supabase Integration
- Direct connection to Supabase database
- Real-time product data synchronization
- Secure API key management

### AI Assistant Integration
- Anthropic Claude API for intelligent recommendations
- Streaming response handling
- Product-aware context management

## 🎯 Features in Detail

### Product Display
- Responsive grid layout
- Image optimization
- Price formatting
- Stock status indicators
- Category labeling

### AI Assistant
- Real-time chat interface
- Context-aware recommendations
- Product card integration
- Error handling
- Loading states

## 🔒 Security Considerations

- Environment variable protection
- API key security
- Rate limiting
- Error boundary implementation
- Input validation

## 🚀 Performance Optimizations

- Image optimization with Next.js
- Component lazy loading
- API response caching
- Streaming responses
- Efficient re-rendering management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint optimization
- Flexible grid layouts
- Adaptive UI components
- Touch-friendly interactions
