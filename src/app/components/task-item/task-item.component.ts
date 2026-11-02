import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  private readonly taskService = inject(TaskService);

  isEditing: boolean = false;
  editTitle: string = '';

  toggleComplete(): void {
    this.taskService.toggleTask(this.task.id);
  }

  remove(): void {
    this.taskService.removeTask(this.task.id);
  }

  startEdit(): void {
    this.editTitle = this.task.title;
    this.isEditing = true;
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.taskService.updateTaskTitle(this.task.id, this.editTitle.trim());
    }
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  get priorityLabel(): string {
    switch (this.task.priority) {
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Média';
      case 'baixa':
        return 'Baixa';
      default:
        return 'Média';
    }
  }

  get formattedDate(): string {
    if (!this.task.createdAt) return '';
    const date = new Date(this.task.createdAt);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}

