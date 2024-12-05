const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

// Routes for product management
router.get("/", controller.index); // List products

router.get("/trash", controller.trash); // List deleted products

router.patch("/change-status/:status/:id", controller.changeStatus); // Change product status

router.patch("/change-multi", controller.changeMulti); // Bulk status change

router.delete("/delete/:id", controller.deleteItem); // Soft delete product

router.patch("/restore/:id", controller.restore); // Restore deleted product

module.exports = router;
