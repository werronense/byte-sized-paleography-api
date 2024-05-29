const router = require("express").Router();

// todo: write middleware to check that username is unique

router.post("/", (req, res) => {
    // todo: add 201 response with json { success: true }
    // placeholder response
    res.send("Reached endpoint POST /api/register");
});

module.exports = router;
