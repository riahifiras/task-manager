import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(title: string, description: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ title, description, userId });
    return this.taskRepository.save(task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id, userId } });
  }

  async update(id: number, isCompleted: boolean, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (task) {
      task.isCompleted = isCompleted;
      return this.taskRepository.save(task);
    }
    throw new Error('Task not found');
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (task) {
      await this.taskRepository.delete(id);
    }
  }
}
