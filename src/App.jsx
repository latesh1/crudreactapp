import React, { useState } from 'react';
import './App.css';

const CrudApp = () => {
  const initialData = [
    { id: 1, name: 'latesh', email: 'latesh@example.com' },
    { id: 2, name: 'sam', email: 'sam@example.com' },
  ];

  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({ id: null, name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setData(data.map(item => item.id === formData.id ? formData : item));
      setIsEditing(false);
    } else {
      const newItem = {
        ...formData,
        id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1
      };
      setData([...data, newItem]);
    }
    setFormData({ id: null, name: '', email: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    if (isEditing && formData.id === id) {
      setFormData({ id: null, name: '', email: '' });
      setIsEditing(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="form-title">{isEditing ? 'Edit Item' : 'Add Item'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="button primary-button">
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({ id: null, name: '', email: '' });
              }}
              className="button secondary-button"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h2>Items List</h2>
      {data.length === 0 ? (
        <p className="empty-state">No items found</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="action-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudApp;