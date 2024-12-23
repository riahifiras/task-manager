import { Controller, Get, Post, Param, Body, Put, Delete, Patch, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')  
@ApiBearerAuth()   
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created', type: Task })
  create(@Body() task: { title: string; description: string }, @Request() req): Promise<Task> {
    return this.taskService.create(task.title, task.description, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return list of tasks', type: [Task] })
  findAll(@Request() req): Promise<Task[]> {
    return this.taskService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Return task by ID', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: number, @Request() req): Promise<Task> {
    return this.taskService.findOne(id, req.user.userId);
  }
  @Patch(':id') 
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Partially update a task by ID' })
  @ApiResponse({ status: 200, description: 'Task partially updated', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  patch(
    @Param('id') id: number,
    @Body() updateTask: { title?: string; description?: string; status?: 'TODO' | 'IN_PROGRESS' | 'DONE' }, 
    @Request() req,
  ): Promise<Task> {
    return this.taskService.patch(id, updateTask, req.user.userId);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.taskService.remove(id, req.user.userId);
  }
}
