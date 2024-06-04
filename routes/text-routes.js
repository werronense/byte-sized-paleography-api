const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const authorizeUser = require("../utils/authorize-user");

// helper function to randomly choose a text from a list
const chooseRandomTextId = (texts) => {
  return texts[Math.floor(Math.random() * texts.length)];
};

// GET /api/texts
router.get("/", authorizeUser, async (req, res) => {
  try {
    // filter out texts from users_texts that match user in a knex/sql query
    const unusedTexts = await knex("texts")
      .select("id")
      .whereNotIn(
        "id",
        knex("users_texts").select("text_id").where({ user_id: req.user.id })
      );

    // map the array of untranscribed texts to create an array of IDs only
    const textIds = unusedTexts.map((obj) => obj.id);

    const randomTextId = chooseRandomTextId(textIds);

    const randomText = await knex("texts").where({ id: randomTextId }).first();

    res.status(200).json(randomText);
  } catch (err) {
    console.error("Internal server error: ", err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
