const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const authorizeUser = require("../utils/authorize-user");

// POST /api/user/text
router.post("/", authorizeUser, async (req, res) => {
  const { textId } = req.body;
  
  // get user id from req object (set by authorizeUser middleware)
  const { id } = req.user;

  if (!textId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newRow = {
    user_id: id,
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
