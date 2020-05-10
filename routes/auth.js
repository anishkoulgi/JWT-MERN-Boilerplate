const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  console.log("SignUp Request");
  //Validate User
  const { error } = registerValidation(req.body);
  if (error) return res.send({ err: error.details[0].message });

  // Checking if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.json({ err: "Email already exists" });

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (e) {
    res.send(e);
  }
});

// Login
router.post("/login", async (req, res) => {
  //Validate User
  const { error } = loginValidation(req.body);
  if (error) return res.send({ err: error.details[0].message });

  // Checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ err: "Email not found" });

  // Checking if Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ err: "Password is wrong" });

  //Create and Sign JWT
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token, userID: user._id });
});

module.exports = router;
