const socketIo = io();
// ページを開いた時にオークション商品へjoin
const join = {
  productId: info.params.productId,
};
socketIo.emit("toServerJoin", join);

// ボタンが押されたらserverへsocket送信
const form = document.getElementById("biddingForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const biddingData = {
    productId: info.params.productId,
    userId: document.getElementById("userId").value,
    biddingTime: document.getElementById("biddingTime").value,
    biddingMoney: document.getElementById("biddingMoney").value,
  };
  socketIo.emit("toServerBiddingSend", biddingData);
});

// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketIo.on("toRenderBiddingSend", function (biddingData) {
  console.log(biddingData);
  const ul = document.getElementById("biddingLog");
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = biddingData.userId + biddingData.biddingTime + biddingData.biddingMoney;
  li.appendChild(p);
  ul.appendChild(li);
});
