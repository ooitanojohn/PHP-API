const socketIo = io();
// ボタンが押されたら動く
const form = document.getElementById("auctionForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const sendData = {
    input1: document.getElementById("auction-input1").value,
    input2: document.getElementById("auction-input2").value,
  };
  socketIo.emit("toServer", sendData);
});

//サーバ(Node.js) クライアント(ブラウザ)へSocket受信
socketIo.on("toJavascript", function (msg) {
  const ul = document.getElementById("output");
  const li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});
