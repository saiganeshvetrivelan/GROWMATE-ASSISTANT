'use client';
import * as React from 'react';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAssistantResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  reasoning_details?: any;
};
type ChatState = { history: Message[]; error?: string };
const initialState: ChatState = { history: [] };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      className="absolute right-1 top-1 h-8 w-8"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <CornerDownLeft className="size-4" />
      )}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function ChatInterface({ fieldId }: { fieldId: string }) {
  const [state, formAction, isPending] = useActionState<ChatState, FormData>(
    getAssistantResponse,
    initialState
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state.error, toast]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [state.history]);

  const handleFormAction = (formData: FormData) => {
    formData.set('fieldId', fieldId);
    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>
                <Bot />
              </AvatarFallback>
            </Avatar>
            <div className="p-4 rounded-lg bg-card border">
              <p className="font-semibold">GrowMate Assistant</p>
              <p className="text-muted-foreground">
                Hello! How can I help you with your farm data today? You can
                ask me about weather forecasts, sensor data, and more.
              </p>
            </div>
          </div>
          {state.history.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar>
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-4 rounded-lg border max-w-xl ${
                  message.role === 'user' ? 'bg-primary/10' : 'bg-card'
                }`}
              >
                <p
                  className={`font-semibold ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  {message.role === 'user' ? 'You' : 'GrowMate Assistant'}
                </p>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              {message.role === 'user' && (
                <Avatar>
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="relative">
        <form ref={formRef} action={handleFormAction}>
          <Input
            name="query"
            placeholder="Ask about your farm..."
            className="pr-12"
            autoComplete="off"
            disabled={isPending}
            required
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
