const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;

const stickies = [
  {
    id: 14,
    color: "third-color",
    // initialPosition: { x: 150, y: 200 },
  },
];

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.json(stickies);
});

app.listen(port);
