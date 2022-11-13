const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  // ミドルウェアの処理
  console.log(Date.now());
  next();
})
router.get("/", (req, res) => {
  console.log(req.params.id)
  res.render("index7-1-1.ejs");
});

module.exports = router;