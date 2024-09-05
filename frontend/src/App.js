import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // Handle task submission (create or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Edit the task
      const updatedTask = { title, description };
      const response = await fetch(`http://localhost:5000/api/tasks/${currentTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task._id === currentTaskId ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        resetForm();
      }
    } else {
      // Create a new task
      const newTask = { title, description };
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setTitle('');
        setDescription('');
      }
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  // Handle task editing (populate form with task details)
  const handleEdit = (task) => {
    setIsEditing(true);
    setTitle(task.title);
    setDescription(task.description);
    setCurrentTaskId(task._id);
  };

  // Reset the form after editing
  const resetForm = () => {
    setIsEditing(false);
    setTitle('');
    setDescription('');
    setCurrentTaskId(null);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}: {task.description}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
