// src/components/ContactForm.jsx
import React from 'react';

const ContactForm = ({ formData, setFormData, onAdd }) => {
  return (
    <div className="contact-form-container">
      <input 
        type="text" 
        placeholder="Name" 
        className="dynamic-input"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="text" 
        placeholder="Company" 
        className="dynamic-input"
        value={formData.company}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
      />
      <input 
        type="email" 
        placeholder="Email" 
        className="dynamic-input"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        type="text" 
        placeholder="Phone" 
        className="dynamic-input"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      <select 
        className="dynamic-input"
        value={formData.status}
        onChange={(e) => setFormData({...formData, status: e.target.value})}
      >
        <option value="Interested">Interested</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Closed">Closed</option>
      </select>
      <button className="add-contact-btn" onClick={onAdd}>
        Add Contact
      </button>
    </div>
  );
};

export default ContactForm;