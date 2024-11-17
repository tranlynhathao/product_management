const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://haotran04022005:LdaX8GHe8ymyxdka@task-management.ixw2q.mongodb.net/?retryWrites=true&w=majority&appName=task-management",
// );

mongoose.connect("mongodb://127.0.0.1:27017/test");

const Product = mongoose.model("Product", {
  title: String,
  price: String,
  thumnail: String,
});

const newProduct = new Product({
  title: "apple",
  price: "0.5",
  thumnail:
    "https://tranlynhathao.vercel.app/_next/image?url=https%3A%2F%2Fositcom.com%2Fstatic%2Fimages%2Fimages%2Fgit-blog-header_1.png&w=3840&q=75",
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
  res.render("products", {
    titlePage: "Product List",
    product: products,
  });
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
