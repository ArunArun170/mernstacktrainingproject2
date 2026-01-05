import React, { useState } from 'react';

const ContactList = ({ contacts, onDelete, onUpdateStatus }) => {
  const [showAll, setShowAll] = useState(false);

  if (contacts.length === 0) {
    return (
      <div className="no-data-view">
        <img src="https://cdn-icons-png.flaticon.com/512/5058/5058046.png" alt="Empty" />
        <p>No contacts found.</p>
      </div>
    );
  }

  // Determine which contacts to display: all of them or just the first 4
  const visibleContacts = showAll ? contacts : contacts.slice(0, 4);

  return (
    <div className="content-area">
      <div className="list-wrapper grid-two-columns">
        {visibleContacts.map((contact) => (
          <div key={contact._id} className="contact-item-card">
            <div className="card-header">
              <h3>{contact.name}</h3>
              <span className="comp-tag">{contact.company}</span>
            </div>
            <div className="card-body">
              <span>📧 {contact.email}</span>
              <span>📞 {contact.phone}</span>
            </div>
            <div className="card-footer">
              <select 
                value={contact.status}
                onChange={(e) => onUpdateStatus(contact._id, e.target.value)}
              >
                <option>Interested</option>
                <option>Follow-up</option>
                <option>Closed</option>
              </select>
              <button className="del-btn" onClick={() => onDelete(contact._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Only show the button if there are more than 4 contacts */}
      {contacts.length > 4 && (
        <div className="read-more-container">
          <button className="read-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactList;