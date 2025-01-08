const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Middleware
app.use(helmet());
app.use(compression());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || "default_cookie_secret"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
);
app.use(flash());

database.connect().catch((err) => {
  console.error("Failed to connect to database:", err.message);
  process.exit(1);
});

// View Engine Configuration
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

// Local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Static files
app.use(express.static(path.resolve(__dirname, "public")));

// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
