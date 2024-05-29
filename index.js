const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// import routers

const { PORT } = process.env;

// middleware
app.use(express.json());
app.use(cors());

// routing

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
