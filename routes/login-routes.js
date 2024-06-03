const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

// helper function
// todo: refactor to utils
const getUserByUsername = async (username) => {
  const response = await knex("users").where({ user_name: username }).first();
  return response;
};

// middleware function to authenticate username and password
const isUserAuthenticated = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = await getUserByUsername(username);

  try {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // add user information for the token payload to the req object
      req.user = {
        id: user.id,
        username: user.user_name
      }

      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/", isUserAuthenticated, (req, res) => {
  const { username, id } = req.user;

  // create the token with username, id in the payload
  const token = jwt.sign(
    { username, id },
    SECRET_KEY
  );

  // send token to authenticated user
  res.status(200).json({ token });
});

module.exports = router;
