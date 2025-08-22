import { Header } from '@/components/layout/header';
import { ChatInterface } from '@/components/assistant/chat-interface';

export default function AssistantPage() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header title="GrowMate Assistant" />
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        <ChatInterface fieldId="field-001" />
      </main>
    </div>
  );
}
