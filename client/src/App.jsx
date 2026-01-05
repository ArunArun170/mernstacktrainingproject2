// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', company: '', email: '', phone: '', status: 'Interested' 
  });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Status');

  const API_URL = 'http://localhost:5000/api/contacts';

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) { console.error("Error fetching data:", err); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!formData.name) return alert("Name is required");
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', company: '', email: '', phone: '', status: 'Interested' });
      fetchContacts();
    } catch (err) { console.error("Error adding contact:", err); }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await axios.put(`${API_URL}/${id}`, { status: newStatus });
    fetchContacts();
  };

  const filtered = contacts.filter(c => 
    (filter === 'All Status' || c.status === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
     c.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-wrapper">
      <header className="top-header">
        <h1>Contact Management</h1>
        <div className="header-right">
          <select 
            className="status-all-dropdown" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Interested</option>
            <option>Follow-up</option>
            <option>Closed</option>
          </select>
          <input 
            type="text" 
            placeholder="Search by name or company" 
            className="search-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="main-grid">
        <ContactForm 
          formData={formData} 
          setFormData={setFormData} 
          onAdd={handleAdd} 
        />
        <div className="content-area">
          <ContactList 
            contacts={filtered} 
            onDelete={handleDelete} 
            onUpdateStatus={handleUpdateStatus} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;