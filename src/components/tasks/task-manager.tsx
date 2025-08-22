'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '../ui/checkbox';

type Task = {
  id: number;
  text: string;
  date: Date;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, text: 'Calibrate irrigation sensors', date: new Date(), completed: false },
  { id: 2, text: 'Scout Field A for pests', date: new Date(), completed: true },
  {
    id: 3,
    text: 'Analyze soil sample results',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    completed: false,
  },
];

export function TaskManager() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim() || !date) return;

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      date: date,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText('');
    setIsDialogOpen(false);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const selectedDayTasks = tasks.filter(
    (task) =>
      date &&
      task.date.getDate() === date.getDate() &&
      task.date.getMonth() === date.getMonth() &&
      task.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Task Calendar</CardTitle>
          <CardDescription>
            Select a date to view and manage tasks.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tasks for {date?.toLocaleDateString()}</CardTitle>
            <CardDescription>
              {selectedDayTasks.length} task(s) scheduled.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus />
                <span className="sr-only">Add Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddTask}>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new task. It will be added to the
                    selected date.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-name" className="text-right">
                      Task
                    </Label>
                    <Input
                      id="task-name"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="e.g., Check fertilizer levels"
                      className="col-span-3"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDayTasks.length > 0 ? (
              <AnimatePresence>
                {selectedDayTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    layout
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-sm font-medium leading-none transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        task.completed
                          ? 'line-through text-muted-foreground'
                          : ''
                      }`}
                    >
                      {task.text}
                    </label>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tasks for this day.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
