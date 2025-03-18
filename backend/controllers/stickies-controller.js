const { v4: uuidv4 } = require("uuid");

// Stores stickies
const stickies = [];

exports.getAllStickies = (req, res) => {
  res.json(stickies);
};

exports.createSticky = (req, res) => {
  const { color } = req.body;

  const id = uuidv4(); // Generate a unique ID

  const newSticky = {
    id,
    color,
    position: { x: 60, y: 110 },
    size: { height: 0, width: 0 },
    zIndex: 1,
  };
  stickies.push(newSticky);

  res.status(200).json({ message: "Update successful", newSticky });
};

exports.updateSticky = (req, res) => {
  const { id, color, position, size, zIndex, text } = req.body;

  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies[index] = { id, color, position, size, zIndex, text };

  res.status(200).json({ message: "Update successful" });
};

exports.deleteSticky = (req, res) => {
  const id = req.body.id;
  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies.splice(index, 1);

  res.status(200).json({ message: "Update successful" });
};
