const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  status: { type: String, default: 'Interested' }
});

module.exports = mongoose.model('Contact', ContactSchema);