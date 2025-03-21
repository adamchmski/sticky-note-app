const mongoose = require("mongoose");

const Sticky = require("../models/stickies");
const User = require("../models/users");

exports.getAllStickies = async (req, res) => {
  const allStickies = await Sticky.find();
  res.json(allStickies);
};

exports.getUserStickies = async (req, res) => {
  const userStickies = await Sticky.find({ creator: req.body.creator });
  res.json(userStickies);
};

// Create a new sticky and add it to the database
exports.createSticky = async (req, res) => {
  const { _id, color, creator } = req.body;

  // Create a new sticky
  const newSticky = new Sticky({
    color,
    position: { x: 60, y: 110 },
    size: { height: 0, width: 0 },
    zIndex: 1,
    text: "",
    creator,
  });

  let user;

  // Get the creator that is creating the sticky
  try {
    user = await User.findById(creator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Creating sticky failed" });
  }

  if (!user) {
    res.status(404).json({ message: "Could not find user" });
  }

  // Add the sticky to the database and add the sticky id to it's associated user
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newSticky.save({ session: session });
    user.stickies.push(newSticky);
    await user.save();
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return;
  }

  res.status(200).json({ message: "Update successful", newSticky });
};

exports.updateSticky = async (req, res) => {
  const { _id, color, position, size, zIndex, text } = req.body;

  await Sticky.findOneAndUpdate(
    { _id: _id },
    { color, position, size, zIndex, text }
  );

  res.status(200).json({ message: "Update successful" });
};

// Delete sticky and remove it from the database
exports.deleteSticky = async (req, res) => {
  let sticky;
  // Find the sticky in the database and connect it to it's user
  try {
    sticky = await Sticky.findById({ _id: req.body._id }).populate("creator");
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }

  // Catch error if sticky not found
  if (!sticky) {
    res.status(404).json({ message: "Could not find sticky for this user" });
  }

  // Remove the sticky from the database and remove it's id from it's associated user
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Sticky.deleteOne({ _id: req.body._id }, { session: session });
    sticky.creator.stickies.pull(sticky);
    await sticky.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ message: "Delete successful" });
};
