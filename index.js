const express = require("express");
const app = express();
require("dotenv").config();

// import routers

const { PORT } = process.env;

// middleware

// routing

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
