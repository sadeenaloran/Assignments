import React, { useState } from 'react';
import ToDoList from './pages/TodoList/components/ToDoList';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <ToDoList />
    </div>
  );
}

export default App;