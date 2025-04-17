import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoSummaryComponent } from './components/todo-summary/todo-summary.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'summary', component: TodoSummaryComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
