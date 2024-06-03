const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", async (_req, res) => {
  try {
    // return top 10 users by score
    const response = await knex("users").orderBy("score", "desc").limit(10);
    
    // map the array to remove unnecessary and sensitive data
    const topUsers = response?.map((user) => {
      return { id: user.id, username: user.user_name, score: user.score };
    });

    res.json(topUsers);
  } catch (err) {
    console.error("Internal server error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
