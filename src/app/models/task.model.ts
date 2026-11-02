export type TaskPriority = 'baixa' | 'media' | 'alta';

export type TaskFilter = 'todas' | 'pendentes' | 'concluidas';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  category?: string;
  createdAt: string; // ISO string
  completedAt?: string;
}

