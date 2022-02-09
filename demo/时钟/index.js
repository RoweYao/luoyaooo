/*
 * @Author: luoyaoooo
 * @Date: 2022-01-26 11:24:07
 * @LastEditors: luoyaoooo
 * @LastEditTime: 2022-02-09 15:49:28
 */
const CLOCK_HOUR = document.getElementById("clock-hour");
const CLOCK_MINUTE = document.getElementById("clock-minute");
const CLOCK_SECOND = document.getElementById("clock-second");

function setHour(date) {
    const m = date.getMinutes();
    const h = date.getHours();
    CLOCK_HOUR.style.transform = `rotate(${h * 30 + m * 0.5}deg)`;
}
function setMinute(date) {
    const m = date.getMinutes();
    const s = date.getSeconds();
    CLOCK_MINUTE.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
}

function setSecond(date) {
    const s = date.getSeconds();
    CLOCK_SECOND.style.transform = `rotate(${s * 6}deg)`;
}
(function initClock() {
    let hideClock = true;
    setInterval(() => {
        let date = new Date();
        setHour(date);
        setMinute(date);
        setSecond(date);
        if (hideClock) {
            console.log("显示时钟");
            let clockDom =
                document.getElementsByClassName("clock-wrap_hide")[0];
            clockDom.setAttribute("class", "clock-wrap");
            hideClock = false;
        }
    }, 1000);
})();
