const mongoose = require("mongoose");

const Sticky = require("../models/stickies");
const User = require("../models/users");

// Get stickies for a user
exports.getUserStickies = async (req, res) => {
  try {
    const userStickies = await Sticky.find({ creator: req.body.creator });
    return res.status(200).json(userStickies);
  } catch (error) {
    console.error("Error fetching user stickies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
  } catch (error) {
    console.error("Error finding creator", error);
    return res.status(500).json({ message: "Creating sticky failed" });
  }

  if (!user) {
    return res.status(404).json({ message: "Could not find user" });
  }

  // Add the sticky to the database and add the sticky id to it's associated user
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newSticky.save({ session: session });
    user.stickies.push(newSticky);
    await user.save({ session: session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.error(
      "Error adding sticky to database or adding sticky id to associated user",
      error
    );
    return res.status(500).json({ message: "Creating sticky failed" });
  }

  return res.status(200).json({ message: "Update successful", newSticky });
};

// Update a sticky note in the database
exports.updateSticky = async (req, res) => {
  const { _id, color, position, size, zIndex, text } = req.body;

  try {
    await Sticky.findOneAndUpdate(
      { _id: _id },
      { color, position, size, zIndex, text }
    );
  } catch (error) {
    console.error("Error updating sticky", error);
    return res.status(500).json({ message: "Updating sticky failed" });
  }

  return res.status(200).json({ message: "Update successful" });
};

// Delete sticky from the database
exports.deleteSticky = async (req, res) => {
  let sticky;
  // Find the sticky in the database and connect it to it's user
  try {
    sticky = await Sticky.findById({ _id: req.body._id }).populate("creator");
  } catch (error) {
    console.error(
      "Error finding sticky in database or connecting it to it's user",
      error
    );
    return res.status(500).json({ message: "Something went wrong" });
  }

  // Catch error if sticky not found
  if (!sticky) {
    return res
      .status(404)
      .json({ message: "Could not find sticky for this user" });
  }

  // Remove the sticky from the database and remove it's id from it's associated user
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Sticky.deleteOne({ _id: req.body._id }, { session: session });
    sticky.creator.stickies.pull(sticky);
    await sticky.creator.save({ session: session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.error(
      "Error removing sticky from database or associated user",
      error
    );
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ message: "Delete successful" });
};
