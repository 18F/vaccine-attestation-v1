var qrcode = null;

var qrcodeElement = document.getElementById("qrcode");
var nameElement = document.getElementById("name");
var generateElement = document.getElementById("generate-qrcode");

nameElement.addEventListener("input", (el) => {
  if (el.target.value) {
    generateElement.removeAttribute("disabled");
  } else {
    generateElement.setAttribute("disabled", "disabled");
  }
});

generateElement.addEventListener("click", () => {
  if (qrcode) {
    // prevent multiple submissions
    qrcode.clear();
    qrcodeElement.innerHTML = "";
  }
  var name = nameElement.value;
  var status = name.startsWith("M") ? "OK" : "KO";
  qrcode = new QRCode(qrcodeElement, {
    text: JSON.stringify({ name, status }),
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
});
