const express = require("express");
const router = express.Router();


// controller
const { create, list } = require("../controllers/couponController");

// routes
router.post("/coupon", create);
router.get("/coupons", list);

module.exports = router;
