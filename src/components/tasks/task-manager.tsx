'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '../ui/checkbox';

const initialTasks = [
  { id: 1, text: 'Calibrate irrigation sensors', date: new Date(), completed: false },
  { id: 2, text: 'Scout Field A for pests', date: new Date(), completed: true },
  { id: 3, text: 'Analyze soil sample results', date: new Date(new Date().setDate(new Date().getDate() + 2)), completed: false },
];

export function TaskManager() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [tasks, setTasks] = React.useState(initialTasks);

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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus />
                <span className="sr-only">Add Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Enter the details for your new task below. It will be added to the selected date.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="task-name" className="text-right">
                    Task
                  </Label>
                  <Input id="task-name" placeholder="e.g., Check fertilizer levels" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDayTasks.length > 0 ? (
              selectedDayTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3">
                  <Checkbox id={`task-${task.id}`} checked={task.completed} />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      task.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {task.text}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tasks for this day.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
