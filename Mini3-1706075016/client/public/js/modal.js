const modal = document.querySelector(".modal");

const modalHide = () => {
  modal.style.opacity = "0";
};

const modalShow = () => {
  modal.style.opacity = "1";
};

const createModal = ({ key, type, html }) => {
  const textModal = document.createElement("div");
  textModal.setAttribute("id", key);
  textModal.classList.add("modal-body");
  if (type) textModal.classList.add(`modal-${type}`);
  textModal.innerHTML = html;
  modal.append(textModal);
  setTimeout(() => {
    textModal.remove();
  }, 10000);
};

const updateProgressModal = ({ key, html, progress }) => {
  document.getElementById(key).innerHTML = `<div class="modal-progress">
      ${html || ""}
      ${progressTag(progress)}
    </div>`;
};

const progressTag = (progress) => {
  return `<progress value="${progress}" max="100"> ${progress}% </progress>`;
};
