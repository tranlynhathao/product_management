const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  const infoUser = {
    fullName: "Tran Ly",
    email: "tranlynhathao@gmail.com",
    phone: "08123456789",
  };
  res.render("index", {
    pageTitle: "Homepage",
    info: infoUser,
  });
});

app.get("/products", (req, res) => {
  res.send("<h1>Product List</h1>");
});

app.get("/blog", (req, res) => {
  const blogs = ["post 1", "post 2", "post 3"];
  res.render("blog", {
    pageTitle: "Post list",
    blogs: blogs,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Contact",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
