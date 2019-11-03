
const express = require('express');
const ExpressError = require('./helpers/expressError.js');
const app = express();
const cors = require('cors');


app.use(cors());

app.use(express.json());

// Routes

const patientRoutes = require("./routes/patients");

app.use('/patients', patientRoutes);


/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});


module.exports = app;
