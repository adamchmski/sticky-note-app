const User = require("../models/users");

// Handles signup functionality
exports.signUp = async (req, res, next) => {
  // Get new user credentials from the request
  const { username, password } = req.body;

  // See if the username already exists in the database
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw error;
  } catch (err) {
    console.log(err);
    res.status(422).json({
      error: "There's already an account associated with this username",
    });
    return;
  }

  // Create the new user
  const newUser = new User({
    username,
    password,
  });

  // Save the new user to the database
  let databaseNewUser;
  try {
    databaseNewUser = await newUser.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating user" });
    return;
  }

  // Return the new user object
  res.status(201).json(databaseNewUser);
};

// Handles login functionality
exports.login = async (req, res, next) => {
  // Get login credentials from request
  const { username, password } = req.body;

  // Make sure username exists in the database
  const identifiedUser = await User.findOne({ username });
  if (!identifiedUser || identifiedUser.password !== password) {
    res.status(401).json({ error: "user not found" });
    return;
  }

  res.json({ message: "Logged in!", user: identifiedUser });
};
