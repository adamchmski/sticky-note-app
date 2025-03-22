const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// Handles signup functionality
exports.signUp = async (req, res, next) => {
  // Get new user credentials from the request
  const { username, password } = req.body;

  // See if the username already exists in the database
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(422).json({
        error: "There's already an account associated with this username",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
    });
  }

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Could not create a user",
    });
  }

  // Create the new user
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  // Save the new user to the database
  let databaseNewUser;
  try {
    databaseNewUser = await newUser.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }

  let token;
  token = jwt.sign(
    {
      userID: databaseNewUser._id,
      username: databaseNewUser.username,
    },
    "supersecret_dont_share",
    { expiresIn: "1h" }
  );

  // Return the new user object
  return res.status(201).json({
    userID: databaseNewUser._id,
    username: databaseNewUser.username,
    token: token,
  });
};

// Handles login functionality
exports.login = async (req, res, next) => {
  // Get login credentials from request
  const { username, password } = req.body;

  try {
    // Make sure username exists in the database
    const identifiedUser = await User.findOne({ username });
    if (!identifiedUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if password is valid for given username
    const isValidPassword = await bcrypt.compare(
      password,
      identifiedUser.password
    );

    // Throw an error if password is invalid
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    let token;
    token = jwt.sign(
      {
        userID: identifiedUser._id,
        username: identifiedUser.username,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );

    return res.json({
      userID: identifiedUser._id,
      username: identifiedUser.username,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error: please try again" });
  }
};
