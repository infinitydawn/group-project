const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let DatabaseKey = require("./databaseLink.js");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// using group-project database
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

const Item = mongoose.model('Item', itemSchema, "donors");

//user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first: String,
  last: String
});

const User = mongoose.model("User", userSchema, "donors");


// Sample endpoint to get all items
app.get('/api', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// endpoint to create a new user
app.post('/api', async (req, res) => {
  try {
    const userFound = await User.exists({
      username: req.body.username
    });

    // if user exists throw an error
    if (userFound) {
      throw new Error("Username taken.")
    }
    else {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
