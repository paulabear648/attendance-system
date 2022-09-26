/* const password = document.getElementById("password") as HTMLElement;

password.addEventListener(
  "change",
  function (): void {
    const form = document.getElementById("password") as HTMLInputElement;
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

// function set2fig(num) {
//   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
//   var ret;
//   if( num < 10 ) { ret = "0" + num; }
//   else { ret = num; }
//   return ret;
// }
// function showClock() {
//   var nowTime = new Date();
//   var nowHour = set2fig( nowTime.getHours() );
//   var nowMin  = set2fig( nowTime.getMinutes() );
//   var nowSec  = set2fig( nowTime.getSeconds() );
//   var msg = "現在時刻は、" + nowHour + ":" + nowMin + ":" + nowSec + " です。";
//   document.querySelector("RealtimeClockArea").innerText = msg;
// }
// setInterval('showClock()',1000);

window.onload = function () {
  setTimeout(() => {
    const loader = document.querySelector(".loader") as HTMLElement;
    loader.classList.add("loaded");

    const content = document.querySelector(".content") as HTMLElement;
    content.style.visibility = "visible";
  }, 1300);
};
