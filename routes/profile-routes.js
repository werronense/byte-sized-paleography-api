const router = require("express").Router();
const jwt = require("jsonwebtoken");
const getUserByUsername = require("../utils/get-user-by-username");
require("dotenv").config();

const { SECRET_KEY } = process.env;

// middelware function to validate token
const authorizeUser = (req, res, next) => {
  const { authorization } = req.headers;

  // isolate the token in the string
  const token = authorization.slice("Bearer ".length);

  // verify token with JWT
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

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
