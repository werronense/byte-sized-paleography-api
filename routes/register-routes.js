const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// check if username is already taken
const getUserByUsername = async (username) => {
  const response = await knex("users").where({ user_name: username }).first();
  return response;
};

// to validate input
const validateNewUser = (req, res, next) => {
  const user = getUserByUsername(req.body.username);

  // todo: reject request if username already exists

  next();
};

router.post("/", validateNewUser, (req, res) => {
  // todo: add 201 response with json { success: true }
  // placeholder response
  res.send("Reached endpoint POST /api/register");
});

module.exports = router;
