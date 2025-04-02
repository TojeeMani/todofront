import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get("http://localhost:5000/api/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("http://localhost:5000/api/tasks", { name: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask("");
    });
  };

  const updateTask = (id, completed) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { completed }).then(() => {
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed } : task
        )
      );
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task._id, e.target.checked)}
            />
            {task.name}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
