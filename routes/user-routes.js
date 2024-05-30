const router = require("express").Router();

// todo: create middleware function to check user authorization

router.post("/:userId/text/:textId", (req, res) => {
    // todo: for authorized user, add userId and textId to join table, response 201
    // placeholder response
    res.send("Endpoint reached POST /api/users/:userId/text/:textId");
});

router.patch("/:id", (req, res) => {
    // todo: for authorized user, update requested field
    // todo: after successful update, send response 200, { username, score }
    // placeholder response
    res.send("Endpoint reached PATCH /api/users/:id");
});

router.delete("/:id", (req, res) => {
    // todo: for authorized user, delete profile
    // todo: after successful delete, send response 204 (no content)
    // placeholder response
    res.send("Endpoint reached DELETE /api/users/:id");
});

module.exports = router;
