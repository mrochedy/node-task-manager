import { Request, Response } from "express";
import { getTasks as getAllTasks, addTask as addNewTask, updateTask as modifyTask, deleteTask as removeTask } from "../database/database";
import { Task } from "../models/task";
import { v4 as uuidv4 } from "uuid";

export const getTasks = (_: Request, res: Response): void => {
  res.json(getAllTasks());
};

export const addTask = (req: Request, res: Response): void => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    status: "pending",
    createdAt: new Date(),
  };
  addNewTask(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedTask = modifyTask(id, req.body);
  if (!updatedTask) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const success = removeTask(id);
  if (!success) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.status(204).send();
};
