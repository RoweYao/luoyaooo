// 获取当前时间
const TODAY = new Date(new Date().toLocaleDateString());

// 当前展示时间
let SHOWDATE = new Date("2019-11-11");
// 当前展示月份
let SHOWMONTH = new Date(TODAY);

// 头部年份 dom
const HYEAR = document.getElementById("hyear");

// 头部日期
const HMONTHDAY = document.getElementById("hmonthday");

// 控制器部分日期
const CMONTHDAY = document.getElementById("cmonthday");

// 具体日期
const DAYS = document.getElementById("days");

/**
 * 返回年格式 xxxx
 * @param {Date} date 当前选中时间
 */
function getYear(date) {
    return date.getFullYear();
}
// prettier-ignore
/**
 * 阿拉伯数字转中文
 * @param {Number} num 需要转换的数字
 */
function numToChinese (num) {
  switch (num) {
    case 0:
      return '日'
    case 1:
      return '一'
    case 2:
      return '二'
    case 3:
      return '三'
    case 4:
      return '四'
    case 5:
      return '五'
    case 6:
      return '六'
    case 7:
      return '七'
    case 8:
      return '八'
    case 9:
      return '九'
    case 10:
      return '十'
    case 11:
      return '十一'
    case 12:
      return '十二'
    default:
      return '' 
  }
}

/**
 * 日期点击事件
 * @param {Number} index 当前点击的日期在日期列表中的位置
 * @param {Number} date 当前点击的日期
 */
function clickDate(index, date) {
    for (let i = 0; i < 35; i++) {
        DAYS.children[i].classList.value.indexOf("active") !== -1 &&
            DAYS.children[i].classList.remove("active");
        // DAYS.children[index].
        i === index && DAYS.children[i].classList.add("active");
    }
    // let oldDate = new Date(SHOWDATE)
    let clickDate = new Date(SHOWMONTH);
    clickDate = new Date(clickDate.setDate(date));

    // 更改头部日期
    updateHeaderYear(SHOWMONTH);
    updateHeaderDate(clickDate);
}

/**
 * 更改头部年份
 * @param {Date} date 当前选中时间
 */
function updateHeaderYear(date) {
    // const hyear = document.getElementById('hyear')
    // console.log(Number(HYEAR.innerText) < getYear(date))
    const oldYear = getYear(new Date(SHOWDATE));
    if (getYear(date) !== Number(HYEAR.innerText)) {
        HYEAR.innerText = getYear(date);
        oldYear < getYear(date)
            ? slide(HYEAR, "slideUp")
            : slide(HYEAR, "slideDown");
    }
}

/**
 * 更改头部日期
 * @param {Date} date 当前选中时间
 */
function updateHeaderDate(date) {
    const oldDate = new Date(SHOWDATE);
    // const nowDate = date
    if (oldDate.getTime() === date.getTime()) return;

    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const week = numToChinese(date.getDay());
    // console.log(month + '-' + day + ' ' + '星期' + week)
    HMONTHDAY.innerText = month + "-" + day + " " + "星期" + week;
    // console.log(oldDate.getTime(), clickDate.getTime())

    if (oldDate.getTime() < date.getTime()) {
        slide(HMONTHDAY, "slideUp");
    } else {
        slide(HMONTHDAY, "slideDown");
    }
    SHOWDATE = new Date(date);
}

/**
 * 更改控制部分日期
 * @param {Date} date 当前选中时间
 */
function updateControlDate(date) {
    const year = getYear(date);
    const month = numToChinese(date.getMonth() + 1);
    CMONTHDAY.innerText = year + "年" + month + "月";
}

/**
 * 更改主体部分日期
 * @param {Date} date 当前传入时间
 */
function updateDays(date) {
    const copy = new Date(date);
    // 获取当月第一天是星期几
    const firstDay = new Date(copy.setDate(1)).getDay();

    // 获取当月一共有多少天
    const lastDay = new Date(
        copy.getFullYear(),
        copy.getMonth() + 1,
        0
    ).getDate();
    // console.log(lastDay)
    // 获取今天的日子
    const today = TODAY.getTime();

    const len = DAYS.children.length;
    // console.log(len)

    // 填充好日期
    for (let i = 0; i < len; i++) {
        if (i < firstDay || i > lastDay + firstDay - 1) {
            DAYS.children[i].innerText = " ";
            DAYS.children[i].classList.add("empty");
            DAYS.children[i].onclick = null;
        } else {
            const innerDate = i + 1 - firstDay;
            // const innerDay = new Date(date.toLocaleDateString()).getTime()
            let innerDay = new Date(date);
            innerDay = new Date(
                new Date(innerDay.setDate(innerDate)).toLocaleDateString()
            ).getTime();
            DAYS.children[i].innerText = innerDate;
            DAYS.children[i].classList.value.indexOf("empty") !== -1 &&
                DAYS.children[i].classList.remove("empty");
            DAYS.children[i].classList.value.indexOf("active") !== -1 &&
                DAYS.children[i].classList.remove("active");
            DAYS.children[i].classList.value.indexOf("today") !== -1 &&
                DAYS.children[i].classList.remove("today");
            today === innerDay && DAYS.children[i].classList.add("today");
            DAYS.children[i].onclick = function () {
                clickDate(i, innerDate);
            };
        }
    }
}

/**
 * 添加过渡动画
 * @param {Element} dom 需要添加动画的dom
 * @param {String} keyframes 动画名称
 */
function slide(dom, keyframes) {
    if (dom.classList.value.indexOf(keyframes) !== -1) return;
    dom.classList.add(keyframes);
    setTimeout(() => {
        dom.classList.remove(keyframes);
    }, 300);
}

/**
 * 上一个月
 */
function prevMonth() {
    // 上一个月
    SHOWMONTH.setMonth(SHOWMONTH.getMonth() - 1);

    slide(CMONTHDAY, "slideLeft");
    slide(DAYS, "slideLeft");
    // 更改渲染
    // updateHeaderYear(SHOWMONTH)
    // updateHeaderDate(SHOWMONTH)
    updateControlDate(SHOWMONTH);
    updateDays(SHOWMONTH);
}

/**
 * 下一个月
 */
function nextMonth() {
    // 下一个月
    SHOWMONTH.setMonth(SHOWMONTH.getMonth() + 1);

    slide(CMONTHDAY, "slideRight");
    slide(DAYS, "slideRight");
    // 更改渲染
    // updateHeaderYear(SHOWMONTH)
    // updateHeaderDate(SHOWMONTH)
    updateControlDate(SHOWMONTH);
    updateDays(SHOWMONTH);
}

/**
 * 页面加载完成后执行函数
 */
function firstEnter() {
    //   SHOWMONTH = new Date(TODAY)
    updateHeaderYear(TODAY);
    updateHeaderDate(TODAY);
    updateControlDate(TODAY);
    updateDays(TODAY);
}

firstEnter();
