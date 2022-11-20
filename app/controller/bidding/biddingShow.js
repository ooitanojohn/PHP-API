const biddingShow = (req, res) => {
  // reqからejsに送付する情報をresInfoに格納する
  const resInfo = {
    body: req.body, // 送信データ client？ serverじゃない?再入力時は居るな
    params: req.params, //今回はproductId。 myPage,userIDとか商品詳細ページの商品IDとかbiddingページのproductIDとか
    query: req.query, // ?queryParam ?search="subaru"&order="ASC"
  };
  // DBから入札履歴一覧取ってきて、resInfoに渡す
  // server
  // console.log(req.cookies);
  // console.log(req.session);

  // resで渡す情報
  // console.log(resInfo);
  res.render("bidding.ejs", { ejsRender: resInfo });
};

exports.biddingShow = biddingShow;