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


//------------- SCHEMAS ---------------
// sample schema
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

//user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first: String,
  last: String
});

//appointment schema
const appointmentSchema = new mongoose.Schema({
  user: String,
  date: Date,
  description: String
});

//food item schema
const foodItemSchema = new mongoose.Schema({
  foodType: String,
  weightPounds: Number,
  appointmentID: String
});


//------------- MODELS ---------------
// user model
const User = mongoose.model("User", userSchema, "donors");
// appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");
// food item model
const FoodItem = mongoose.model("FoodItem", foodItemSchema, "foodItems");
// sample model
const Item = mongoose.model('Item', itemSchema, "donors");





//------------- API ENDPOINTS ---------------


// ****** USERS ********
// endpoint to get all users
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


// ****** APPOINTMENTS ********
// endpoint to create a new appointment
app.post('/create-appointment', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

// TODO get food items for a appointment id

// endpoint to create new food items
app.post('/create-food-items', async (req, res) => {
  try {
      const { appointmentID, foodInfo } = req.body;

      if (!Array.isArray(foodInfo)) {
          return res.status(400).send("foodInfo should be an array");
      }

      // Prepare an array of food item documents to be inserted
      const foodItemsToInsert = foodInfo.map(item => ({
          foodType: item.food,
          weightPounds: item.weight,
          appointmentID: appointmentID
      }));

      // Insert the food items into the collection
      const savedFoodItems = await FoodItem.insertMany(foodItemsToInsert);

      res.json(savedFoodItems);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// endpoint to get all appointments for a user
app.get('/get-appointments', async (req, res) => {
  try {
    const username = req.query.username;
    const appointments = await Appointment.find({ user: username });
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



//------------- SERVER START ---------------
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
