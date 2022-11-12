const socketIo = io();
const form = document.getElementById("chatForm");
const input = document.getElementById("chat-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    socketIo.emit("room2", input.value);
    console.log(input.value);
  }
});

socketIo.on("room2Res", function (msg) {
  console.log("ソケットroom2Res:" + msg);
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  li.innerHTML = msg;
  ul.appendChild(li);
});
