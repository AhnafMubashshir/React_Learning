/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './interfaces/todo.interface';
import { TodoDB } from './schemas/todo.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Todo[] {
    return this.appService.getHello();
  }

  @Get('getTodos')
  async getTodos(): Promise<TodoDB[]> {
    return this.appService.getTodos();
  }

  @Post('storeTodo')
  async storeTodo(@Body() todo: TodoDB) {
    this.appService.storeTodo(todo);
  }

  @Put('updateTodo/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: TodoDB,
  ): Promise<TodoDB[]> {
    console.log("ID: ",id);

    return this.appService.updateTodo(id, todo);
  }

  @Delete('deleteTodo/:id')
  async deleteTodo(@Param('id') id: string): Promise<TodoDB[]> {
    return this.appService.deleteTodo(id);
  }
}
