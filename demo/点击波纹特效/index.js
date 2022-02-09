// 默认颜色
const DEFAULT_COLOR = "rgba(0, 152, 255, 0.78)";

// document.getElementById('ripple').onclick
/**
 * 点击波纹动画
 * @param {Object} event 需要生成点击动画的元素
 * @param {String} color 点击动画的颜色，可选
 * @param {Number} duration 点击动画持续时间，单位 ms 可选
 */
function clickRipple(event, color, duration) {
    console.log(event, color);
    let el = event.toElement;
    if (!el) {
        el = event.target;
    }
    const top = event.layerY || event.offsetY;
    const left = event.layerX || event.offsetX;

    // console.log(top, left)

    const ripple = document.createElement("div");
    ripple.setAttribute("class", "ripple-animation");
    ripple.style.left = left + "px";
    ripple.style.top = top + "px";
    ripple.style.backgroundColor = color || DEFAULT_COLOR;
    ripple.style.animationDuration = (duration || 400) / 1000 + "s";
    // console.log(ripple.style.top)

    el.appendChild(ripple);

    setTimeout(() => {
        el.removeChild(ripple);
    }, duration || 400);
}
