import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  newTodo: Todo = { title: '', description: '' };

  // Use event emitter to notify parent component
  @Output() todoAdded = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.newTodo.title.trim()) {
      this.todoService.addTodo(this.newTodo).subscribe(() => {
        this.newTodo = { title: '', description: '' };
        this.todoAdded.emit(); // Notify parent to refresh list
      });
    }
  }
}
