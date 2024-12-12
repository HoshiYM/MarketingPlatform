const express = require("express");
const router = express.Router();
const upload_product_img = require("../middlewares/upload_product_img");
const { authenticate, isAdmin, checkFirstLogin, checkLockedAccount } = require("../middlewares/auth");
const {
  getAllProducts,
  // getProductDetails,
  sendMailProduct
} = require("../controllers/productController");

// Hiển thị danh sách sản phẩm
// Query parameters: ?page=<page_number>&limit=<items_per_page>
// Example: /products?page=1&limit=10
router.get("/", authenticate, checkLockedAccount, checkFirstLogin, getAllProducts);

// Hiển thị chi tiết sản phẩm
// router.get("/:barcode/details", authenticate, checkLockedAccount, checkFirstLogin, getProductDetails);

// Gửi mail giới thiệu sản phẩm
router.get("/mailProduct", authenticate, checkLockedAccount, checkFirstLogin, sendMailProduct);

module.exports = router;
