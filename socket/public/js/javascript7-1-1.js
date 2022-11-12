const socketio = io(); // ボタンが押されたら動く
const form = document.getElementById("chatForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const sendData = {
    input1: document.getElementById("chat-input1").value,
    input2: document.getElementById("chat-input2").value,
  };
  socketio.emit("c2s", sendData);
});
//サーバ(Node.js) クライアント(ブラウザ)へSocket受信
socketio.on("s2c", function (msg) {
  console.log("tws2c:" + msg);
  const ul = document.getElementById("output");
  const li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});
