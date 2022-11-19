const socketIo = io();
// ページを開いた時にルームへjoin
const join = {
  auctionId: info.params.auctionId,
};
socketIo.emit("toServerJoin", join);

// ボタンが押されたらserverへsocket送信
const form = document.getElementById("auctionForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const biddingData = {
    auctionId: info.params.auctionId,
    userId: document.getElementById("userId").value,
    biddingTime: document.getElementById("biddingTime").value,
    biddingMoney: document.getElementById("biddingMoney").value,
  };
  socketIo.emit("toServerAuctionSend", biddingData);
});

// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketIo.on("toRenderAuctionSend", function (biddingData) {
  console.log(biddingData);
  const ul = document.getElementById("biddingLog");
  const li = document.createElement("li");
  li.innerHTML = biddingData.userId + biddingData.biddingTime + biddingData.biddingMoney;
  ul.appendChild(li);
});
