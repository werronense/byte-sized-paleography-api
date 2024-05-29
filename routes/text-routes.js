const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// todo: create middleware to check user authorization

// helper function to randomly choose a text from a list
const chooseRandomTextId = (texts) => {
  return texts[Math.floor(Math.random() * texts.length)];
}

// GET /api/texts
router.get("/", async (req, res) => {
  try {
    const allTextIds = (await knex("texts").select("id")).map(obj => obj.id);
    const randomTextId = chooseRandomTextId(allTextIds);

    const randomText = await knex("texts").where({ id: randomTextId }).first();

    res.status(200).json(randomText);
  } catch (err) {
    console.error("Internal server error: ", err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
