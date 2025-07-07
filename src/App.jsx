import React, { useState } from 'react';
import './App.css';

const CrudApp = () => {
  const initialData = [
    { id: 1, name: 'latesh', email: 'latesh@example.com', address: 'ca 21 jamuna ' },
    { id: 2, name: 'sam', email: 'sam@example.com', address: 'ca 31 virar' },
  ];

  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({ 
    id: null, 
    name: '', 
    email: '', 
    address: '' 
  });
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
    setFormData({ id: null, name: '', email: '', address: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    if (isEditing && formData.id === id) {
      setFormData({ id: null, name: '', email: '', address: '' });
      setIsEditing(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <h1>ReactCrudApp</h1>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#" className="active">New Item</a>
        </div>
      </nav>

      <div className="divider"></div>

      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter"
            />
            <div className="input-hint">Memmname:</div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter"
            />
            <div className="input-hint">emailaddress:</div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="button primary-button">
              {isEditing ? 'Update' : 'Submit'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ id: null, name: '', email: '', address: '' });
                }}
                className="button secondary-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Data Table */}
      <h2 className="table-title">Items List</h2>
      {data.length === 0 ? (
        <p className="empty-state">No items found</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
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