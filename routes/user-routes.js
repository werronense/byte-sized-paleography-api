const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const getUserByUsername = require("../utils/get-user-by-username");
const authorizeUser = require("../utils/authorize-user");

// PATCH /api/users/username
router.patch("/username", authorizeUser, async (req, res) => {
  const { id } = req.user;
  const { username } = req.body;

  // reject requests without required field
  if (!username) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // reject requests to use a non-unique username
  const usernameTaken = await getUserByUsername(username);
  if (usernameTaken) {
    return res.status(400).json({ error: "Username already taken" });
  }

  try {
    await knex("users").where({ id }).update({ user_name: username });

    res.status(200).json({ message: "Username updated!" });
  } catch (err) {
    console.error("Internal server error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/users/email
router.patch("/email", authorizeUser, async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  // reject requests without required field
  if (!email) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // reject requests to use a non-unique email address
  const emailTaken = await knex("users").where({ email }).first();
  if (emailTaken) {
    return res.status(400).json({ error: "Email already taken" });
  }

  try {
    await knex("users").where({ id }).update({ email });

    res.status(200).json({ message: "Email updated!" });
  } catch (err) {
    console.error("Internal server error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/users/password
router.patch("/password", authorizeUser, async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;

  // reject requests without required field
  if (!password) {
    return res.status(400).json({ error: "Missing required field" });
  }

  // encrypt password before storing in database
  bcrypt.hash(password, 12, async (err, hash) => {
    try {
      await knex("users").where({ id }).update({ password: hash });

      res.status(201).json({ message: "Password updated!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

// PATCH /api/users/score
router.patch("/score", authorizeUser, async (req, res) => {
  const { id } = req.user;
  const { score } = req.body;

  if (isNaN(score)) {
    return res.status(400).json({ error: "Missing required field" });
  }

  try {
    const oldScore = (await knex("users").select("score").where({ id }).first())
      .score;

    const newTotal = Number(oldScore) + Number(score);

    await knex("users").where({ id }).update({ score: newTotal });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/users/
router.delete("/", authorizeUser, async (req, res) => {
  const { id } = req.user;

  try {
    await knex("users").where({ id }).delete();

    // after successful delete, send response 204 (no content)
    res.sendStatus(204)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
