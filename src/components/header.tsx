'use client';
import Link from "next/link";
import { AiAssistant } from "./ai-assistant/ai-assistant";
import { MessageSquareText } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#0a0a0a] backdrop-blur-xl">
      <div className="container-fluid flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight transition-colors">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent hover:from-purple-500 hover:via-fuchsia-600 hover:to-indigo-500">
              Smart Headphones Store
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="text-sm font-medium transition-colors flex items-center gap-1.5 group">
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-fuchsia-500 group-hover:to-indigo-400">
                Products
              </span>
              <span className="text-base">🎧</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AiAssistant>
            <ShinyButton className="flex items-center gap-2.5 rounded-lg px-3 md:px-5 py-2.5 font-medium text-white transition-all duration-300 animate-bg-shine bg-[linear-gradient(110deg,#4c1d95,45%,#7c3aed,55%,#4c1d95)] bg-[length:200%_100%] border-purple-900 hover:bg-[length:300%_100%] hover:border-purple-700">
              <MessageSquareText className="h-5 w-5" />
              <span className="hidden md:inline font-medium">Chat with AI Assistant</span>
            </ShinyButton>
          </AiAssistant>
        </div>
      </div>
    </header>
  );
} 