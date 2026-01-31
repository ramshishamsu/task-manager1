import { useEffect, useState } from "react";

function TaskForm({ onAdd, onUpdate, selectedTask, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.status);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    if (!description.trim()) {
      alert("Description is required!");
      return;
    }

    const taskData = { 
      title: title.trim(), 
      description: description.trim(), 
      status 
    };

    if (selectedTask) {
      onUpdate(selectedTask._id, taskData);
    } else {
      onAdd(taskData);
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button type="submit" disabled={loading}>
        {selectedTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
