// create server
const express = require('express');
const app = express();
const _port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors());

// daatabase info
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DB_NAME;
// database connection
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.6n5qjvj.mongodb.net/${database}?retryWrites=true&w=majority`
);

// import user model
const UserModel = require('./models/Users');

// home route
app.get('/', (req, res) => res.send('home'));

// get users
app.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// create user
app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json({ msg: 'user created' });
});

app.listen(_port, () => console.log('server is running on 3000'));
