const Message = require('../models/Message');

//add

const sendMessage = (req, res) => {
  const newMessage = new Message(req.body);

  newMessage
    .save()
    .then((result) => {
      res.status(200).json(newMessage);
    })
    // const savedMessage = newMessage.save();
    .catch((error) => {
      res.status(500).json(error.message);
    });
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router.post("/", async (req, res) => {
//   const newMessage = new Message(req.body);

//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //get

// router.get("/:conversationId", async (req, res) => {
//   try {
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = { getAllMessage, sendMessage };
