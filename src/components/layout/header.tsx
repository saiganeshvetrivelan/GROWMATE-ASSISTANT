import * as React from 'react';
import { VoiceAssistant } from '@/components/voice-assistant';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <VoiceAssistant />
      </div>
    </header>
  );
}
