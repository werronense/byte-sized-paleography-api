const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env;

// import routers
const registerRouter = require("./routes/register-routes");
const loginRouter = require("./routes/login-routes");
const profileRouter = require("./routes/profile-routes");
const textRouter = require("./routes/text-routes");

// middleware
app.use(express.json());
app.use(cors());

// routing
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/profile", profileRouter);
app.use("/api/text", textRouter);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
