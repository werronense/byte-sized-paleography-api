const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const { isEmail } = require("validator");

// check if username is already taken
const getUserByUsername = async (username) => {
  const response = await knex("users").where({ user_name: username }).first();
  return response;
};

// to validate input
const validateUserInput = async (req, res, next) => {
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

  // check email is valid
  if (!isEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // reject request if username already exists
  const user = await getUserByUsername(req.body.user_name);

  if (user) {
    return res.status(400).json({ error: "Username already taken" });
  }

  next();
};

router.post("/", validateUserInput, (req, res) => {
  // todo: add 201 response with json { success: true }
  // placeholder response
  res.send("Reached endpoint POST /api/register");
});

module.exports = router;
