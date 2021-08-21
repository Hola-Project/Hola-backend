const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
app.use(cors());

const {
  getAllMessage,
  sendMessage,
  getUnReadMessage,
  updateStatus,
} = require('./controller/messages.controller');
const {
  addConversation,
  getConversation,
  getfreindscov,
} = require('./controller/conversations.controller');

const { registerUser, login } = require('./controller/auth.controller');

const { confirmationPost } = require('./controller/verification');

const { getUsers, getfriend } = require('./controller/users.controller');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
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
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/send', sendMessage);
app.get('/message/:conversationId', getAllMessage);
app.get('/getUnReadMessage/:conversationId', getUnReadMessage);
app.put('/updateStatus/:conversationId', updateStatus);

app.post('/addcon', addConversation);
app.get('/conv/:userId', getConversation);
app.get('/conv/find/:firstUserId/:secondUserId', getfreindscov);

app.post('/register', upload.single('img'), registerUser);
app.post('/login', login);

app.get('/getUsers', getUsers);
app.get('/friends', getfriend);

//confirmationPost
app.get('/confirmation/:token', confirmationPost);

app.listen(process.env.PORT || 8080, () => {
  console.log('Backend server is running!');
});
