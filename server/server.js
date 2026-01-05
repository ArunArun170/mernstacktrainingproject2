require('dotenv').config(); // Add this at line 1

// Use the variable here:
/*mongoose.connect(process.env.MONGO_URI)*/



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. MongoDB Connection (Ensure MongoDB is running on your PC)
/*mongoose.connect('mongodb://127.0.0.1:27017/contact_mgmt')*/
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// 2. Data Schema
const contactSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    status: { type: String, default: 'Interested' }
});

const Contact = mongoose.model('Contact', contactSchema);

// 3. API Routes
// Get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new contact
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update status
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});