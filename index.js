const sideBar = document.getElementsByClassName("SideBar")[0];
const iconButton = document.getElementsByName("sideBarIcon")[0];
const sideBarShowWindow = document.getElementsByName("sideBarShowWindow")[0];
const mainDiv = document.getElementsByClassName("Main")[0];
const floatWindow = document.getElementsByName("floatWindow")[0];
// 以下clipboard相关函数
function writeClipboard(value) {
    navigator.clipboard.writeText(value)
        .then(() => { alert('内容已复制到剪切板: ' + value); })
        .catch(err => { alert('无法复制文本: ' + err); });
}
// 以上clipboard相关函数
// 以下FloatWindow相关函数
let shouldClearFloatWindow = true;
function updateFloatWindow(event, value) {
    floatWindow.replaceChildren();
    if (value == null) {
        floatWindow.classList.add("hidden");
        return;
    }
    if (typeof (value) == typeof ([])) for (let i = 0; i < value.length; i++) floatWindow.innerHTML += `<a>${value[i]}</a>`;
    else floatWindow.innerHTML = `<a>${value}</a>`;
    let y = event.clientY - floatWindow.clientHeight;
    y = y < 0 ? 0 : y;
    floatWindow.style.left = event.clientX + 10 + "px";
    floatWindow.style.top = y + "px";
    shouldClearFloatWindow = false;
    floatWindow.classList.remove("hidden");
}
document.addEventListener("mousemove", function (e) { shouldClearFloatWindow = true; }, true);
document.addEventListener("mousemove", function (e) { if (shouldClearFloatWindow) updateFloatWindow(null); }, false);
// 以上FloatWindow相关函数
// 以下SideBar相关函数
let sideBarShowing = 0;
function updateSideBarShowWindow(msg) {
    if (sideBarShowing == msg) return null;
    if (msg == null) {
        sideBarShowWindow.replaceChildren();
        sideBarShowWindow.classList.add("hidden");
        sideBarShowing = 0;
        return null;
    }
    sideBarShowWindow.replaceChildren();
    sideBarShowWindow.top = "0";
    sideBarShowWindow.left = sideBar.clientWidth + "px";
    sideBarShowWindow.classList.remove("hidden");
    sideBarShowing = msg;
    return sideBarShowWindow;
}
iconButton.onmousemove = function (e) {
    const show = updateSideBarShowWindow("iconDevelopers");
    if (show == null) return;
    show.innerHTML = `
    <br />
    <a>开发者群 | Developers</a>
    <a><span>QQ: </span><span onclick="writeClipboard('123456789')" onmousemove="updateFloatWindow(event, '点击复制')">123456789</span></a>
    <br />
    `;
};
mainDiv.onmousemove = function (e) {
    if (sideBarShowing == 0) return;
    updateSideBarShowWindow(null);
};
// 以上SideBar相关函数