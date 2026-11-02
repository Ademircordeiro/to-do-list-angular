import { Injectable, computed, signal } from '@angular/core';
import { Task, TaskFilter, TaskPriority } from '../models/task.model';

const STORAGE_KEY = 'todo_angular_tasks_v1';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Aprender conceitos fundamentais do Angular',
    completed: true,
    priority: 'alta',
    category: 'Estudos',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Construir a interface da lista de tarefas',
    completed: false,
    priority: 'alta',
    category: 'Projeto',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Organizar código em componentes reutilizáveis',
    completed: false,
    priority: 'media',
    category: 'Arquitetura',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Revisar estilização e responsividade',
    completed: false,
    priority: 'baixa',
    category: 'Design',
    createdAt: new Date().toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSignal = signal<Task[]>(this.loadFromStorage());
  readonly filter = signal<TaskFilter>('todas');
  readonly searchQuery = signal<string>('');

  // Sinais públicos computados
  readonly tasks = this.tasksSignal.asReadonly();

  readonly filteredTasks = computed(() => {
    const list = this.tasksSignal();
    const activeFilter = this.filter();
    const query = this.searchQuery().trim().toLowerCase();

    return list.filter((task) => {
      // Filtro de status
      const matchesStatus =
        activeFilter === 'todas'
          ? true
          : activeFilter === 'concluidas'
          ? task.completed
          : !task.completed;

      // Filtro de busca por texto (título ou categoria)
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        (task.category && task.category.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const all = this.tasksSignal();
    const total = all.length;
    const completed = all.filter((t) => t.completed).length;
    const pending = total - completed;
    const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, pending, progressPercent };
  });

  constructor() {}

  addTask(title: string, priority: TaskPriority = 'media', category: string = 'Geral'): void {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: cleanTitle,
      completed: false,
      priority,
      category: category.trim() || 'Geral',
      createdAt: new Date().toISOString(),
    };

    const updated = [newTask, ...this.tasksSignal()];
    this.updateTasks(updated);
  }

  toggleTask(id: string): void {
    const updated = this.tasksSignal().map((task) => {
      if (task.id === id) {
        const isNowCompleted = !task.completed;
        return {
          ...task,
          completed: isNowCompleted,
          completedAt: isNowCompleted ? new Date().toISOString() : undefined,
        };
      }
      return task;
    });
    this.updateTasks(updated);
  }

  removeTask(id: string): void {
    const updated = this.tasksSignal().filter((task) => task.id !== id);
    this.updateTasks(updated);
  }

  updateTaskTitle(id: string, newTitle: string): void {
    const cleanTitle = newTitle.trim();
    if (!cleanTitle) return;

    const updated = this.tasksSignal().map((task) => {
      if (task.id === id) {
        return { ...task, title: cleanTitle };
      }
      return task;
    });
    this.updateTasks(updated);
  }

  clearCompleted(): void {
    const updated = this.tasksSignal().filter((task) => !task.completed);
    this.updateTasks(updated);
  }

  setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  private updateTasks(tasks: Task[]): void {
    this.tasksSignal.set(tasks);
    this.saveToStorage(tasks);
  }

  private loadFromStorage(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback em caso de erro no parse ou ambiente sem localStorage
    }
    return INITIAL_TASKS;
  }

  private saveToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignora falhas de gravação em storage
    }
  }
}

