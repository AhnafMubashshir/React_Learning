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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Todo[] {
    return this.appService.getHello();
  }

  @Get('getTodos')
  getTodos(): Todo[] {
    return this.appService.getTodos();
  }

  @Post('storeTodo')
  async storeTodo(@Body() todo: Todo) {
    this.appService.storeTodo(todo);
  }

  @Put('updateTodo/:id')
  async updateTodo(
    @Param('id') id: number,
    @Body() todo: Todo,
  ): Promise<Todo[]> {
    return this.appService.updateTodo(id, todo);
  }

  @Delete('deleteTodo/:id')
  async deleteTodo(@Param('id') id: number): Promise<Todo[]> {
    return this.appService.deleteTodo(id);
  }
}
