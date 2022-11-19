const socketIo = io();
const form = document.getElementById("auctionForm");
const input = document.getElementById("auction-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let sendData = {
    auctionId: auctionId,
    input1: document.getElementById("auction-input1").value,
    input2: document.getElementById("auction-input2").value,
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
  auctionId: auctionId,
};

socketIo.emit("c2s-join", sendData);
