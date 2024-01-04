import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class AppService {
  private todos: Todo[] = [];

  getHello(): Todo[] {
    return this.todos;
  }

  storeTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  updateTodo(id: number, todo: Todo): Todo[] {
    this.todos[id] = todo;
    return this.todos;
  }

  deleteTodo(id: number): Todo[] {
    this.todos.splice(id, 1);
    return this.todos;
  }
}
