/* const pin = document.getElementById("pin") as HTMLElement;

pin.addEventListener(
  "change",
  function (): void {
    const form = document.getElementById("pin") as HTMLInputElement;
    const formValue = form.value;

    if (formValue.match(/[0-9]{1,4}/g) !== formValue) {
      (document.getElementById("alert") as HTMLElement).innerHTML =
        "数値以外は使用不可。";
    } else {
      (document.getElementById("alert") as HTMLElement).innerHTML = "OK。";
    }
  },
  false
);
*/

window.onload = function () {
  setTimeout(() => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loaded");

    const content = document.querySelector(".content");
    content.style.visibility = "visible";
  }, 1300);
};