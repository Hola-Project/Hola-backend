const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Token = require('../models/token');
const crypto = require('crypto');
//REGISTER

const registerUser = async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      img: 'uploads/' + req.file.filename,
    });

    //save user and respond
    const user = await newUser.save();

    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });
    console.log(user.email);

    // Save the verification token
    token.save(function (err) {
      if (err) {
        console.log('no token');
        return res.status(500).send({ msg: err.message });
      } else {
        // Send the email
        //  'deaiaa.test@gmail.com'
        //  SMTP_PASSWORD= 'deyaa.1999'
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          auth: { user: 'deaiaa.test@gmail.com', pass: 'deyaa.1999' },
          tls: { rejectUnauthorized: false },
        });

        var mailOptions = {
          from: 'deaiaa.test@gmail.com',
          to: user.email,
          subject: 'Account Verification Token',
          text:
            'Hello,\n\n' +
            'Please verify your account by clicking the link: \nhttp://' +
            req.headers.host +
            '/confirmation/' +
            token.token +
            '.\n',
        };
        console.log(mailOptions);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log(err);
            console.log('no verify');
            return res.status(500).send({ msg: err.message });
          } else {
            console.log('ok verify');
          }
        });
      }
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('user not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(req.body.password);
    !validPassword && res.status(400).json('wrong password');
    if (user.isVerified) {
      res.status(200).json(user);
    } else {
      res.status(500).json('Please verfied email');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { registerUser, login };
