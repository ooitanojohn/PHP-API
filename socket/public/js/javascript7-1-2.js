const socketiorio();
const form = document.getElementById("auctionForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const sendData = {
    auctionId: auctionId,
    input1: document.getElementById("auction-input1").value,
    input2: document.getElementById("auction-input2").value
socket io.emit('c2s-auction', sendData);
  });
// サーバ(Node.js) →クライアント(ブラウザ) Socket受信
socketio.on('s2c-auction', function (msg) {
  console.log('tys2c:' + msg);
  const ul = document.getElementById("output");
  const li = document.createElement('li');
  li.innerHTML = msg.input1 + " " + msg.input2;
  ul.appendChild(li);
} :
const sendData = {
  auctionId: auctionId
socketio.emit('c2s-join', sendData);
  function OnButtonClick() {
    socketio.disconnect();
