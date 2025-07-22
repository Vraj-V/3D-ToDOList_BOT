import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ToDOList({ externalTask }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [completingIndex, setCompletingIndex] = useState(null);
  const [lastExternalTask, setLastExternalTask] = useState(null);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedCompleted = localStorage.getItem('completedTasks');
    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
    setIsLocalStorageReady(true);
  }, []);

  useEffect(() => {
    if (isLocalStorageReady) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLocalStorageReady]);

  useEffect(() => {
    if (isLocalStorageReady) {
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  }, [completedTasks, isLocalStorageReady]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (
      externalTask &&
      isLocalStorageReady &&
      externalTask !== lastExternalTask
    ) {
      setLastExternalTask(externalTask);
      // Command parsing: add, delete, edit, complete (by number or by name)
      const input = externalTask.trim();
      const lowerInput = input.toLowerCase();
      const matchByNumber = (cmd, arr) => {
        // e.g. delete 2
        const idx = parseInt(arr[1], 10) - 1;
        return idx;
      };
      const matchByName = (cmd, arr) => {
        // e.g. delete rose
        const name = arr.slice(1).join(' ').toLowerCase();
        return tasks.findIndex(t => t.text.toLowerCase() === name);
      };

      if (/^add\s+/i.test(input)) {
        // add Task name
        const name = input.replace(/^add\s+/i, '');
        if (name) {
          const taskObj = {
            text: name,
            dueDate: new Date().toISOString(),
          };
          setTasks(prev => [...prev, taskObj]);
          toast.success(`✅ Task "${name}" added!`);
        }
      } else if (/^delete\s+/i.test(lowerInput)) {
        // delete by number or name
        const arr = input.split(/\s+/);
        let idx = -1;
        if (arr.length === 2 && !isNaN(arr[1])) {
          idx = matchByNumber('delete', arr);
        } else if (arr.length >= 2) {
          idx = matchByName('delete', arr);
        }
        setTasks(prev => {
          if (idx >= 0 && idx < prev.length) {
            toast.error(`🗑️ "${prev[idx].text}" deleted`);
            return prev.filter((_, i) => i !== idx);
          } else {
            toast.error('❌ Invalid task for delete');
            return prev;
          }
        });
      } else if (/^edit\s+/i.test(lowerInput)) {
        // edit by number or name
        const arr = input.split(/\s+/);
        let idx = -1;
        let newName = '';
        if (arr.length >= 3 && !isNaN(arr[1])) {
          idx = matchByNumber('edit', arr);
          newName = arr.slice(2).join(' ');
        } else if (arr.length >= 3) {
          idx = matchByName('edit', arr);
          newName = arr.slice(2).join(' ');
        }
        setTasks(prev => {
          if (idx >= 0 && idx < prev.length && newName) {
            const updated = [...prev];
            updated[idx].text = newName;
            toast.success(`✏️ "${newName}" updated`);
            return updated;
          } else {
            toast.error('❌ Invalid edit command');
            return prev;
          }
        });
      } else if (/^complete\s+/i.test(lowerInput)) {
        // complete by number or name
        const arr = input.split(/\s+/);
        let idx = -1;
        if (arr.length === 2 && !isNaN(arr[1])) {
          idx = matchByNumber('complete', arr);
        } else if (arr.length >= 2) {
          idx = matchByName('complete', arr);
        }
        setTasks(prev => {
          if (idx >= 0 && idx < prev.length) {
            const taskToMove = prev[idx];
            const now = new Date();
            const due = new Date(taskToMove.dueDate);
            const onTime = now <= due;
            setCompletedTasks(ct => [...ct, { ...taskToMove, completedOnTime: onTime }]);
            toast.success(`✅ "${taskToMove.text}" completed!`);
            return prev.filter((_, i) => i !== idx);
          } else {
            toast.error('❌ Invalid task for complete');
            return prev;
          }
        });
      } else {
        // Default: add as new task with current date as dueDate
        const taskObj = {
          text: externalTask,
          dueDate: new Date().toISOString(),
        };
        setTasks(prev => [...prev, taskObj]);
        toast.success(`✅ Task "${externalTask}" added!`);
      }
    }
  }, [externalTask, isLocalStorageReady, tasks, lastExternalTask]);

  const handleInputChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (!newTask.trim()) return;
    if (!taskDueDate) {
      alert('⚠️ Please select a due date.');
      return;
    }

    const taskObj = {
      text: newTask,
      dueDate: taskDueDate.toISOString(),
    };

    setTasks([...tasks, taskObj]);
    toast.success(`✅ "${newTask}" added!`);
    setNewTask('');
    setTaskDueDate(null);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex].text = editText;
    setTasks(updated);
    toast.success(`✏️ "${editText}" updated`);
    setEditingIndex(null);
  };

  const deleteTask = (i) => {
    const deleted = tasks[i].text;
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

  const handleComplete = (index) => {
    setCompletingIndex(index);
    setTimeout(() => {
      const taskToMove = tasks[index];
      const now = new Date();
      const due = new Date(taskToMove.dueDate);
      const onTime = now <= due;
      setCompletedTasks(prev => [...prev, { ...taskToMove, completedOnTime: onTime }]);
      setTasks(prev => prev.filter((_, i) => i !== index));
      setCompletingIndex(null);
    }, 500); // match animation duration
  };

  const getTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    if (diff <= 0) return '⏰ Today';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `⏳ ${hours}h ${minutes}m left`;
  };


