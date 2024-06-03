const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const getUserByUsername = require("../utils/get-user-by-username");
const { isEmail } = require("validator");

// middleware function to validate input
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
  bcrypt.hash(req.body.password, 12, async (err, hash) => {
    const newUser = {
      user_name: req.body.username,
      email: req.body.email,
    };

    try {
      newUser.password = hash;
      
      // (insertion returns an array of new ids)
      await knex("users").insert(newUser);
    
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

module.exports = router;
