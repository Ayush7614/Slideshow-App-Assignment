const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the data
const workoutSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});

const Workout = mongoose.model('Workout', workoutSchema);

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Handle GET requests to /workouts
app.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle POST requests to /workouts
app.post('/workouts', async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const workout = new Workout({ name, description, duration });
    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});