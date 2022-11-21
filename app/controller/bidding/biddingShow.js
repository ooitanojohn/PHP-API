const biddingShow = (req, res) => {
  const { reqInfoReturn } = require("../../conf/auctionResInfo");
  let resInfo = reqInfoReturn(req);
  // reqからejsに送付する情報をresInfoに格納する
  // DBから入札履歴一覧取ってきて、resInfoに渡す
  // server
  // console.log(req.cookies);
  // console.log(req.session);

  // resで渡す情報
  // console.log(resInfo);
  res.render("bidding.ejs", { ejsRender: resInfo });
};

exports.biddingShow = biddingShow;