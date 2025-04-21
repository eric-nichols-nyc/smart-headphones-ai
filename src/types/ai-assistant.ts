export interface AiAssistantProps {
  /** Title shown in the chat header */
  title?: string;
  initiallyExpanded?: boolean;
  /** Additional CSS classes to apply to the chat container */
  className?: string;
}

export type MessageType = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  type: MessageType;
}

export interface AiAssistantState {
  isExpanded: boolean;
  messages: Message[];
} 