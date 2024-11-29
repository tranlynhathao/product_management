const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  console.log(filterStatus);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regrex = new RegExp(keyword, "i");
    find.title = regrex;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
