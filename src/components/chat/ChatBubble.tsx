import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ChatBubbleProps {
  children: ReactNode;
  className?: string;
  type?: 'user' | 'assistant';
}

export function ChatBubble({ children, className, type = 'assistant' }: ChatBubbleProps) {
  return (
    <div className={cn(
      'flex gap-2 items-start',
      type === 'user' ? 'flex-row-reverse' : 'flex-row',
      className
    )}>
      {children}
    </div>
  );
}

interface ChatBubbleMessageProps {
  children: ReactNode;
  className?: string;
  type?: 'user' | 'assistant';
}

export function ChatBubbleMessage({ children, className, type = 'assistant' }: ChatBubbleMessageProps) {
  return (
    <div className={cn(
      'rounded-lg px-4 py-2 max-w-[80%]',
      type === 'user' 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted',
      className
    )}>
      {children}
    </div>
  );
}

interface ChatBubbleAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function ChatBubbleAvatar({ src, alt, className }: ChatBubbleAvatarProps) {
  return (
    <div className={cn(
      'w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden',
      className
    )}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <svg 
          className="w-5 h-5 text-foreground/60" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      )}
    </div>
  );
} 