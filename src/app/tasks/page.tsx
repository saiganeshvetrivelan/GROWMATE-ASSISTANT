import { Header } from '@/components/layout/header';
import { TaskManager } from '@/components/tasks/task-manager';

export default function TasksPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Task Management" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <TaskManager />
      </main>
    </div>
  );
}
