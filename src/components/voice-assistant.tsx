'use client';

import * as React from 'react';
import { Mic } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormState, useFormStatus } from 'react-dom';
import { getVoiceResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  response: '',
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Processing...' : 'Process Command'}
    </Button>
  );
}

export function VoiceAssistant() {
  const [open, setOpen] = React.useState(false);
  const [state, formAction] = useFormState(getVoiceResponse, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
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
      // The form can be reset after a successful response
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open Voice Assistant"
      >
        <Mic className="size-5" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Voice Assistant</DialogTitle>
            <DialogDescription>
              Speak or type your command below. Our AI will process it and
              respond.
            </DialogDescription>
          </DialogHeader>
          <form
            ref={formRef}
            action={(formData) => {
              state.response = '';
              formAction(formData);
            }}
            className="space-y-4"
          >
            <Textarea
              name="command"
              placeholder="e.g., 'What is the current soil moisture?' or '¿Cuál es la humedad del suelo?'"
              required
            />
            {state.response && (
              <div className="p-4 rounded-md bg-muted text-foreground">
                <p className="font-semibold">GrowMate says:</p>
                <p>{state.response}</p>
              </div>
            )}
            <DialogFooter>
              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
