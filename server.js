const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const {getAllMessage,sendMessage} = require("./controller/messages.controller")
const {addConversation,getConversation} = require("./controller/conversations.controller")
dotenv.config();

mongoose.connect(
    'mongodb+srv://deyaa-pozan:ltuc123456@node-rest-shop.96va2.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-v5f0re-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  app.use(express.json());

  app.post("/",sendMessage);
  app.get('/:conversationId' , getAllMessage);

  app.post("/",addConversation);
  app.get('/:userId' , getConversation);

  app.listen(8080, () => { 
    console.log("Backend server is running!");
  });