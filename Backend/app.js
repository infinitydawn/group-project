const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let DatabaseKey = require ("./databaseLink.js");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

//gitignore test

// Connect to MongoDB
// using the users -> donors collection
const mongoUri = DatabaseKey.dbKey;
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if unable to connect
  });

// Define a sample schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

const Item = mongoose.model('Item', itemSchema,"donors");

// Sample endpoint to get all items
app.get('/api', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Sample endpoint to add a new item
app.post('/api', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
