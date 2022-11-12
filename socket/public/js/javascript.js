const socketIo = io();
const form = document.getElementById("chatForm");
const input = document.getElementById("chat-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    socketIo.emit("c2s", input.value);
    console.log(input.value);
  }
});

socketIo.on("s2c", function (msg) {
  console.log("ソケットs2c:" + msg);
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  li.innerHTML = msg;
  ul.appendChild(li);
});
