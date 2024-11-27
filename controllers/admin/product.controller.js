const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const products = await Product.find({});

  console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
  });
};
