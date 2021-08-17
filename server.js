const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer = require("multer");
const cors = require('cors')
app.use(cors())
 

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

const {confirmationPost}= require('./controller/verification')
dotenv.config();

mongoose.connect(
  'mongodb+srv://deyaa-pozan:ltuc123456@node-rest-shop.96va2.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-v5f0re-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);
mongoose.set('useCreateIndex', true);
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+"-"+file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


app.post('/send', sendMessage);
app.get('/message/:conversationId', getAllMessage);

app.post('/addcon', addConversation);
app.get('/conv/:userId', getConversation);

app.post('/register',upload.single("img"), registerUser);
app.post('/login', login);

app.get('/getUsers', getUsers);


//confirmationPost
app.get('/confirmation/:token', confirmationPost)

app.listen(8080, () => {
  console.log('Backend server is running!');
});
