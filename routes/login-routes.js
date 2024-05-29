const router = require("express").Router();

// todo: write middleware function to authenticade username and password

router.post("/", (req, res) => {
    // todo: send response 200 with token
    // placeholder response
    res.send("Reached endpoint POST /api/login");
});

module.exports = router;
