import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from './TaskForm';

export function TaskList() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery('tasks', taskService.getTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const deleteMutation = useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    queryClient.invalidateQueries('tasks');
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div className="space-y-4">
      {tasks?.map((task: Task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {task.title}
              <Badge>{task.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => handleEdit(task)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteMutation.mutate(task.id)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {editingTask && (
        <TaskForm task={editingTask} onComplete={handleEditComplete} />
      )}
    </div>
  );
}
