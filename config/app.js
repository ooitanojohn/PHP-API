"use strict";
const express = require("express");
const app = express();
const path = require("path");
const debugMySQL = require("debug")("MySQL");
const cookieParser = require("cookie-parser");

/**
 * 静的ファイル
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app/views"));
/**
 * middleware
 */
app.use(express.static(__dirname + "/../public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * router
 */
const biddingRouter = require("../app/controller/bidding/router");
/**
 * 管理者側
 */

/**
 * ユーザー側
 */
/** ランディングページ */
// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

/** ログイン、登録ページ */

/**
 * オークションスケジュール確認
 * (商品一覧確認、商品詳細ページ)
 */
app.get("/top", (req, res) => {
  res.render("top.ejs");
});
// app.use("/top", productRouter);

// 入札ページ
app.use("/bidding", biddingRouter);

// マイページ (落札一覧、入札履歴、退会処理)
// app.use("/myPage",myPageRouter);

// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける

/**
 * MySQL
 */
const mysql = require("mysql2");
/** 接続設定 */
const { mysqlConf, mysqlPoolConf } = require("./conf/mysql");
/** 共通関数 エラーハンドラなど */
const { mysqlTransaction, mysqlConnectErr, mysqlPoolTransaction } = require("./module/handler/mysql");
/** 接続 */

module.exports = app;