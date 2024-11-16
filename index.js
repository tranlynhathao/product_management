const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://haotran04022005:LdaX8GHe8ymyxdka@task-management.ixw2q.mongodb.net/?retryWrites=true&w=majority&appName=task-management",
);

const Product = mongoose.model("Product", {
  title: String,
  price: String,
  thumnail: String,
});

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

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
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
