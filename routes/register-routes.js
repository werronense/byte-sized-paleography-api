const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// check if username is already taken
const getUserByUsername = async (username) => {
  const response = await knex("users").where({ user_name: username }).first();
  return response;
};

// to validate input
const validateUserInput = (req, res, next) => {
  const requiredFields = ["user_name", "email", "password"];
  const inputFields = Object.keys(req.body);
  const inputValues = Object.values(req.body);

  const fieldsMissing = requiredFields
    .map((value) => inputFields.includes(value))
    .includes(false);
  const valuesMissing = inputValues.map((value) => !!value).includes(false);

  // check all required fields submitted and no fields are blank
  if (fieldsMissing || valuesMissing) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // todo: check email is valid

  const user = getUserByUsername(req.body.user_name);
  // todo: reject request if username already exists

  next();
};

router.post("/", validateUserInput, (req, res) => {
  // todo: add 201 response with json { success: true }
  // placeholder response
  res.send("Reached endpoint POST /api/register");
});

module.exports = router;
