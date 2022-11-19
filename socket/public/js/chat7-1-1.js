const socketIo = io();
// ページを開いた時にルームへjoin
const join = {
  auctionId: info.auctionId,
};
socketIo.emit("toServerJoin", join);

// ボタンが押されたらappへsocket送信
const form = document.getElementById("auctionForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const sendData = {
    auctionId: info.auctionId,
    input1: document.getElementById("auction-input1").value,
    input2: document.getElementById("auction-input2").value,
  };
  socketIo.emit("c2s-auction", sendData);
});

// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketIo.on("toServerAuctionSend", function (msg) {
  console.log(msg);
  const ul = document.getElementById("output");
  const li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});
