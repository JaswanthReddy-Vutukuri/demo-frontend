import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.css']
})
export class TodoSummaryComponent implements OnInit {
  totalTodos = 0;
  totalFavorites = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    forkJoin({
      todos: this.todoService.getTodos(),
      favorites: this.todoService.getFavorites()
    }).subscribe(({ todos, favorites }) => {
      this.totalTodos = todos.length;
      // Count how many todos are favorites by matching IDs
      const favoriteIds = new Set(favorites.map(f => f.todoId));
      this.totalFavorites = todos.filter(todo => favoriteIds.has(todo.id ?? -1)).length;
    });
  }
}
