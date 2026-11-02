import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskFilter } from '../../models/task.model';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css',
})
export class TaskFilterComponent {
  private readonly taskService = inject(TaskService);

  readonly currentFilter = this.taskService.filter;
  readonly stats = this.taskService.stats;
  searchQuery: string = '';

  setFilter(filter: TaskFilter): void {
    this.taskService.setFilter(filter);
  }

  onSearchChange(): void {
    this.taskService.setSearchQuery(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.taskService.setSearchQuery('');
  }

  clearCompleted(): void {
    if (confirm('Tem certeza que deseja remover todas as tarefas concluídas?')) {
      this.taskService.clearCompleted();
    }
  }
}

