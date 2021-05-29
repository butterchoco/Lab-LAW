if (!("WebSocket" in window)) alert("Websocket is not supported in browser");

const ws = new WebSocket("ws://localhost:15674/ws");
const client = Stomp.over(ws);
client.debug = null;

const formInput = document.forms["downloaderForm"];
const submitButton = document.querySelector(
  "form[name=downloaderForm] button[type=submit]"
);

const baseurl = "http://localhost:3000";
const submit = (e) => {
  e.preventDefault();
  const data = {
    url: formInput["download"].value,
  };
  fetch(baseurl + "/download", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(({ url, uniq_id }) => {
    	const id = uniq_id;
      createModal({ key: id, type: "progress" });
      client.subscribe("/exchange/1706075016/" + id, onMessage(url, id));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const onMessage = (originalUrl, id) => {
  return function (m) {
    const { progress, url } = JSON.parse(m.body);

    if (progress) updateProgressModal({ key: id, progress, html: `<p>Progress: ${progress}%</p>` });
    else if (url) {
        $(`#${id}`).remove();

      createModal({
        key: id,
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
