import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    patch: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        JwtAuthGuard, // Mock JwtAuthGuard if needed
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'Task description' };
      const createdTask = new Task();
      createdTask.id = 1;
      createdTask.title = 'New Task';
      createdTask.description = 'Task description';
      mockTaskService.create.mockResolvedValue(createdTask);

      expect(await taskController.create(newTask, { user: { userId: 1 } })).toEqual(createdTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [new Task(), new Task()];
      mockTaskService.findAll.mockResolvedValue(tasks);

      expect(await taskController.findAll({ user: { userId: 1 } })).toBe(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task = new Task();
      task.id = 1;
      task.title = 'Task 1';
      task.description = 'Task 1 description';
      mockTaskService.findOne.mockResolvedValue(task);

      expect(await taskController.findOne(1, { user: { userId: 1 } })).toBe(task);
    });
  });

  describe('update', () => {
    it('should update a task status', async () => {
      const updatedTask = new Task();
      updatedTask.id = 1;
      updatedTask.title = 'Task 1';
      updatedTask.description = 'Updated description';
      updatedTask.status = 'DONE';
  
      mockTaskService.patch.mockResolvedValue(updatedTask);
  
      const patchData: { status: 'TODO' | 'IN_PROGRESS' | 'DONE' } = { status: 'DONE' };
  
      expect(await taskController.patch(1, patchData, { user: { userId: 1 } })).toEqual(updatedTask);
      expect(mockTaskService.patch).toHaveBeenCalledWith(1, patchData, 1);
    });
  });
  

  describe('remove', () => {
    it('should remove a task', async () => {
      mockTaskService.remove.mockResolvedValue(undefined);

      await expect(taskController.remove(1, { user: { userId: 1 } })).resolves.toBeUndefined();
    });
  });
});
