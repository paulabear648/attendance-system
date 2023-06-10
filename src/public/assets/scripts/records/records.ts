// 今開いてるページの文字だけ黒くする
const recordsPageNav: HTMLElement | null = document.getElementById("log");
console.log(recordsPageNav?.textContent);
recordsPageNav?.classList.add("active");
