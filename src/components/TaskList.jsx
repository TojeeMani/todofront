import "./TaskList.css";
import { useState } from "react";

function TaskList({ tasks, deleteTask, updateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskName(task.task);
  };

  const saveTask = () => {
    updateTask(editingTaskId, editingTaskName);
    setEditingTaskId(null);
    setEditingTaskName("");
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
            {editingTaskId === task._id ? (
              <button onClick={saveTask} className="update-button">
                Update
              </button>
            ) : (
              <button onClick={() => startEditing(task)} className="edit-button">
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
