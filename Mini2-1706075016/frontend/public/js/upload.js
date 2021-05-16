if (!("WebSocket" in window)) alert("Websocket is not supported in browser");

var ws = new WebSocket("ws://localhost:15674/ws");
var client = Stomp.over(ws);
client.debug = null;

const modal = $(".modal");

const modalHide = () => {
  modal.css("transform", "translate(-50%, 200%)");
};

const modalShow = () => {
  modal.css("transform", "translate(-50%, 0)");
};

function createGuid() {
  let S4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  let guid = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;

  return guid.toLowerCase();
}

const getFile = (e) => {
  e.preventDefault();
  const input = $("input[name=input-file]")[0];
  const files = input.files;

  uploadFilePromise(files);
};

const uploadFilePromise = (files) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }
  const key = createGuid();

  $.ajax({
    url: "http://localhost:8081/upload",
    data: formData,
    headers: {
      "X-ROUTING-KEY": key,
    },
    processData: false,
    contentType: false,
    type: "POST",
    success: function (res) {
      const { message } = res;

      modalShow();

      const successModal = document.createElement("div");
      successModal.classList.add("modal-body");
      successModal.classList.add("modal-success");
      successModal.innerHTML = message;
      modal.append(successModal);

      const progressModal = document.createElement("div");
      progressModal.classList.add("modal-body");
      progressModal.classList.add("modal-progress");
      progressModal.setAttribute("id", key);
      modal.append(progressModal);

      setTimeout(() => {
        successModal.hidden = true;
      }, 2000);

      client.subscribe("/exchange/1706075016/" + key, onMessage(key));
    },
    error: function (err) {
      console.error(err);
    },
  });
};

const progressTag = (progress) => {
  return `<progress value="${progress}" max="100"> ${progress}% </progress>`;
};

var onMessage = (key) => {
  return function (m) {
    const response = JSON.parse(m.body);

    $("#" + key).html(
      `<div class="modal-progress">
        <p>Membuat file zip dengan size ${response.totalSize}:</p>
        <p>${response.message}</p>
        ${progressTag(response.percent)}
      </div>`
    );
    if (response.percent === 100) {
      setTimeout(() => {
        $("#" + key).remove();
      }, 2000);

      const urlModal = document.createElement("div");
      urlModal.classList.add("modal-body");
      urlModal.classList.add("modal-url");
      urlModal.setAttribute("id", key);
      urlModal.innerHTML = `<a href="${response.url}">Download Link</a>`;
      modal.append(urlModal);
      setTimeout(() => {
        urlModal.remove();
      }, 10000);
    }
  };
};

var onConnect = function () {
  console.log("Connected");
};

var onError = function (e) {
  console.log(e);
};

client.connect("guest", "guest", onConnect, onError, "/");

$("#upload-file").on("click", getFile);
modalHide();
