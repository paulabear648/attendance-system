// 今開いてるページの文字だけ黒くする
const registerPageNav: HTMLElement | null = document.getElementById("register");
console.log(registerPageNav?.textContent);
registerPageNav?.classList.add("active");
