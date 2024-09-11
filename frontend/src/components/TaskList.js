import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TaskList = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks for the authenticated user
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.log('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle task creation and editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (isEditing) {
      // Update existing task
      const updatedTask = { title, description };
      const response = await fetch(`http://localhost:5000/api/tasks/${currentTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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

  // Handle task deletion with improved error handling
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted task from the tasks state
        setTasks(tasks.filter((task) => task._id !== id));
        console.log('Task deleted successfully');
      } else {
        console.log('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle task editing
  const handleEdit = (task) => {
    setIsEditing(true);
    setTitle(task.title);
    setDescription(task.description);
    setCurrentTaskId(task._id);
  };

  // Reset form after editing
  const resetForm = () => {
    setIsEditing(false);
    setTitle('');
    setDescription('');
    setCurrentTaskId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{isEditing ? 'Edit Task' : 'Task Manager'}</h2>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>

        {/* Cancel Edit Button */}
        {isEditing && (
          <div className="text-center mt-3">
            <button className="btn btn-warning" onClick={resetForm}>
              Cancel Edit
            </button>
          </div>
        )}
      </form>

      {/* Task List */}
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong>: {task.description}
              </div>
              <div>
                <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item text-center">No tasks found.</li>
        )}
      </ul>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/welcome')}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default TaskList;
