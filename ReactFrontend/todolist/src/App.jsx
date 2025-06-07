import React, { useState } from 'react';
import Todolist from './pages/components/Todolist.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <Todolist />
    </div>
  );
}

export default App;