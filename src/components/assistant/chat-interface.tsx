
'use client';

import * as React from 'react';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAssistantResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const initialState = {
  response: null,
  error: null,
};

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

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [state, formAction] = useFormState(getAssistantResponse, initialState);
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
    if (state.response) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: state.response as string },
      ]);
    }
  }, [state, toast]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;

    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8">
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
          {messages.map((message, index) => (
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
                  message.role === 'user'
                    ? 'bg-primary/10'
                    : 'bg-card'
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
        <form ref={formRef} action={handleFormSubmit}>
          <Input
            name="query"
            placeholder="Ask about your farm..."
            className="pr-12"
            required
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
