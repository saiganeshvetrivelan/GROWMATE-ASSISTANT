'use server';

import { z } from 'zod';
import { irrigationRecommendation } from '@/ai/flows/irrigation-recommendation';
import { growMateAssistant } from '@/ai/flows/growmate-assistant';
import { revalidatePath } from 'next/cache';

// Irrigation Recommendation Action
const irrigationSchema = z.object({
  soilMoisture: z.coerce.number(),
  temperature: z.coerce.number(),
  humidity: z.coerce.number(),
});

export async function getIrrigationRecommendation(prevState: any, formData: FormData) {
  const validatedFields = irrigationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      recommendation: null,
      error: 'Invalid input data.',
    };
  }
  
  try {
    const result = await irrigationRecommendation({
      ...validatedFields.data,
      weatherForecast: 'Sunny with a chance of afternoon showers.',
      cropType: 'Corn',
      fieldSizeAcres: 50,
    });
    revalidatePath('/');
    return {
      recommendation: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      recommendation: null,
      error: 'Failed to get irrigation recommendation.',
    };
  }
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
