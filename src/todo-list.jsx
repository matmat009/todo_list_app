import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [completionMessage, setCompletionMessage] = useState();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, completed: false, isEditing: false }];
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    setCompletionMessage("Task marked as complete!");
    setTimeout(() => setCompletionMessage(""), 2000);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, isEditing: true } : task)));
  };

  const saveTask = (index, newText) => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, text: newText, isEditing: false } : task)));
  };

  const handleFilterChange = (filterType) => setFilter(filterType);

  const filteredTasks = tasks.filter((task) =>
    filter === "completed" ? task.completed : filter === "pending" ? !task.completed : true
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">Mat</div>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="todo-wrapper">
        <div className="todo-title-box">
          <h1 className="todo-title">TO DO <br /> LIST</h1>
        </div>

        <div className="todo-container">
          <div className="task-input">
            <input
              type="text"
              placeholder="Enter task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <div className="filters">
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("completed")}>Completed</button>
            <button onClick={() => handleFilterChange("pending")}>Pending</button>
          </div>

          <ul className="task-list">
            {filteredTasks.map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                {task.isEditing ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      defaultValue={task.text}
                      className="edit-input"
                      onBlur={(e) => saveTask(index, e.target.value)}
                      autoFocus
                    />
                    <button className="save-button" onClick={() => saveTask(index, task.text)}>Save</button>
                  </div>
                ) : (
                  <>
                    <span onClick={() => toggleComplete(index)}>{task.text}</span>
                    <div className="task-buttons">
                      <button onClick={() => toggleComplete(index)}>Complete</button>
                      <button onClick={() => startEditing(index)}>Edit</button>
                      <button onClick={() => deleteTask(index)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {completionMessage && <p className="completion-message">{completionMessage}</p>}
        </div>
      </div>

      <footer className="app-footer">
        <div className="footer-left">
          <p>by Matheo Jay U. Fabre</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
