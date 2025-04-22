export type InteractionType = 'view' | 'click' | 'purchase' | 'chat_query';

export interface UserInteraction {
  userId: string;
  timestamp: Date;
  type: InteractionType;
  productId?: string;
  chatQuery?: string;
  metadata?: Record<string, unknown>;
}

export interface ProductPreference {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  features?: string[];
}

export interface UserProfile {
  userId: string;
  interactions: UserInteraction[];
  preferences: ProductPreference;
  lastUpdated: Date;
  consentGiven: boolean;
} 