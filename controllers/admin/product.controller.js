const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regrex) {
    find.title = objectSearch.regrex;
  }

  // Pagination
  let objectPagination = {
    limitItem: 4,
    currentPage: 1,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
