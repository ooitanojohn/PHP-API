const socketIo = io();
const form = document.getElementById("auctionForm");
const input = document.getElementById("auction-input");
const input2 = document.getElementById("auction-input2");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let sendData = {
    input1: input.value,
    input2: input2.value,
  };
  socketIo.emit("c2s", sendData);
  console.log(sendData);
});

socketIo.on("s2c", function (msg) {
  console.log("ソケットs2c:" + msg);
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
});
