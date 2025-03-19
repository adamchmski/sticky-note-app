const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const stickiesRoutes = require("./routes/stickies-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
const port = 5170;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/stickies", stickiesRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect(
    "mongodb+srv://adamchmski:adamchmski123@cluster0.htb5l.mongodb.net/stickies?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
