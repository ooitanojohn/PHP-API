const express = require("express");
const router = express.Router();
const { biddingShow } = require("./require");

/** controller */
router.get("/:productId", (req, res) => biddingShow(req, res));

module.exports = router;
