const socketio = io();

// ページを開いた時にルームへjoin
const sendData = {
  chatid: "1",
};
socketio.emit("c2s-join", sendData);
// ボタンが押されたら動く
const form = document.getElementById("chatForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const sendData = {
    chatid: "1",
    input1: document.getElementById("chat-input1").value,
    input2: document.getElementById("chat-input2").value,
  };
  socketio.emit("c2s-chat", sendData);
});
// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketio.on("s2c-chat", function (msg) {
  console.log("tys2c:" + msg);
  const ul = document.getElementById("output");
  const li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});
