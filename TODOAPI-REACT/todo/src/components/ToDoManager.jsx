import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const ToDoManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    status: 'Pending',
    dueDate: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedTask, setFetchedTask] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/todoapi`;

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setTasks(res.data);
    } catch (error) {
      setMessage('Failed to fetch tasks.');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in task) {
      if (!task[key] || task[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addTask = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, task);
      setMessage('Task added successfully.');
      fetchAllTasks();
      resetForm();
    } catch (error) {
      setMessage('Error adding task.');
    }
  };

  const updateTask = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, task);
      setMessage('Task updated successfully.');
      fetchAllTasks();
      resetForm();
    } catch (error) {
      setMessage('Error updating task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllTasks();
    } catch (error) {
      setMessage('Error deleting task.');
    }
  };

  const getTaskById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedTask(res.data);
      setMessage('');
    } catch (error) {
      setFetchedTask(null);
      setMessage('Task not found.');
    }
  };

  const handleEdit = (tsk) => {
    setTask(tsk);
    setEditMode(true);
    setMessage(`Editing task with ID ${tsk.id}`);
  };

  const resetForm = () => {
    setTask({
      id: '',
      title: '',
      description: '',
      category: '',
      status: '',
      dueDate: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>To-Do List Management</h2>

      <div>
        <h3>{editMode ? 'Edit Task' : 'Create Task'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={task.id} onChange={handleChange} />
          <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />

          <select name="category" value={task.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>

          <select name="status" value={task.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addTask}>Save Task</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateTask}>Update Task</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Find Task By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Task ID"
        />
        <button className="btn-blue" onClick={getTaskById}>Fetch</button>

        {fetchedTask && (
          <div>
            <h4>Task Found:</h4>
            <pre>{JSON.stringify(fetchedTask, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>List Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(task).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((tsk) => (
                  <tr key={tsk.id}>
                    {Object.keys(task).map((key) => (
                      <td key={key}>{tsk[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(tsk)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteTask(tsk.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ToDoManager;
