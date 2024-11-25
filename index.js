const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const database = require("./config/database");
const systemConfig = require("./config/system");

const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
