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
  const requiredFields = ["username", "email", "password"];
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
  const user = await getUserByUsername(req.body.username);

  if (user) {
    return res.status(400).json({ error: "Username already taken" });
  }

  next();
};

router.post("/", validateUserInput, async (req, res) => {
  const newUser = {
    user_name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // (insertion returns an array of new ids)
    await knex("users").insert(newUser);
    
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Internal server error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
