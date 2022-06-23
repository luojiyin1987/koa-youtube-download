const downloadBtn = document.querySelector(".download-button");
const URLinput = document.querySelector(".URL-input");
const goFinishBtn = document.querySelector(".ok-button");

downloadBtn.addEventListener("click", () => {
  console.log(`URL: ${URLinput.value}`);
  sendURL(URLinput.value);
});

goFinishBtn.addEventListener("click", () => {
  goToFinish();
});

function goToFinish() {
  window.location.href = window.location.href + "downloaded";
}

function sendURL(URL) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "download", true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.responseText == 1) {
        alert("download finished");
      } else {
        alert(xhr.responseText);
      }
    }
  };

  const data = { URL: URL };
  xhr.send(JSON.stringify(data));
}
