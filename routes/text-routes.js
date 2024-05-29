const router = require("express").Router();

// todo: create middleware to check user authorization

// todo: create helper function to randomly choose a text from a list

router.get("/", (req, res) => {
  // todo: respond with a randomly selected text
  // placeholder response
  res.send("Reached endpoint GET /api/text");
});

module.exports = router;
