const modal = document.querySelector(".modal");

const modalHide = () => {
  modal.style.transform = "translate(-50%, 200%)";
};

const modalShow = () => {
  modal.style.transform = "translate(-50%, 0)";
};

const getFile = (e) => {
  e.preventDefault();
  const input = document.querySelector("input[name=input-file]");
  const files = input.files;

  uploadFilePromise(files);
};

const uploadFilePromise = (files) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  fetch("http://0.0.0.0:8001/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then(({ message }) => {
      modalShow();

      const successModal = document.createElement("div");
      successModal.classList.add("modal-body");
      successModal.classList.add("modal-success");
      successModal.innerHTML = message;
      modal.append(successModal);

      setTimeout(() => {
        successModal.hidden = true;
      }, 2000);
    })
    .catch((error) => {
      alert(error);
      console.error("Error:", error);
    });
};

document.querySelector("#upload-file").addEventListener("click", getFile);
modalHide();
