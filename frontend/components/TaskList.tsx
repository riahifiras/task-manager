import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from './TaskForm';
import { cn } from '@/lib/utils';

export function TaskList() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery('tasks', taskService.getTasks);

  const deleteMutation = useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleEditComplete = () => {
    queryClient.invalidateQueries('tasks');
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'TODO':
        return 'bg-yellow-200 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-200 text-blue-800';
      case 'DONE':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div className="space-y-4">
      {tasks?.slice().reverse().map((task: Task) => (
        <Card key={task.id} className={cn(
          "border-l-4",
          task.status === 'TODO' && "border-l-yellow-500",
          task.status === 'IN_PROGRESS' && "border-l-blue-500",
          task.status === 'DONE' && "border-l-green-500"
        )}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className={cn(
                task.status === 'DONE' && "line-through text-gray-500"
              )}>
                {task.title}
              </span>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn(
              "mb-4",
              task.status === 'DONE' && "line-through text-gray-500"
            )}>
              {task.description}
            </p>
            <div className="flex justify-end space-x-2">
              <TaskForm
                task={task}
                onComplete={handleEditComplete}
                trigger={<Button variant="outline">Edit</Button>}
              />
              <Button variant="destructive" onClick={() => deleteMutation.mutate(task.id)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

