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
        'flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500',
        isOpen && 'bg-blue-600',
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
          <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
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
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t p-4 dark:border-gray-700">
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
                    className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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