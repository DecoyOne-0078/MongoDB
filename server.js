//Server establishment
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//Connection establishment
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sample", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Schema
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

//Get method
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Form submission
app.post("/submit", async (req, res) => {
  const name = req.body.name;

  try {
    const user = new User({ name });
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
