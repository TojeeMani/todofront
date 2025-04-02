import React, { useState } from 'react';
import { updateTodo } from '../api/todoApi';

// ...existing code...

const TodoList = ({ todos, setTodos }) => {
    const [editTodo, setEditTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleEdit = (todo) => {
        setEditTodo(todo);
        setEditTitle(todo.title);
    };

    const handleUpdate = async () => {
        try {
            const updatedTodo = await updateTodo(editTodo._id, {
                title: editTitle,
                completed: editTodo.completed,
            });

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === updatedTodo._id ? updatedTodo : todo
                )
            );

            setEditTodo(null);
            setEditTitle('');
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    {editTodo && editTodo._id === todo._id ? (
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    ) : (
                        <span>{todo.title}</span>
                    )}
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    {editTodo && editTodo._id === todo._id && (
                        <button onClick={handleUpdate}>Save</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
