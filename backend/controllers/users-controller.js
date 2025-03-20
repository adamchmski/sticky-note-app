const User = require("../models/users");

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

// Handles signup functionality
exports.signUp = async (req, res, next) => {
  // Get new user credentials from the request
  const { name, email, password } = req.body;

  // See if the email already exists in the database
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw error;
  } catch (err) {
    console.log(err);
    res
      .status(422)
      .json({ error: "There's already an account associated with this email" });
    return;
  }

  // Create the new user
  const newUser = new User({
    name,
    email,
    password,
  });

  // Save the new user to the database
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating user" });
    return;
  }

  // Return the new user object
  res.status(201).json({ newUser });
};

// Handles login functionality
exports.login = async (req, res, next) => {
  // Get login credentials from request
  const { email, password } = req.body;

  // Make sure email exists in the database
  const identifiedUser = await User.findOne({ email });
  if (!identifiedUser || identifiedUser.password !== password) {
    res.status(401).json({ error: "user not found" });
    return;
  }

  res.json({ message: "Logged in!" });
};
