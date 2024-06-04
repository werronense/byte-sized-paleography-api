const router = require("express").Router();
const getUserByUsername = require("../utils/get-user-by-username");
const authorizeUser = require("../utils/authorize-user");

// GET /api/profile
router.get("/", authorizeUser, async (req, res) => {
  try {
    // query authenticated user in database
    const user = await getUserByUsername(req.user.username);
    if (!user) return res.status(401).json({ error: "Username not found" });

    // remove sensitive and unnecessary data from response
    const userBasicInfo = {
        id: user.id,
        username: user.user_name,
        score: user.score
    }

    // send 200 response { id, username, score }
    res.status(200).json(userBasicInfo);
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
