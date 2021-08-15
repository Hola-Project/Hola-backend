const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
var cors = require('cors');
app.use(cors());
const {
  getAllMessage,
  sendMessage,
} = require('./controller/messages.controller');
const {
  addConversation,
  getConversation,
} = require('./controller/conversations.controller');

const { registerUser, login } = require('./controller/auth.controller');

const { getUsers } = require('./controller/users.controller');
dotenv.config();

mongoose.connect(
  'mongodb+srv://ltuc:12345@hola.jglzb.mongodb.net/chatapp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

app.use(express.json());

app.post('/send', sendMessage);
app.get('/message/:conversationId', getAllMessage);

app.post('/addcon', addConversation);
app.get('/conv/:userId', getConversation);

app.post('/register', registerUser);
app.post('/login', login);

app.get('/getUsers', getUsers);

app.listen(8080, () => {
  console.log('Backend server is running!');
});
