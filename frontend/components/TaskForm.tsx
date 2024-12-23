import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskFormProps {
  task?: Task;
  onComplete: () => void;
}

export function TaskForm({ task, onComplete }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'TODO');

  const queryClient = useQueryClient();

  const createMutation = useMutation(taskService.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      onComplete();
    },
  });

  const updateMutation = useMutation(
    (updatedTask: Partial<Task>) => taskService.updateTask(task!.id, updatedTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        onComplete();
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, status };
    if (task) {
      updateMutation.mutate(newTask);
    } else {
      createMutation.mutate(newTask as Omit<Task, 'id'>);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Select value={status} onValueChange={(value: Task['status']) => setStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
    </form>
  );
}

