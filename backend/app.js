const express = require("express");
const app = express();
const port = 3030;
const mongodb = "mongodb://localhost:27017/examtemplate";
const morgan = require("morgan");
const mongoose = require("mongoose");

/* Middleware */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* Database */
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("\x1b[32mSUCCESS\x1b[0m MongoDB connected"))
  .catch(() => console.error("\x1b[31mERROR\x1b[0m MongoDB is not connected"));

/* Routes */
const root = "./api/routes";
const graffitiRoutes = require(root + "/graffitis");
const userRoutes = require(root + "/users");
const airQualityRoutes = require(root + "/airQuality");
const templateRoutes = require(root + "/templates");

app.use("/graffitis", graffitiRoutes);
app.use("/users", userRoutes);
app.use("/airQuality", airQualityRoutes);
app.use("/templates", templateRoutes);

/*Error Route*/
app.use((req, res, next) => {
  const error = new Error(
    "Method " + req.method + " for " + req.originalUrl + " not found"
  );
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

/* Listen */
app.listen(port, () => {
  console.log("> Server Running at http://localhost:" + port);
});