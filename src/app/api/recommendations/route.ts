import { anthropic } from '@ai-sdk/anthropic';
import { generateId, createDataStreamResponse, streamText } from 'ai';

const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'http://localhost:3001';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock_quantity: number;
  category: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${PRODUCTS_API_URL}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userPrompt = messages[messages.length - 1]?.content;

    if (!userPrompt) {
      return Response.json({ 
        error: 'No prompt provided in messages',
      }, { status: 400 });
    }

    // Fetch products
    const products = await fetchProducts();
    const productsContext = products
      .map((p: Product) => `[ID: ${p.id}] ${p.name}: ${p.description} - Price: $${p.price}`)
      .join('\n');

    const enhancedPrompt = `
User Request: ${userPrompt}

Available Products (reference by ID):
${productsContext}

Please provide your recommendation in the following format:

RECOMMENDATION:
[Your natural language recommendation text here. Do not include product IDs in this section.]

PRODUCTS:
[List only the product IDs (not names) from the [ID: xxx] references, one per line]

Based on the user's requirements and the available products listed above, please recommend the most suitable headphone(s). Include specific product names, justify your recommendation, and mention key features that match the user's needs.`;

    return createDataStreamResponse({
      execute: dataStream => {
        dataStream.writeData('initialized call');

        const result = streamText({
          model: anthropic('claude-3-sonnet-20240229'),
          messages: [
            ...messages.slice(0, -1),
            { role: 'user', content: enhancedPrompt }
          ],
          maxTokens: 1000,
          temperature: 0.7,
          system: `You are a knowledgeable AI assistant specializing in headphone recommendations. 
Your task is to analyze the user's requirements and the available products in our inventory to make the best possible recommendation.

When making recommendations:
1. Only recommend products that are actually listed in the "Available Products" section
2. Consider the user's specific requirements (budget, use case, features)
3. Explain why the recommended product(s) match their needs
4. If no perfect match exists, recommend the closest option and explain any trade-offs
5. If multiple products could work, list them in order of best match
6. Always mention the price and key features that match their requirements

IMPORTANT: Always format your response with two sections:
1. "RECOMMENDATION:" followed by your natural language recommendation
2. "PRODUCTS:" followed by the IDs of recommended products, one per line. Use the exact IDs as shown in [ID: xxx]

Example response format:
RECOMMENDATION:
Based on your need for noise-cancelling headphones under $300, I recommend the XYZ headphones because they offer excellent noise cancellation and fall within your budget...

PRODUCTS:
prod_123
prod_456`,
          onChunk() {
            dataStream.writeMessageAnnotation({ chunk: generateId() });
          },
          onFinish() {
            dataStream.writeMessageAnnotation({
              id: generateId(),
              createdAt: new Date().toISOString(),
            });
            dataStream.writeData('call completed');
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
      onError: error => {
        console.error('Error in products-ai route:', error);
        return error instanceof Error ? error.message : String(error);
      },
    });
  } catch (error) {
    console.error('Error in products-ai route:', error);
    return Response.json({ 
      error: 'Failed to generate headphone recommendation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 