// Modify ToDOList.jsx
import React, { useState, useEffect } from 'react';

function ToDOList({ externalTask }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (externalTask) {
      setTasks(prev => [...prev, externalTask]);
    }
  }, [externalTask]);

  const handleInputChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));
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

  return (
    <div className='to-do-list'>
      <h1>👨‍🎓To-Do List</h1>
      <div className='input-container'>
        <input type='text' placeholder='Add a new task' value={newTask} onChange={handleInputChange} />
        <button className='add-button' onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className='text'>{task}</span>
            <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
            <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
            <button className='move-button' onClick={() => moveTaskDown(index)}>Down</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDOList;
