import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    TaskFormComponent,
    TaskFilterComponent,
    TaskListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
