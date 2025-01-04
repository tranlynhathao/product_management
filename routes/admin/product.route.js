const multer = require("multer");
const express = require("express");
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

// Routes for product management
router.get("/", controller.index); // List products

router.get("/trash", controller.trash); // List deleted products

router.patch("/change-status/:status/:id", controller.changeStatus); // Change product status

router.patch("/change-multi", controller.changeMulti); // Bulk status change

router.delete("/delete/:id", controller.deleteItem); // Soft delete product

router.patch("/restore/:id", controller.restore); // Restore deleted product

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost,
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch,
);

module.exports = router;
