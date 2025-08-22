'use client';
import React from 'react';
import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getIrrigationRecommendation } from '@/app/actions';

type State = { status: 'idle' | 'ok' | 'error'; message: string };

const initialState: State = { status: 'idle', message: '' };

export function IrrigationCard({ fieldId }: { fieldId: string }) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    getIrrigationRecommendation,
    initialState
  );

  return (
    <Card className="lg:col-span-2 xl:col-span-1">
      <form action={formAction}>
        <CardHeader>
          <CardTitle>AI Irrigation</CardTitle>
          <CardDescription>
            Get an AI-powered irrigation schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input type="hidden" name="fieldId" value={fieldId} />
          {state.status !== 'idle' && (
            <p className="text-sm text-muted-foreground">{state.message}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Generating...' : 'Create irrigation plan'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
