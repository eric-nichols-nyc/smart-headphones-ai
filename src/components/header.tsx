'use client';
import Link from "next/link";
import { AiAssistant } from "./ai-assistant/ai-assistant";
import { MessageSquareText } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold">
            Smart Headphones Store
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
              Products
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AiAssistant>
            <ShinyButton className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              <MessageSquareText className="h-5 w-5" />
              <span>Chat with AI</span>
            </ShinyButton>
          </AiAssistant>
        </div>
      </div>
    </header>
  );
} 