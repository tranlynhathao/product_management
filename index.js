const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const route = require("./routes/client/index.route");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
