import { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
// Backend URL variable
// const BACKEND_URL = "http://localhost:5000"; // for local development
const BACKEND_URL = "https://todoback-lzys.onrender.com"; // for deployment

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a task to the backend
  const addTask = async (newTask) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/tasks`, {
        task: newTask,
      });
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task from the backend
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update a task in the backend
  const updateTask = async (id, updatedTaskName) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/tasks/${id}`, { task: updatedTaskName }); // Ensure 'task' is sent
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task // Use the updated task from the response
        )
      );
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message); // Log detailed error
      throw error; // Propagate the error to handle it in the caller
    }
  };

  return (
    <div className="app-container">
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
}

export default App;
