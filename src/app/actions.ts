'use server';

import { z } from 'zod';
import { growMateAssistant } from '@/ai/flows/growmate-assistant';
import { revalidatePath } from 'next/cache';

// Irrigation Action using useActionState
type IrrigationState = { status: 'idle' | 'ok' | 'error'; message: string };

export async function getIrrigationRecommendation(
  prevState: IrrigationState,
  formData: FormData
): Promise<IrrigationState> {
  try {
    const fieldId = String(formData.get('fieldId') ?? '');
    // Placeholder for actual API call
    console.log(`Creating irrigation plan for: ${fieldId}`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      status: 'ok',
      message: `Demo: plan created for ${fieldId || 'field'}`,
    };
  } catch (e: any) {
    return { status: 'error', message: e?.message || 'Error creating plan' };
  }
}

// GrowMate Assistant Action using useActionState
type Message = { role: 'user' | 'assistant'; content: string };
type ChatState = { history: Message[]; error?: string };

export async function getAssistantResponse(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const query = String(formData.get('query') ?? '').trim();
  if (!query) return prevState;

  try {
    const result = await growMateAssistant({ query });
    revalidatePath('/assistant');

    const newHistory: Message[] = [
      ...prevState.history,
      { role: 'user', content: query },
      { role: 'assistant', content: result.response },
    ];

    return { history: newHistory };
  } catch (error) {
    console.error(error);
    return { ...prevState, error: 'Failed to get response from assistant.' };
  }
}
