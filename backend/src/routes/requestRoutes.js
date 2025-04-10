const express = require("express");
const router = express.Router();

const {handleRfid, handleTempToStock
} = require("../controllers/requestController");



// ActiveRequest Routes
router.post("/sold",  handleRfid);
router.get("/stock",  handleTempToStock);

module.exports = router;
