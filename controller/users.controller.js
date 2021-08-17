const User = require('../models/User');

//add

const getUsers = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getfriend = async (req, res) => {
  try {
    const user = await User.find({});
    console.log(user);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUsers, getfriend };
