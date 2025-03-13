const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;
const { v4: uuidv4 } = require("uuid");

const stickies = [
  {
    id: 14,
    color: "third-color",
    position: { x: 150, y: 200 },
  },
];

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json(stickies);
});

app.post("/", (req, res) => {
  const { color } = req.body;

  const id = uuidv4(); // Generate a unique ID

  const newSticky = { id, color, position: { x: 100, y: 100 } };
  stickies.push(newSticky);

  res.status(200).json({ message: "Update successful", newSticky });
});

app.put("/", (req, res) => {
  const { id, color, position } = req.body;

  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies[index] = { id, color, position };

  console.log(stickies);
  res.status(200).json({ message: "Update successful" });
});

app.listen(port);
