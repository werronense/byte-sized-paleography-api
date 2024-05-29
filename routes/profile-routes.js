const router = require("express").Router();

// todo: create middelware to validate token

router.get("/", (req, res) => {
    // todo: query authenticated user in database
    // todo: send 200 response { username, score }
    // placeholder response
    res.send("Reached endpoint GET /api/profile")
})

module.exports = router;
