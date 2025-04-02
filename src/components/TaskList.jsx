import "./TaskList.css";
import { useState } from "react";

function TaskList({ tasks, deleteTask, setTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const updateTask = async (taskId, taskName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in updateTask:", error.message);
      throw error;
    }
  };

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
        console.error("Error saving task:", error.message); // Log the error message
        alert(
          `Failed to save the task. ${
            error.response?.data?.error || error.message || "Please try again later."
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

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  // Update the task in the database
  const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });

  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(updatedTask);
});
