"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { AiAssistantProps } from "@/types/ai-assistant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Message, useChat } from "@ai-sdk/react";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sku: string;
  stock_quantity: number;
}

interface APIProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sku: string;
  stock_quantity: number;
}

export function AiAssistant({
  title = "AI Assistant",
  initiallyExpanded = false,
  className,
  children,
}: AiAssistantProps) {
  const { messages, append, isLoading } = useChat({
    api: "/api/recommendations",
  });
  const [isOpen, setIsOpen] = useState(initiallyExpanded);
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestionPrompts = [
    { text: "Good for studying", prompt: "I want something that is good for studying" },
    { text: "Best for gaming", prompt: "What are your best headphones for gaming?" },
    { text: "Noise cancelling", prompt: "I need headphones with good noise cancellation" },
    { text: "Budget friendly", prompt: "Show me your most affordable options" }
  ];

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const welcomeMessage = {
    role: "assistant",
    content: "👋 Hi there! I'm your AI shopping assistant. I can help you find the perfect headphones based on your preferences. Feel free to ask me about specific features, price ranges, or use cases!"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages or products change
  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendedProducts]);

  // Fetch all products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        console.log("Products from database:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Parse AI response and find recommended products
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        console.log("Raw AI response:", lastMessage.content);
        const productsMatch = lastMessage.content.match(/PRODUCTS:([\s\S]*?)$/);
        if (productsMatch) {
          const productIds = productsMatch[1]
            .trim()
            .split("\n")
            .map((id: string) => id.trim())
            .filter(Boolean);
          console.log("Extracted product IDs:", productIds);
          // Transform API products to our Product interface
          const recommended = products
            .filter((p) => productIds.includes(p.id))
            .map(product => ({
              ...product,
              image_url: product.imageUrl
            }));
          console.log("Matched recommended products:", recommended);
          setRecommendedProducts(recommended);
        }
      }
    }
  }, [messages, products]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const message = inputValue;
    setInputValue("");
    await append({
      role: "user",
      content: message,
    });
  };

  const defaultTrigger = (
    <button
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e] text-white shadow-lg hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-[#1a237e]",
        isOpen && "bg-[#283593]",
        className
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{children || defaultTrigger}</PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" side="top" align="end">
          <div className="flex flex-col rounded-lg bg-[#0a1929] shadow-xl dark:bg-[#0a1929]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1e3a5f] p-4">
              <h3 className="font-semibold text-white">{title}</h3>
            </div>

            {/* Messages Container */}
            <div className="flex h-[700px] flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <div className="flex justify-start w-full">
                    <div className="rounded-lg px-4 py-2 text-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white w-full">
                      {welcomeMessage.content}
                    </div>
                  </div>
                )}
                {messages.map((message: Message, i: number) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start w-full"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-blue-500 text-white max-w-sm"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white w-full"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {/* Display recommended products if any */}
                {recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {recommendedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="w-full transform transition-all hover:scale-[1.02]"
                      >
                        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                          <div className="flex items-center p-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover rounded-md"
                                sizes="80px"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h3 className="text-base font-semibold text-white truncate">{product.name}</h3>
                              <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-blue-400 text-sm font-medium">
                                  {formatPrice(product.price)}
                                </span>
                                <span className={`text-xs ${product.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {isLoading && (
                  <div className="text-center text-white text-sm">Thinking...</div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-[#1e3a5f] p-4">
                {/* Suggestion Buttons */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {suggestionPrompts.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      className="rounded-full bg-[#1e3a5f] px-3 py-1 text-xs text-white hover:bg-[#2a4a7f] transition-colors"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about headphones..."
                    className="flex-1 rounded-lg border border-gray-300 p-2 bg-[#1e3a5f] text-white text-sm placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white text-sm disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
