import { Task } from "../models/task";

const tasks: Task[] = [];

export const getTasks = (): Task[] => tasks;

export const addTask = (task: Task): void => {
  tasks.push(task);
};

export const updateTask = (id: string, updatedTask: Partial<Task>): Task | null => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    Object.assign(task, updatedTask);
    return task;
  }
  return null;
};

export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex(t => t.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};
