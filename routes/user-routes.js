const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
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
  console.log(id);

  // todo: for authorized user, update requested field
  // todo: after successful update, send response 200, { message }

  // placeholder response
  res.send("Endpoint reached PATCH /api/users/password");
});

// PATCH /api/users/score
router.patch("/score", authorizeUser, async (req, res) => {
  const { id } = req.user;
  console.log(id);

  // todo: for authorized user, update requested field
  // todo: after successful update, send response 200, { message }

  // placeholder response
  res.send("Endpoint reached PATCH /api/users/score");
});

// DELETE /api/users/:id
router.delete("/:id", (req, res) => {
  // todo: for authorized user, delete profile
  // todo: after successful delete, send response 204 (no content)
  // placeholder response
  res.send("Endpoint reached DELETE /api/users/:id");
});

module.exports = router;
