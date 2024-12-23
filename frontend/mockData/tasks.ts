import { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Draft and submit the project proposal for the new client',
    status: 'TODO',
  },
  {
    id: 2,
    title: 'Review pull requests',
    description: 'Go through open pull requests and provide feedback',
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    title: 'Update documentation',
    description: 'Update the API documentation with recent changes',
    status: 'DONE',
  },
];

