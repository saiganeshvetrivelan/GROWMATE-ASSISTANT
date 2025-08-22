'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Droplets, Clock } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState = {
  recommendation: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Generating...' : 'Get Recommendation'}
    </Button>
  );
}

export function IrrigationCard() {
  const [state, formAction] = useFormState(
    getIrrigationRecommendation,
    initialState
  );
  const { toast } = useToast();
  const { pending } = useFormStatus();

  React.useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="lg:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>AI Irrigation</CardTitle>
        <CardDescription>
          Get an AI-powered irrigation schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pending ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : state.recommendation ? (
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              {state.recommendation.recommendation}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Droplets className="size-4" />
              <span>{state.recommendation.litersPerAcre} L/acre</span>
            </div>
            {state.recommendation.startTime &&
              state.recommendation.endTime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>
                    {state.recommendation.startTime} -{' '}
                    {state.recommendation.endTime}
                  </span>
                </div>
              )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click the button to generate a new recommendation based on current
            data.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <form action={formAction} className="w-full">
          <input type="hidden" name="soilMoisture" value={45} />
          <input type="hidden" name="temperature" value={24} />
          <input type="hidden" name="humidity" value={68} />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
