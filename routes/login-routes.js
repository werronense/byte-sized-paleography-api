const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

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
  // todo: send response 200 with token
  // placeholder response
  res.send("Reached endpoint POST /api/login");
});

module.exports = router;
