if (!("WebSocket" in window)) alert("Websocket is not supported in browser");

const ws = new WebSocket("ws://localhost:15674/ws");
const client = Stomp.over(ws);
client.debug = null;

const formInput = document.forms["downloaderForm"];
const submitButton = document.querySelector(
  "form[name=downloaderForm] button[type=submit]"
);

const submit = () => {
  const data = {
    url: formInput["download"].value,
  };
  fetch(baseurl + "/download", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then(({ url, id }) => {
      createModal({ key: id, type: progress });
      client.subscribe("/exchange/1706075016/" + id, onMessage(url, id));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const onMessage = (originalUrl, id) => {
  return function (m) {
    const { progress, url } = JSON.parse(m.body);

    updateProgressModal({ key: id, progress });

    if (url) {
      setTimeout(() => {
        $(`#${id}`).remove();
      }, 2000);

      createModal({
        key,
        type: "url",
        html: `<a href="${url}">Download Link</a>`,
      });
    }
  };
};

const onConnect = () => {
  console.log("Connected");
};

const onError = (e) => {
  console.log(e);
};

client.connect("guest", "guest", onConnect, onError, "/");
submitButton.addEventListener("click", submit);
