const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
require("dotenv").config();

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("lkjhgfdsa"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

const port = process.env.PORT || 3000;
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
  console.log(`app listening on port ${port}`);
});
