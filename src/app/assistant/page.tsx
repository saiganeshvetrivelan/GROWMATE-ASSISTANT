import { Header } from '@/components/layout/header';
import { ChatInterface } from '@/components/assistant/chat-interface';

export default function AssistantPage() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header title="GrowMate Assistant" />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
