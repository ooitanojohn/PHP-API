const express = require("express");

const router = express.Router();
router.get("/:id", (req, res) => {
  console.log("req.body:" + req.body)
  console.log("req.cookies:" + req.cookies)
  console.log("req.params.id:" + req.params.id)
  console.log("req.query.order:" + req.query.order)
  console.log("req.get:" + req.get("Authorization"))
  console.log("req.get:" + req.get("If-Modified-Since"))
  console.log("req.get:" + req.get("Host"))
  console.log("req.session:" + req.session)

  res.render("chat1.ejs");
});

module.exports = router;