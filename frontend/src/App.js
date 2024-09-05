import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}: {task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
