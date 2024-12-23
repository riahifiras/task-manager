'use client'

import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { Auth } from '../components/Auth';
import { taskService } from '../services/taskService';
import { Button } from '@/components/ui/button';

const queryClient = new QueryClient();

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    taskService.logout();
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Task Management</h1>
        {isAuthenticated ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Task'}
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
            {showForm && <TaskForm onComplete={() => setShowForm(false)} />}
            <TaskList />
          </>
        ) : (
          <Auth onAuthenticated={handleAuthenticated} />
        )}
      </main>
    </QueryClientProvider>
  );
}

