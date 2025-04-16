const express = require("express");
const router = express.Router(); // ✅ THIS must be declared before using `router`

const {
  handleRfid,
  handleTempToStock,
  fetchStock,
  fetchSold
} = require("../controllers/requestController");

router.post("/sold", handleRfid);
router.post("/stock", handleTempToStock);
router.get("/stock", fetchStock);
router.get("/sold", fetchSold);

module.exports = router;
