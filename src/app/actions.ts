'use server';

import { z } from 'zod';
import { growMateAssistant } from '@/ai/flows/growmate-assistant';
import { revalidatePath } from 'next/cache';

type State = { status: 'idle' | 'ok' | 'error'; message: string };

// This server action is a placeholder you can replace later.
export async function getIrrigationRecommendation(
  prevState: State,
  formData: FormData
): Promise<State> {
  'use server';
  // TODO: call your backend or Cloud Function here.
  // Example:
  // const fieldId = formData.get('fieldId') as string;
  // const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/recommendations/run', { method: 'POST', body: JSON.stringify({ fieldId }) });
  // if (!res.ok) return { status: 'error', message: 'Failed to create plan' };
  // const data = await res.json();
  // return { status: 'ok', message: data.actions?. ?? 'Plan created' };
  console.log('Received fieldId:', formData.get('fieldId'));
  return { status: 'ok', message: 'Demo: irrigation plan created' };
}

// GrowMate Assistant Action
export async function getAssistantResponse(prevState: any, formData: FormData) {
  const query = formData.get('query') as string;
  if (!query) {
    return {
      response: null,
      error: 'Query cannot be empty.',
    };
  }

  try {
    const result = await growMateAssistant({ query });
    revalidatePath('/assistant');
    return {
      response: result.response,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      response: null,
      error: 'Failed to get response from assistant.',
    };
  }
}
