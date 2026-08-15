require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

require("./config/passport")(passport);

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "hospital_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to Hospital APIs");
});

app.use("/api/auth", authRoutes);
app.use("/hospitals", hospitalRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
