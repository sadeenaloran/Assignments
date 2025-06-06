import React, { useState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Add new todo with title and description
  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        completed: false,
      },
    ]);
    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="new-todo">
        <h2>New To-Do</h2>
        <form onSubmit={handleNewTodoSubmit}>
          <label htmlFor="todo-title">Title</label>
          <br />
          <input
            id="todo-title"
            type="text"
            placeholder="Enter new title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="todo-description">Description</label>
          <br />
          <input
            id="todo-description"
            type="text"
            placeholder="Enter new description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                fontWeight: "bold",
              }}
              onClick={() => toggleComplete(todo.id)}
              className="todo-text"
            >
              {todo.title}
            </span>
            <div>{todo.description}</div>
            <br />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
