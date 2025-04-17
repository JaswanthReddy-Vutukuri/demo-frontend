import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  isFavorite?: boolean; // Indicates favorite status
  editingTitle?: boolean;
  editingDescription?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private crudUrl = 'http://localhost:3000/todos';
  private favoritesUrl = 'http://localhost:3001/favorites';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.crudUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.crudUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.crudUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.crudUrl}/${id}`);
  }

  getFavorites(): Observable<{ todoId: number }[]> {
    return this.http.get<{ todoId: number }[]>(this.favoritesUrl);
  }

  toggleFavorite(todoId: number): Observable<any> {
    return this.http.post(`${this.favoritesUrl}/${todoId}`, {});
  }
}

