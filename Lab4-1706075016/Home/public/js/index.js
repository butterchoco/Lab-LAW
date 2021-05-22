const documentsList = document.querySelector(".documents-available");

fetch("/drive", {
  method: "GET",
})
  .then((response) => response.json())
  .then(({ files }) => {
    let html = "";
    for (const file of files) {
      html += `<li><a href="/upload/${file}">${file}</a></li>`;
    }
    documentsList.innerHTML = html;
  })
  .catch((error) => {
    alert(error);
    console.error("Error:", error);
  });
