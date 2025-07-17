// ToDOList.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function ToDOList({ externalTask }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);

  // ✅ Load tasks and theme from localStorage on first render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    setIsLocalStorageReady(true); // ✅ mark ready
  }, []);

  // ✅ Save tasks to localStorage on change
  useEffect(() => {
    if (isLocalStorageReady) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLocalStorageReady]);

  // ✅ Set dark mode class
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // ✅ Add task from externalTask if passed
  useEffect(() => {
    if (externalTask && isLocalStorageReady) {
      setTasks(prev => [...prev, externalTask]);
      toast.success(`✅ Task "${externalTask}" added!`);
    }
  }, [externalTask, isLocalStorageReady]);

  const handleInputChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      toast.success(`✅ "${newTask}" added!`);
      setNewTask('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index]);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex] = editText;
    setTasks(updated);
    toast.success(`✏️ "${editText}" updated`);
    setEditingIndex(null);
  };

  const deleteTask = (i) => {
    const deleted = tasks[i];
    setTasks(tasks.filter((_, idx) => idx !== i));
    toast.error(`🗑️ "${deleted}" deleted`);
  };

  const moveTaskUp = (i) => {
    if (i > 0) {
      const copy = [...tasks];
      [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
      setTasks(copy);
    }
  };

  const moveTaskDown = (i) => {
    if (i < tasks.length - 1) {
      const copy = [...tasks];
      [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
      setTasks(copy);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className='to-do-list'>
      <h1>👨‍🎓 To-Do List</h1>
      <button className='theme-toggle' onClick={toggleTheme}>
        {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      <div className='input-container'>
        <input
          type='text'
          placeholder='Add a new task'
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button className='robot-style-button' onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type='text'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                />
                <button className='save-button' onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span className='text'>{task}</span>
                <button className='edit-button' onClick={() => startEditing(index)}>✒</button>
                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}

            <div className="tooltip-container">
              <button className="priority-high move-button" onClick={() => moveTaskUp(index)}>🚩</button>
              <span className="tooltip-text">High Priority Task</span>
            </div>

            <div className="tooltip-container">
              <button className="priority-low move-button" onClick={() => moveTaskDown(index)}>🏳️</button>
              <span className="tooltip-text">Low Priority Task</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDOList;
