import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() task: { title: string; description: string }, @Request() req): Promise<Task> {
    return this.taskService.create(task.title, task.description, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req): Promise<Task[]> {
    return this.taskService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number, @Request() req): Promise<Task> {
    return this.taskService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateTask: { isCompleted: boolean },
    @Request() req,
  ): Promise<Task> {
    return this.taskService.update(id, updateTask.isCompleted, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.taskService.remove(id, req.user.userId);
  }
}
