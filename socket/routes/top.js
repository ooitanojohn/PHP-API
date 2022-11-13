const express = require("express");

const router = express.Router();

// topページのルーティング
router.use((req, res, next) => {
  // ログイントークン確認
  next();
})
router.get("/", (req, res) => {
  res.render("top.ejs");
});

module.exports = router;