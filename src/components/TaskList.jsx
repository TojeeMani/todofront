import "./TaskList.css";
import { useState } from "react";

function TaskList({ tasks, deleteTask, updateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskName(task.task);
  };

  const saveTask = async () => {
    if (editingTaskName.trim()) {
      try {
        await updateTask(editingTaskId, editingTaskName); // Ensure the correct parameters are passed
        setEditingTaskId(null);
        setEditingTaskName("");
      } catch (error) {
        console.error("Error saving task:", error.response || error.message); // Log the error for debugging
        alert("Failed to save the task. Please try again later.");
      }
    } else {
      alert("Task name cannot be empty."); // Add validation for empty task names
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className="task-item">
          {editingTaskId === task._id ? (
            <input
              value={editingTaskName}
              onChange={(e) => setEditingTaskName(e.target.value)}
            />
          ) : (
            <span>{task.task}</span>
          )}
          <div className="task-actions">
            <button
              onClick={() => startEditing(task)}
              className="edit-button"
            >
              Edit
            </button>
            {editingTaskId === task._id && (
              <button onClick={saveTask} className="update-button">
                Save
              </button>
            )}
            <button
              onClick={() => deleteTask(task._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
