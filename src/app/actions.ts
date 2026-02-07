'use server';

import { revalidatePath } from 'next/cache';
import { getThingSpeakData } from '@/lib/thingspeak';

export async function refreshDashboard() {
  revalidatePath('/');
}

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

// Voice Assistant action
type VoiceState = { response: string; error: string | null };

export async function getVoiceResponse(
  prevState: VoiceState,
  formData: FormData
): Promise<VoiceState> {
  try {
    const command = String(formData.get('command') ?? '');
    if (!command) {
      return { response: '', error: 'Command cannot be empty.' };
    }

    // This is a demo implementation.
    return {
      response: `This is a demo response to your command: "${command}"`,
      error: null,
    };
  } catch (e: any) {
    return { response: '', error: e.message || 'Failed to get response.' };
  }
}


// GrowMate Assistant Action using useActionState
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoning_details?: any;
};
type ChatState = { history: Message[]; error?: string };

export async function getAssistantResponse(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const query = String(formData.get('query') ?? '').trim();
  if (!query) return prevState;

  const userMessage: Message = { role: 'user', content: query };

  const apiMessages = [...prevState.history, userMessage].map(
    ({ role, content, reasoning_details }) => {
      const msg: any = { role, content };
      if (role === 'assistant' && reasoning_details) {
        msg.reasoning_details = reasoning_details;
      }
      return msg;
    }
  );

  const body: any = {
    model: 'openai/gpt-oss-20b:free',
    messages: apiMessages,
  };

  if (prevState.history.length === 0) {
    body.reasoning = { enabled: true };
  }

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      return {
        history: [...prevState.history, userMessage],
        error: `API Error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const result = await response.json();
    const assistantMessageFromApi = result.choices[0].message;

    const assistantMessage: Message = {
      role: 'assistant',
      content: assistantMessageFromApi.content,
      reasoning_details: assistantMessageFromApi.reasoning_details,
    };

    const newHistory: Message[] = [
      ...prevState.history,
      userMessage,
      assistantMessage,
    ];

    revalidatePath('/assistant');

    return { history: newHistory };
  } catch (error: any) {
    console.error(error);
    return {
      history: [...prevState.history, userMessage],
      error: error.message || 'Failed to get response from assistant.',
    };
  }
}
