const getFilesInDrive = () => {
fetch("/drive", {
  method: "GET",
})
  .then((response) => response.json())
  .then(({ files }) => {
    let html = "";
    for (let file of files) {
      let filename = file;
      if (window.innerWidth < 425 && file.length > 8)
        filename = file.slice(0, 8) + " . . . " + file.slice(-8);
      html += `
      <div class="file" data-file="${file}">
        <input id="${file}" class="file-input" type="checkbox"/>
        <div class="file--wrapper">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
          <p>${filename}</p>
        </div>
      </div>`;
    }
    documentsList.innerHTML = html || "Tidak ada file diupload.";
    fileEventListener();
  })
  .catch((error) => {
    alert(error);
    console.error("Error:", error);
  });
}

getFilesInDrive();

const documentsList = document.querySelector(".documents-available");
documentsList.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll(".context-menu").forEach((e) => {
    e.remove();
  });
});

const fileEventListener = () => {
  const file = document.querySelectorAll(".file");
  file.forEach((f) => {
    f.addEventListener("click", (e) => {
      const filename = f.getAttribute("data-file");
      const fileCheckInput = document.getElementById(filename);
      fileCheckInput.checked = !fileCheckInput.checked;
    });

    f.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      document.querySelectorAll(".context-menu").forEach((e) => {
        e.remove();
      });
      const filename = f.getAttribute("data-file");
      const fileCheckInput = document.getElementById(filename);
      if (!fileCheckInput.checked) fileCheckInput.checked = true;

      let menu = document.createElement("div");
      menu.classList.add("context-menu");
      menu.style.left = e.pageX + "px";
      menu.style.top = e.pageY - 50 + "px";
      menu.innerHTML = `
      <ul>
        <li class="download">Download</li>
      </ul>
      `;
      document.body.append(menu);
      const downloadButton = document.querySelector(".download");
      downloadButton.addEventListener("click", download);
    });
  });
};

const download = () => {
  const filesInput = document.querySelectorAll(".file-input");
  const filesChecked = [];
  filesInput.forEach((e) => {
    if (e.checked) filesChecked.push(e.getAttribute("id"));
  });
  if (filesChecked.length === 1) {
    window.location = "/download/" + JSON.stringify([filesChecked[0]]);
    return;
  }
  fetch("/download/" + JSON.stringify(filesChecked), {
    method: "GET",
  })
    .then((response) => response.json())
    .then(({ url }) => {
      window.location = "/download/" + JSON.stringify([url]);
    })
    .catch((error) => {
      alert(error);
      console.error("Error:", error);
    });
};
