const Router = require("express").Router;
const router = new Router();
const ExpressError = require("../helpers/expressError");

router.get("/", async function (req, res, next) {
  try {
    return res.send("hello world");
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;
