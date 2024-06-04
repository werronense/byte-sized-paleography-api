const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

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

  module.exports = authorizeUser;
  