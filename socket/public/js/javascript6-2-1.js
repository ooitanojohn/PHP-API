const socketIo = io();
const form = document.getElementById("chatForm");
const input = document.getElementById("chat-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let sendData = {
    chatid: chatid,
    input1: document.getElementById("chat-input1").value,
    input2: document.getElementById("chat-input2").value,
  };
  console.log(sendData);
  socketIo.emit("c2s", sendData);
});

socketIo.on("s2c", function (msg) {
  console.log("ソケットs2c:" + msg);
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});

const sendData = {
  chatid: chatid,
};

socketIo.emit("c2s-join", sendData);
