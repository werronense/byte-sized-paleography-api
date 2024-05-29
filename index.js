const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// import routers
const registerRouter = require("./routes/register-routes");

const { PORT } = process.env;

// middleware
app.use(express.json());
app.use(cors());

// routing
app.use("/api/register", registerRouter);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
