const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;
const stickiesRoutes = require("./routes/stickies-routes");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", stickiesRoutes);

app.listen(port);
