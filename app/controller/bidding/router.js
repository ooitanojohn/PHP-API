const express = require("express");
const router = express.Router();
const { biddingShow } = require("./require");

/** controller */
// router.get("/:productId", (req, res) => biddingShow(req, res));

/** ページ遷移時に入札情報を取ってくる */
router.get("/:productId", async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require("../../conf/auctionResInfo");
  let resInfo = reqInfoReturn(req);
  const { executeQuery } = require("../../module/mysqlTransaction");
  /** 配列操作 モジュール */
  const { array2ndFindKeyMapVal, array2ndFindValMapArr } = require("../../common/arrayMap");
  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery('SELECT * FROM `biddings_tbl` WHERE `product_id` = ?ORDER BY `bidding_time` ASC LIMIT 5', ['1']);
    /** resInfoに最大入札額を追加 */
    const max_bidding_money = (Math.max(...array2ndFindKeyMapVal(resInfo.sql, "bidding_money")));
    /** 最大入札額から入札者と時間を取ってくる */
    resInfo.max = array2ndFindValMapArr(resInfo.sql, "bidding_money", max_bidding_money)
    res.render("bidding.ejs", { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
