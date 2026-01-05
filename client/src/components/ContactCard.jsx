import React from 'react';

const ContactCard = ({ contact, deleteContact, updateStatus }) => {
  return (
    <div className="contact-card">
      <div className="card-header">
        <h3>{contact.name}</h3>
        <span className="company-label">{contact.company}</span>
      </div>
      <div className="card-info">
        <p>📧 {contact.email}</p>
        <p>📞 {contact.phone}</p>
      </div>
      <div className="card-footer">
        <select 
          value={contact.status} 
          onChange={(e) => updateStatus(contact._id, e.target.value)}
          className="status-select"
        >
          <option>Interested</option>
          <option>Follow-up</option>
          <option>Closed</option>
        </select>
        <button onClick={() => deleteContact(contact._id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;