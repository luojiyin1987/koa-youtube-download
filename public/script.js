const downloadBtn = document.querySelector(".download-button");
const URLinput = document.querySelector(".URL-input");
const goFinishBtn = document.querySelector(".ok-button");

console.log('downloadBtn: ', downloadBtn, URLinput,goFinishBtn);
downloadBtn.addEventListener("click", () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});

goFinishBtn.addEventListener("click", () => {
    goToFinish();
});


function goToFinish() {
    window.location.href = window.location.href + 'download';
}

function sendURL(URL) {
    $.ajax({
        type: "POST",
        //the url where you want to sent the userName and password to
        url: "download",
        dataType: "application/json",
        async: true,
        //json object to sent to the authentication url
        data: { URL: URL },
        complete: function (text) {
            alert(text.responseText);
        }
    });
}