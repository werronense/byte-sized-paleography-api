const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const authorizeUser = require("../utils/authorize-user");

router.post("/", authorizeUser, async (req, res) => {
  const { userId, textId } = req.body;

  if (!userId || !textId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newRow = {
    user_id: userId,
    text_id: textId
  }

  try {
    await knex("users_texts").insert(newRow);
    res.sendStatus(201);
  } catch (err) {
    console.error("Internal server error: ", err);
    res.status(500).json({ error: "Internal server error"});
  }
});

module.exports = router;
