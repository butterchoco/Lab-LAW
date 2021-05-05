if (!("WebSocket" in window)) alert("Websocket is not supported in browser");

var user;
if (!window.localStorage.getItem("user")) {
  while (!user) {
    user = prompt("Masukkan username:");
  }
}
window.localStorage.setItem("user", user);
const urlParams = new URLSearchParams(window.location.search);
var roomId = urlParams.get("id") || "test";

var ws = new WebSocket("ws://localhost:15674/ws");
var client = Stomp.over(ws);
client.debug = null;

const onSendMessage = (e) => {
  const message = $(".message__input input[type=text]").val();
  client.send(
    "/queue/room-public",
    {
      "room-id": roomId,
    },
    JSON.stringify({
      user: window.localStorage.getItem("user"),
      message: message,
    })
  );
  $(".message__input input[type=text]").val("");
};

$("#send-message").on("click", onSendMessage);
$(".message__input input[type=text]").on("keyup", (e) => {
  if (e.key === "enter" || e.keyCode === 13) onSendMessage(e);
});

var onConnect = function () {
  console.log("connected");
  client.subscribe("/exchange/room-public/" + roomId, onMessage);
  client.subscribe("/exchange/time/stream", onTimeMessage);
};

var onError = function (e) {
  console.log(e);
};

var onTimeMessage = function (m) {
  $("#time").html(m.body);
};

var onMessage = function (m) {
  const response = JSON.parse(m.body);
  let perspective = "other";
  if (window.localStorage.getItem("user") === response.user) perspective = "me";
  $(".message__container").append(
    templateChat(
      perspective,
      response.user,
      response.message,
      response.createdAt
    )
  );
};

const templateChat = (perspective, user, message, createdAt) => {
  return `<div class="message__chat message__chat--${perspective}"><p class="message__chat__user">${user}</p><p class="message__chat__content">${message}</p><p class="message__chat__time">${createdAt}</p></div>`;
};

client.connect("guest", "guest", onConnect, onError, "/");
