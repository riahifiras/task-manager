import { useState } from 'react';
import { useMutation } from 'react-query';
import { taskService } from '../services/taskService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthProps {
  onAuthenticated: () => void;
}

export function Auth({ onAuthenticated }: AuthProps) {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');

  const loginMutation = useMutation(
    () => taskService.login(username, password),  
    {
      onSuccess: () => {
        onAuthenticated();
      },
    }
  );

  const signupMutation = useMutation(
    () => taskService.signup(username, password),  
    {
      onSuccess: () => {
        onAuthenticated();
      },
    }
  );

  const handleSubmit = (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate();
    } else {
      signupMutation.mutate();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <Input
                type="text"  
                placeholder="Username"  
                value={username}  
                onChange={(e) => setUsername(e.target.value)}  
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <Input
                type="text"  
                placeholder="Username"  
                value={username}  
                onChange={(e) => setUsername(e.target.value)}  
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                {signupMutation.isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
