const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

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
  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      limitItem: 4,
      currentPage: 1,
    },
    req.query,
    countProduct,
  );

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Product List",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Update Successfully");

  const referer = req.get("Referer");
  if (referer && !referer.includes("/admin/products")) {
    res.redirect(referer);
  } else {
    res.redirect("/admin/products");
  }
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Update status for ${ids.length} product${ids.length > 2 ? "s" : ""} Successfully`,
      );
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Update status for ${ids.length} product${ids.length >= 2 ? "s" : ""} successfully`,
      );
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      req.flash(
        "success",
        `Delete ${ids.length} product${ids.length >= 2 ? "s" : ""} successfully`,
      );
      break;

    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Change position for ${ids.length} product${ids.length >= 2 ? "s" : ""} successfully`,
      );
      break;

    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    },
  );

  res.redirect("back");
};

// [GET] /admin/products/trash
module.exports.trash = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: true,
  };

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regrex) {
    find.title = objectSearch.regrex;
  }

  // Pagination
  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      limitItem: 4,
      currentPage: 1,
    },
    req.query,
    countProduct,
  );

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/trash", {
    pageTitle: "Trash - Deleted Products",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/restore/:id
module.exports.restore = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: false,
      deletedAt: null,
    },
  );

  req.flash(
    "success",
    `Restore ${ids.length} product${ids.length >= 2 ? "s" : ""} successfully`,
  );

  res.redirect("/admin/products/trash");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Add new product",
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price) || 0;
    req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock, 10) || 0;

    if (!req.body.position || req.body.position.trim() === "") {
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position, 10) || 0;
    }

    req.body.thumbnail = `/upload/${req.file.filename}`;

    const product = new Product(req.body);
    await product.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).send("An error occurred while creating the product.");
  }
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit", {
      pageTitle: "Edit product",
      product: product,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price) || 0;
    req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock, 10) || 0;
    req.body.position = parseInt(req.body.position);
    const id = req.params.id;

    if (req.file) {
      req.body.thumbnail = `/upload/${req.file.filename}`;
    }

    try {
      await Product.updateOne(
        {
          _id: id,
        },
        req.body,
      );
    } catch (error) {}

    // res.redirect(`/${systemConfig.prefixAdmin}/products`);

    res.redirect("back");
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).send("An error occurred while creating the product.");
  }
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    res.render("admin/pages/products/detail", {
      pageTitle: "Detail page",
      product: product,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};
