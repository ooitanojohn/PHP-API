const express = require("express");

const router = express.Router();
router.get("/:auctionId", (req, res) => {
  // 情報一覧
  const info = {
    body: req.body, // 送信データ client？ serverじゃない?再入力時は居るな
    params: req.params, //今回はauctionId。 myPage,userIDとか商品詳細ページの商品IDとかauctionページのauctionIDとか
    query: req.query, // ?queryParam ?search="subaru"&order="ASC"
  };
  // server
  // console.log(req.cookies);
  // console.log(req.session);

  // resで渡す情報
  // console.log(info);
  res.render("auction.ejs", { ejsRender: info });
});

module.exports = router;
