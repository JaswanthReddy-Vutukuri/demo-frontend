import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isLoading = false; // Loading flag
  displayedColumns: string[] = ['id', 'title', 'description', 'favorite', 'actions'];
  editIndex: number | null = null;
  editTitle: string = '';
  editDescription: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodosWithFavorites();
  }

  loadTodosWithFavorites() {
    this.isLoading = true;
    forkJoin({
      todos: this.todoService.getTodos(),
      favorites: this.todoService.getFavorites()
    }).subscribe(({ todos, favorites }) => {
      this.isLoading = false;
      const favoriteIds = new Set(favorites.map(f => f.todoId));
      this.todos = todos.map(todo => ({
        ...todo,
        isFavorite: favoriteIds.has(todo.id ?? -1)
      }));
    });
  }

  toggleFavorite(todo: Todo) {
    this.todoService.toggleFavorite(todo.id!).subscribe(() => {
      todo.isFavorite = !todo.isFavorite;
    });
  }

  deleteTodo(id?: number) {
    if (id) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.loadTodosWithFavorites();
      });
    }
  }

  startEdit(index: number, todo: Todo) {
    this.editIndex = index;
    this.editTitle = todo.title;
    this.editDescription = todo.description || '';
  }

  cancelEdit() {
    this.editIndex = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  updateTodo(todo: Todo) {
    todo.title = this.editTitle;
    todo.description = this.editDescription;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.editIndex = null;
      this.loadTodosWithFavorites();
    });
  }

}
