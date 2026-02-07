'use client';

import { useFormStatus } from 'react-dom';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { refreshDashboard } from '@/app/actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="outline" size="icon" aria-label="Refresh dashboard" disabled={pending}>
            <RefreshCw className={`size-4 ${pending ? 'animate-spin' : ''}`} />
        </Button>
    )
}

export function RefreshButton() {
  return (
    <form action={refreshDashboard}>
      <SubmitButton />
    </form>
  );
}
