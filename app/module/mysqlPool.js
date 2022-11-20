/**
 * コネクションプーリングでMySQL接続
 */
const { promisify } = require("util");
const mysql = require("mysql2");
/** 接続設定 */
const { mysqlPoolConf } = require("../../config/conf/mysql");

/** Poolインスタンス */
const pool = mysql.createPool(mysqlPoolConf);

//pool.queryをプロミス化、
const poolQuery = promisify(pool.query).bind(pool)

//引数にクエリとバインド用valuesを取れるようにして、結果を受け取る
const executeQuery = async (query, values) => {
  const results = await poolQuery(query, values);
  return results;
}
module.exports = {
  executeQuery,
};


/**
 * 実行側
 */

// app.get("/", async (req, res, next) => {
//   const { executeQuery } = require("./module/mysqlPool");
//   try {
//     const data = await executeQuery('SELECT * FROM `user_tbl` WHERE `user_id` = ? AND `card_key` = ?', ['1', 556])
//     console.log(data);
//   res.end("OK");
//   } catch (err) {
//     next(err);
//   }
//   //pool.queryを使っているので、開放は不要
// });