React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return () => clearInterval(interval);
}, []);

const clockStyle = {
  position: 'fixed',
  top: '10px',
  right: '20px',
  fontSize: '1.6rem',
  fontFamily: 'Orbitron, monospace',
  fontWeight: 'bold',
color: isDarkMode ? '#ff00ff' : 'goldenrod',

  backgroundSize: '200% 200%',
  backgroundPosition: 'center',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: isDarkMode ?'white':'black',
  webkitTextBold: 'bold',

  padding: '10px 16px',
  borderRadius: '10px',
  zIndex: 1000,
  backgroundColor: isDarkMode ? '#111' : '#fff',
  border: isDarkMode ? '1px solid #ff00ff' : '1px solid goldenrod',
  boxShadow: isDarkMode ? '0 0 8px #ff00ff' : '0 0 8px goldenrod',
  textAlign: 'center'
};

  return (
    <>
    <div style={clockStyle}>
  {currentTime.toLocaleTimeString('en-GB', { hour12: false })}
</div>
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
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <DatePicker
              selected={taskDueDate}
              onChange={(date) => setTaskDueDate(date)}
              placeholderText='🕰 Date'
              className='datepicker-input'
              popperPlacement='bottom'
            />
            <span className='calendar' style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '20px',
              color: '#8f00ff',
              zIndex: 2
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/>
              </svg>
            </span>
          </div>
          <button className='robot-style-button' onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={completingIndex === index ? 'task-completing' : ''}
            >
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
                  <div className='task-text'>
                    <input
                      type='checkbox'
                      checked={false}
                      onChange={() => handleComplete(index)}
                    />
                    <span className='enter-task'>{task.text}</span>
                    <span className='due-date'>{getTimeLeft(task.dueDate)}</span>
                  </div>
                  <button className='edit-button' onClick={() => startEditing(index)}>✒</button>
                  <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                </>
              )}
              <div className='tooltip-container'>
                <button className='priority-high move-button' onClick={() => moveTaskUp(index)}>🚩</button>
                <span className='tooltip-text'>High Priority Task</span>
              </div>
              <div className='tooltip-container'>
                <button className='priority-low move-button' onClick={() => moveTaskDown(index)}>🏳️</button>
                <span className='tooltip-text'>Low Priority Task</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {completedTasks.length > 0 && (
        <div className='completed-tasks'>
          <div className='completed-tasks-header'>
            <div className='completed-tasks-title'>
              <h3>✅ Done</h3>
              <button className='Remove-tasks' onClick={() => {
                setCompletedTasks([]);
                localStorage.removeItem('completedTasks');
              }}>Clear</button>
            </div>
            <ul>
              {completedTasks.map((task, index) => (
                <li key={`done-${index}`} className='completed'>
                  <span>{task.text}</span>
                  <span className='completion-status'>
                    {task.completedOnTime ? '🎉 On Time' : '⏰ Today'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );

}

export default ToDOList;
