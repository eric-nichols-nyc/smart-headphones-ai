'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AiAssistantProps, Message } from '@/types/ai-assistant';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle } from 'lucide-react';

export function AiAssistant({
  title = 'AI Assistant',
  initiallyExpanded = false,
  className,
  children
}: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(initiallyExpanded);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    // TODO: Handle AI response
  };

  const defaultTrigger = (
    <button
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e] text-white shadow-lg hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-[#1a237e]',
        isOpen && 'bg-[#283593]',
        className
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {children || defaultTrigger}
        </PopoverTrigger>
        <PopoverContent
          className="w-96 p-0"
          side="top"
          align="end"
        >
          <div className="flex flex-col rounded-lg bg-[#0a1929] shadow-xl dark:bg-[#0a1929]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1e3a5f] p-4">
              <h3 className="font-semibold text-white">
                {title}
              </h3>
            </div>

            {/* Messages Container */}
            <div className="flex h-[400px] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-3',
                        message.type === 'user'
                          ? 'bg-[#1a237e] text-white'
                          : 'bg-[#132f4c] text-white'
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-[#1e3a5f] p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-[#1e3a5f] bg-[#132f4c] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a237e]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="rounded-lg bg-[#1a237e] px-4 py-2 text-white hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-[#1a237e]"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 