const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;

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

app.put("/", (req, res) => {
  const { id, color, position } = req.body;

  const index = stickies.findIndex((sticky) => sticky.id === id);

  stickies[index] = { id, color, position };

  console.log(stickies);
  res.status(200).json({ message: "Update successful" });
});

app.listen(port);
