import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial tasks', () => {
    expect(service.tasks().length).toBeGreaterThan(0);
  });

  it('should add a new task', () => {
    const initialCount = service.tasks().length;
    service.addTask('Nova tarefa teste', 'alta', 'Testes');

    const updated = service.tasks();
    expect(updated.length).toBe(initialCount + 1);
    expect(updated[0].title).toBe('Nova tarefa teste');
    expect(updated[0].priority).toBe('alta');
    expect(updated[0].category).toBe('Testes');
    expect(updated[0].completed).toBe(false);
  });

  it('should not add a task with empty title', () => {
    const initialCount = service.tasks().length;
    service.addTask('   ');
    expect(service.tasks().length).toBe(initialCount);
  });

  it('should toggle task completion', () => {
    const target = service.tasks()[0];
    const initialCompleted = target.completed;

    service.toggleTask(target.id);
    const updated = service.tasks().find((t) => t.id === target.id);
    expect(updated?.completed).toBe(!initialCompleted);
  });

  it('should remove a task', () => {
    const target = service.tasks()[0];
    const countBefore = service.tasks().length;

    service.removeTask(target.id);
    const updated = service.tasks();
    expect(updated.length).toBe(countBefore - 1);
    expect(updated.find((t) => t.id === target.id)).toBeUndefined();
  });

  it('should update task title', () => {
    const target = service.tasks()[0];
    service.updateTaskTitle(target.id, 'Título Atualizado');

    const updated = service.tasks().find((t) => t.id === target.id);
    expect(updated?.title).toBe('Título Atualizado');
  });

  it('should filter tasks by status and search query', () => {
    service.setFilter('concluidas');
    const completedTasks = service.filteredTasks();
    expect(completedTasks.every((t) => t.completed)).toBe(true);

    service.setFilter('pendentes');
    const pendingTasks = service.filteredTasks();
    expect(pendingTasks.every((t) => !t.completed)).toBe(true);

    service.setFilter('todas');
    service.setSearchQuery('Estudos');
    const searchResult = service.filteredTasks();
    expect(searchResult.every((t) => 
      t.title.toLowerCase().includes('estudos') || 
      (t.category && t.category.toLowerCase().includes('estudos'))
    )).toBe(true);
  });

  it('should calculate stats correctly', () => {
    const stats = service.stats();
    expect(stats.total).toBe(stats.completed + stats.pending);
    expect(stats.progressPercent).toBe(Math.round((stats.completed / stats.total) * 100));
  });

  it('should clear completed tasks', () => {
    service.clearCompleted();
    const remaining = service.tasks();
    expect(remaining.every((t) => !t.completed)).toBe(true);
    expect(service.stats().completed).toBe(0);
  });
});
