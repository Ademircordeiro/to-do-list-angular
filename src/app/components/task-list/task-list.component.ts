import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  readonly tasks = this.taskService.filteredTasks;
  readonly filter = this.taskService.filter;
  readonly searchQuery = this.taskService.searchQuery;

  get emptyStateMessage(): string {
    if (this.searchQuery().trim()) {
      return `Nenhuma tarefa encontrada para "${this.searchQuery()}".`;
    }

    switch (this.filter()) {
      case 'concluidas':
        return 'Nenhuma tarefa concluída ainda. Marque uma tarefa quando finalizar!';
      case 'pendentes':
        return 'Parabéns! Nenhuma tarefa pendente no momento.';
      default:
        return 'Sua lista de tarefas está vazia. Adicione uma atividade acima para começar!';
    }
  }
}

