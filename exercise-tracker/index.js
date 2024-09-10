import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/user.js';
import { Exercise } from './models/exercise.js';
import moment from 'moment/moment.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function validateDateWithMoment(dateString) {
  const date = moment(dateString, ['YYYY-MM-DD', 'DD-MM-YYYY'], true);
  return date.isValid();
}

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Exercise Tracker!');
});

app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = new User({ username });

    await user.save();

    res.status(200).json({ username: user.username, _id: user._id });
  } catch (error) {
    console.error('Error saving user', error);
    res.status(500).json({ error: 'Error saving user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(
      users.map(({ username, _id }) => ({
        username,
        _id,
      }))
    );
  } catch (error) {
    console.error('Error getting users', error);
    res.status(500).json({ error: 'Error getting users' });
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'User id is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'User id is invalid!' });
    }
    if (!description && !duration) {
      return res
        .status(400)
        .json({ error: 'Description and duration is required' });
    }

    // if (!validateDateWithMoment(date)) {
    //   return res.status(400).json({ error: 'Invalid date format' });
    // }

    const user = await User.findById(_id);

    const dateNew = new Date().toDateString();
    const exercise = new Exercise({
      user: user._id,
      description,
      duration,
      date: date || dateNew,
    });

    await exercise.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      date: exercise.date.toDateString(),
      duration: exercise.duration,
      description: exercise.description,
    });
  } catch (error) {
    console.error('Error saving user', error);
    res.status(500).json({ error: 'Error saving user' });
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    if (!_id) {
      return res.status(400).json({ error: 'User id is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'User id is invalid!' });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    let exercise = await Exercise.find({ user: _id });

    if (from) {
      exercise = exercise.filter(
        (exercise) => new Date(exercise.date) >= new Date(from)
      );
    }

    if (to) {
      exercise = exercise.filter(
        (exercise) => new Date(exercise.date) <= new Date(to)
      );
    }

    if (limit) {
      exercise = exercise.slice(0, limit);
    }

    // if (!exercise) {
    //   return res.status(400).json({ error: 'Exercises not found!' });
    // }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      count: exercise.length,
      log: exercise.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      }),
    });
  } catch (error) {
    console.error('Error saving user', error);
    res.status(500).json({ error: 'Error saving user' });
  }
});

mongoose
  .connect(`${process.env.DB_URI}`, { dbName: 'exerciseTracker' })
  .then(() => console.log('Database connected 🌐'))
  .catch((error) => console.error('Error conecting database', error));

app.listen(port, () => console.log(`Server running on port ${port} 🚀`));
