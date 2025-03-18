const express = require("express");
const cors = require("cors");
const app = express();
const port = 5170;
const stickiesRoutes = require("./routes/stickies-routes");
const usersRoutes = require("./routes/users-routes");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/stickies", stickiesRoutes);
app.use("/api/users", usersRoutes);

app.listen(port);
