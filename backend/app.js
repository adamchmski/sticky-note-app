const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;
const { v4: uuidv4 } = require("uuid");
// const { default: zIndex } = require("@mui/material/styles/zIndex");

const stickies = [];

app.use(
  cors({
    origin: "https://sticky-note-app-6ljo.onrender.com",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json(stickies);
});

app.post("/", (req, res) => {
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
});

app.put("/", (req, res) => {
  const { id, color, position, size, zIndex, text } = req.body;

  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies[index] = { id, color, position, size, zIndex, text };

  res.status(200).json({ message: "Update successful" });
});

app.delete("/", (req, res) => {
  const id = req.body.id;
  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies.splice(index, 1);

  res.status(200).json({ message: "Update successful" });
});

app.listen(port);
