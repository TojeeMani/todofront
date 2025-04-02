import "./TaskList.css";
import { useState } from "react";

function TaskList({ tasks, deleteTask, updateTask, setTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskName(task.task);
  };

  const saveTask = async () => {
    if (editingTaskName.trim()) {
      try {
        console.log("Saving task:", { id: editingTaskId, name: editingTaskName });
        await updateTask(editingTaskId, editingTaskName); // Ensure this function works correctly
        const updatedTasks = tasks.map((task) =>
          task._id === editingTaskId ? { ...task, task: editingTaskName } : task
        );
        console.log("Updated tasks:", updatedTasks);
        setTasks(updatedTasks); // Update the parent state
        setEditingTaskId(null);
        setEditingTaskName("");
      } catch (error) {
        console.error("Error saving task:", error.response?.data || error.message);
        alert(
          `Failed to save the task. ${
            error.response?.data?.error || "Please try again later."
          }`
        );
      }
    } else {
      alert("Task name cannot be empty.");
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className="task-item">
          {editingTaskId === task._id ? (
            <input
              value={editingTaskName}
              onChange={(e) => {
                console.log("Editing task name:", e.target.value); // Debugging input changes
                setEditingTaskName(e.target.value);
              }}
            />
          ) : (
            <span>{task.task}</span>
          )}
          <div className="task-actions">
            {editingTaskId === task._id ? (
              <>
                <button onClick={saveTask} className="update-button">
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingTaskId(null);
                    setEditingTaskName("");
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => startEditing(task)}
                className="edit-button"
              >
                Edit
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
