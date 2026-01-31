import "./App.css";
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// ========================================
// MAIN APP COMPONENT
// ========================================
function App() {
  // ===================
  // STATE VARIABLES
  // ===================
  
  // All tasks from database
  const [tasks, setTasks] = useState([]);
  
  // Tasks after filtering/searching
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  // Task being edited
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Loading state for API calls
  const [loading, setLoading] = useState(false);
  
  // Error messages
  const [error, setError] = useState("");
  
  // Current filter: "all", "pending", "in-progress", "completed"
  const [filter, setFilter] = useState("all");
  
  // Search term for finding tasks
  const [searchTerm, setSearchTerm] = useState("");

  // ===================
  // API FUNCTIONS
  // ===================
  
  // Get all tasks from database
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      // Call backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new task to database
  const addTask = async (task) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });

      if (!response.ok) throw new Error("Failed to add task");

      // Refresh tasks list
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update existing task
  const updateTask = async (id, task) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });

      if (!response.ok) throw new Error("Failed to update task");

      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete task from database
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/tasks/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Failed to delete task");

      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===================
  // FILTER & SEARCH FUNCTIONS
  // ===================
  
  // Apply filters and search to tasks
  const applyFiltersAndSearch = () => {
    let result = [...tasks];
    
    // Step 1: Apply status filter
    if (filter !== "all") {
      result = result.filter(task => {
        if (filter === "pending") return task.status === "Pending";
        if (filter === "in-progress") return task.status === "In Progress";
        if (filter === "completed") return task.status === "Completed";
        return true;
      });
    }
    
    // Step 2: Apply search filter
    if (searchTerm.trim()) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTasks(result);
  };

  // Auto-apply filters when data changes
  useEffect(() => {
    applyFiltersAndSearch();
  }, [tasks, filter, searchTerm]);

  // Change filter type
  const filterTasks = (filterValue) => {
    setFilter(filterValue);
  };

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  // ===================
  // LOAD DATA ON STARTUP
  // ===================
  useEffect(() => {
    fetchTasks();
  }, []);

  // ===================
  // HELPER FUNCTIONS
  // ===================
  
  // Count tasks by status
  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  // Get button style based on active filter
  const getButtonStyle = (buttonFilter) => {
    const isActive = filter === buttonFilter;
    const colors = {
      all: isActive ? "#007bff" : "#6c757d",
      pending: isActive ? "#ffc107" : "#6c757d", 
      "in-progress": isActive ? "#17a2b8" : "#6c757d",
      completed: isActive ? "#28a745" : "#6c757d"
    };
    
    return {
      margin: '0 5px',
      padding: '8px 16px',
      backgroundColor: colors[buttonFilter],
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    };
  };

  // ===================
  // RENDER UI
  // ===================
  return (
    <div className="container">
      {/* Header */}
      <h1>Task Manager</h1>

      {/* Status Messages */}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Task Form */}
      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        selectedTask={selectedTask}
        loading={loading}
      />

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => filterTasks("all")} style={getButtonStyle("all")}>
          All ({tasks.length})
        </button>
        <button onClick={() => filterTasks("pending")} style={getButtonStyle("pending")}>
          Pending ({getTaskCount("Pending")})
        </button>
        <button onClick={() => filterTasks("in-progress")} style={getButtonStyle("in-progress")}>
          In Progress ({getTaskCount("In Progress")})
        </button>
        <button onClick={() => filterTasks("completed")} style={getButtonStyle("completed")}>
          Completed ({getTaskCount("Completed")})
        </button>
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onEdit={setSelectedTask}
      />
    </div>
  );
}

export default App;
