const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const keys = require('./../config/keys');

module.exports.login = async(req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    const encrypted = bcrypt.compareSync(password, candidate.password);

    if (encrypted) {
      const token = jwt.sign({ email, userId: candidate._id }, keys.jwt, { expiresIn: 60 * 60 });
      return res.status(200).json({ token: `Bearer ${token}` });
    }

    return res.status(401).json({
      message: 'incorrect password'
    });
  }

  res.status(404).json({
    message: 'user is not found'
  });
};

module.exports.register = async(req, res) => {
  const { name, email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    return res.status(409).json({
      message: 'email is used'
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const user = new User({
    name, email, password: bcrypt.hashSync(password, salt)
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch(e) {
    console.log(e);
  }
};
