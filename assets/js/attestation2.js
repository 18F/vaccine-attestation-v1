var qrcode = null;

var qrcodeElement = document.getElementById("qrcode");
var attestation = document.getElementById("attestation");
var uuid = document.getElementById("uuid");
var docu = document.getElementById("attestation-document");
var mask_alert = document.getElementById("mask-alert");
var uuid_value = generateId(40);
var optional_text = "The individual bearing this attestation may choose not to wear a mask depending on local conditions and the preferences of those around them.";
var required_text = "The individual bearing this attestation should wear a mask regardless of local conditions.";

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0")
  }
  
  // generateId :: Integer -> String
  function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

function makealert(type) {
    d1 = document.createElement("div");
    d1.classList.add("usa-alert__body");
    h4 = document.createElement("h4");

    h4.classList.add("usa-alert__heading");
    h4.text = "MASK " + type;
    
    p = document.createElement("p");
    if (type == "OPTIONAL") {
        h4.innerHTML = "MASK OPTIONAL";
        p.innerHTML = optional_text;
        mask_alert.classList.add("usa-alert--success");
        mask_alert.classList.remove("usa-alert--warning");
    } else {
        h4.innerHTML = "MASK REQUIRED";
        p.innerHTML = required_text;
        mask_alert.classList.add("usa-alert--warning");   
        mask_alert.classList.remove("usa-alert--success"); 
    }

    d1.appendChild(h4);
    d1.appendChild(p);
    
    removeAllChildNodes(mask_alert);
    mask_alert.appendChild(d1);

    uuid_value = generateId(40);
    //uuid.innerHTML = generateId(40);
}


function determine_behavior(attestation) {
  switch(attestation) {
    case "FULLYVACCINATED": makealert("OPTIONAL"); return "NOMASK";
    // case "PARTIALLYVACCINATED": return "MASK";
    // case "NOTVACCINATED": return "MASK";
    // case "ACCOMMODATION": return "MASK";
    // case "PREFERNOT": return "MASK";
  }
  makealert("REQUIRED");
  return "MASK";
}

function generate_attestation_qr() {
  if (qrcode) {
    // prevent multiple submissions
    qrcode.clear();
    qrcodeElement.innerHTML = "";
  }
  docu.style.visibility = "visible";

  var behavior = determine_behavior(attestation.value);
  console.log("behavior", behavior)
  qrcode = new QRCode(qrcodeElement, {
  text: JSON.stringify({ behavior: behavior, uuid: uuid_value }),
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });


}