/** paramとか良く返す値を常に格納して返す */
const reqInfoReturn = (req) => {
  let resInfo = {
    body: req.body, // 送信データ client？ serverじゃない?再入力時は居るな
    params: req.params, //今回はproductId。 myPage,userIDとか商品詳細ページの商品IDとかbiddingページのproductIDとか
    query: req.query, // ?queryParam ?search="subaru"&order="ASC"
    session: req.session,
    cookie: req.cookie,
  };
  return resInfo;
};

module.exports = {
  reqInfoReturn,
};
