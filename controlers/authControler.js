const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = new User({
    email,
    password,
    subscription,
  });
  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    return null;
  }
  return await user.save();
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  registrationController,
  loginController,
};
