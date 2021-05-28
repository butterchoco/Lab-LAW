const modal = document.querySelector(".modal");

const showDownloadModel = (url) => {
  const urlModal = document.createElement("div");
  urlModal.classList.add("modal-body");
  urlModal.classList.add("modal-url");
  urlModal.setAttribute("id", key);
  urlModal.innerHTML = `<a href="${url}">Download Link</a>`;
  modal.append(urlModal);
  setTimeout(() => {
    urlModal.remove();
  }, 10000);
};
