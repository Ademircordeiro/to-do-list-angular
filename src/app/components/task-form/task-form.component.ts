import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  private readonly taskService = inject(TaskService);

  title: string = '';
  category: string = 'Geral';
  priority: TaskPriority = 'media';
  showCategoryCustom: boolean = false;
  hasError: boolean = false;

  readonly defaultCategories = ['Geral', 'Estudos', 'Trabalho', 'Pessoal', 'Saúde'];

  setPriority(p: TaskPriority): void {
    this.priority = p;
  }

  setCategory(c: string): void {
    this.category = c;
    this.showCategoryCustom = false;
  }

  enableCustomCategory(): void {
    this.showCategoryCustom = true;
    this.category = '';
  }

  onSubmit(): void {
    const cleanTitle = this.title.trim();
    if (!cleanTitle) {
      this.hasError = true;
      return;
    }

    const finalCategory = this.category.trim() || 'Geral';
    this.taskService.addTask(cleanTitle, this.priority, finalCategory);

    // Reset
    this.title = '';
    this.hasError = false;
  }

  onInputChange(): void {
    if (this.hasError && this.title.trim()) {
      this.hasError = false;
    }
  }
}

