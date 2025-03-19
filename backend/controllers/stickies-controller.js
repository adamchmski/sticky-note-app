const Sticky = require("../models/stickies");

exports.getAllStickies = async (req, res) => {
  const allStickies = await Sticky.find();
  res.json(allStickies);
};

exports.createSticky = async (req, res) => {
  const { _id, color } = req.body;

  const newSticky = new Sticky({
    color,
    position: { x: 60, y: 110 },
    size: { height: 0, width: 0 },
    zIndex: 1,
    text: "",
  });

  try {
    await newSticky.save();
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

exports.deleteSticky = async (req, res) => {
  await Sticky.deleteOne({ _id: req.body._id });

  res.status(200).json({ message: "Update successful" });
};
