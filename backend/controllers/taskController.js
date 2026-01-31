import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

// READ
export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// UPDATE
export const updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
};

// DELETE
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
