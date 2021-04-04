// const API_URL = "http://localhost:3000";
const API_URL = "https://476e5b86b03a.ngrok.io";

const loadingClassName = "qrg-container--loading";
const $form = document.querySelector(".qrg-form");
const $input = document.querySelector(".qrg-input");
const qrContainer = () => document.querySelector(".qrg-container");

var qrValue = "";

function clearQR() {
  while (qrContainer().firstChild) {
    qrContainer().removeChild(qrContainer().firstChild);
  }
}

function toggleLoading(boolean = false) {
  const method = boolean ? "add" : "remove";
  qrContainer().classList[method](loadingClassName);
}

const renderQrCode = (base64) => {
  clearQR();
  const img = Object.assign(document.createElement("img"), {
    src: base64,
    classList: "qr-code",
    alt: "qr-code generator",
    title: qrValue,
  });
  qrContainer().appendChild(img);
};

async function generateQrCode(e) {
  if (e) {
    e.preventDefault();
  }
  if (!qrValue) {
    return;
  }
  toggleLoading(true);
  const reqUrl = `${API_URL}/to-qr?text=${qrValue}`;
  const response = await fetch(reqUrl);
  const { base64, msg } = await response.json();
  if (msg && base64) {
    renderQrCode(base64);
  }
  toggleLoading(false);

  if (confirm("Dowload generated qr-code?")) {
    Object.assign(document.createElement("a"), {
      href: base64,
      download: "download",
    }).click();
  }
}

function inputHandler({ target: { value } }) {
  qrValue = value?.trim() || "";
  if (!qrValue) {
    clearQR();
    return;
  }
}

$input.addEventListener("input", inputHandler);
