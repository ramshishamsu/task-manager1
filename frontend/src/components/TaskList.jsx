function TaskList({ tasks, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-card" style={{ textAlign: 'center', padding: '20px' }}>
        <p>No tasks found. Add your first task!</p>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskList;
