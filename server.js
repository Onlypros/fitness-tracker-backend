const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// IMPORT CONTROLLERS
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const workoutRouter = require("./controllers/workouts");

//IMPORT MIDDLEWARE
const verifyToken = require("./middleware/verify-token");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
// This will make req.user available in every hoot controller function
// this decodes the jwt
app.use(verifyToken);
// add router route here
app.use("/workouts", workoutRouter);
app.listen(port, () => {
  console.log("The express app is ready!");
});
