/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodoDB } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(TodoDB.name) private todoModel: Model<TodoDB>) {}

  private todos: Todo[] = [];

  getHello(): Todo[] {
    return this.todos;
  }

  async storeTodo(todo: Todo): Promise<void> {
    try {
      const createdTodo = new this.todoModel(todo);
      await createdTodo.save();
      console.log('Todo saved:', createdTodo);

      this.todos.push(todo);
    } catch (error) {
      throw new InternalServerErrorException('Error saving todo');
    }
  }

  async getTodos(): Promise<TodoDB[]> {
    try {
      return await this.todoModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todos');
    }
  }  

  async updateTodo(id: string, todo: TodoDB): Promise<TodoDB[]> {
    const existingTodo = await this.todoModel.findById(id);

    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    existingTodo.todo = todo.todo;
    await existingTodo.save();

    const updatedTodos = await this.getTodos();
    // this.todos[id] = todo;
    return updatedTodos;
  }

  async deleteTodo(id: string): Promise<TodoDB[]> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const updatedTodos = await this.getTodos();
    // this.todos.splice(id, 1);
    return updatedTodos;
  }
}
