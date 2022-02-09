const vm = new Vue({
    el: "#vueData",
    data() {
        return {
            date: new Date(),
        };
    },
    methods: {
        dateInput() {
            let arr = this.date.split("-");
            console.log(this.date);
            console.log(judgeFestival(arr[0], arr[1] - 1, arr[2]));
        },
    },
    mounted() {
        let date = new Date();
        this.date =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
    },
});
/*定义公历节日*/
var sFtv = new Array(
    "0101 元旦",
    "0214 情人节",
    "0307 女生节",
    "0308 妇女节",
    "0312 植树节",
    "0401 愚人节",
    "0404 清明节",
    "0501 劳动节",
    "0504 青年节",
    "0601 儿童节",
    "0701 建党节",
    "0801 建军节",
    "0910 教师节",
    "1001 国庆节",
    "1031 万圣节",
    "1224 平安夜", //
    "1225 圣诞节" //
);
function solarFestival(y, m, d) {
    let solarF = "";
    // 公历节日
    for (i in sFtv) {
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
            if (Number(RegExp.$1) == m + 1 && Number(RegExp.$2) == d) {
                solarF = RegExp.$4;
            }
        }
    }
    return solarF;
}
// //判断某一天是什么节日
// // judgeFestival(2020, 1, 1); //元旦

// //定义周历节日
//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
    "0420 复活节", //在每年春分月圆之后第一个星期日 耶穌受難節是復活節前一个星期五
    "0520 母亲节", //每年5月的第二个星期日
    "0950 世界心脏日", //最后一个星期日
    "0630 父亲节", //每年公历6月的第三个星期日
    "1144 感恩节" //1月的第四个星期四庆祝感恩节
);
// 周节日
function weekFestival(y, m, d) {
    let weekF = "";
    m++;
    for (i in wFtv) {
        if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
            if (Number(RegExp.$1) == m) {
                var firstWeek = new Date(y + "/" + m + "/" + "01").getDay();
                tmp1 = Number(RegExp.$2);
                tmp2 = Number(RegExp.$3);
                if (tmp1 < 5) {
                    var day =
                        (firstWeek > tmp2 ? 7 : 0) +
                        7 * (tmp1 - 1) +
                        tmp2 -
                        firstWeek +
                        1;
                    if (d == day) {
                        weekF = RegExp.$5;
                    }
                } else {
                    tmp1 -= 5;
                    var nowMonthTime = new Date(
                        y + "/" + m + "/" + "01"
                    ).getTime();
                    var nextMonthTime = new Date(
                        y + "/" + (m + 1) + "/" + "01"
                    ).getTime();
                    var countDays =
                        (nextMonthTime - nowMonthTime) / 24 / 60 / 60 / 1000;
                    tmp3 = (firstWeek + countDays - 1) % 7; //当月最后一天星期几
                    var day =
                        countDays -
                        tmp3 -
                        7 * tmp1 +
                        tmp2 -
                        (tmp2 > tmp3 ? 7 : 0);
                    if (d == day) {
                        weekF = RegExp.$5;
                    }
                }
            }
    }
    return weekF;
}
// //判断某一天是什么节日
// // judgeFestival(2020, 5, 10); //母亲节

// 1900-2100年份
var lunarInfo = new Array(
    0x4bd8,
    0x4ae0,
    0xa570,
    0x54d5,
    0xd260,
    0xd950,
    0x5554,
    0x56af,
    0x9ad0,
    0x55d2,
    0x4ae0,
    0xa5b6,
    0xa4d0,
    0xd250,
    0xd295,
    0xb54f,
    0xd6a0,
    0xada2,
    0x95b0,
    0x4977,
    0x497f,
    0xa4b0,
    0xb4b5,
    0x6a50,
    0x6d40,
    0xab54,
    0x2b6f,
    0x9570,
    0x52f2,
    0x4970,
    0x6566,
    0xd4a0,
    0xea50,
    0x6a95,
    0x5adf,
    0x2b60,
    0x86e3,
    0x92ef,
    0xc8d7,
    0xc95f,
    0xd4a0,
    0xd8a6,
    0xb55f,
    0x56a0,
    0xa5b4,
    0x25df,
    0x92d0,
    0xd2b2,
    0xa950,
    0xb557,
    0x6ca0,
    0xb550,
    0x5355,
    0x4daf,
    0xa5b0,
    0x4573,
    0x52bf,
    0xa9a8,
    0xe950,
    0x6aa0,
    0xaea6,
    0xab50,
    0x4b60,
    0xaae4,
    0xa570,
    0x5260,
    0xf263,
    0xd950,
    0x5b57,
    0x56a0,
    0x96d0,
    0x4dd5,
    0x4ad0,
    0xa4d0,
    0xd4d4,
    0xd250,
    0xd558,
    0xb540,
    0xb6a0,
    0x95a6,
    0x95bf,
    0x49b0,
    0xa974,
    0xa4b0,
    0xb27a,
    0x6a50,
    0x6d40,
    0xaf46,
    0xab60,
    0x9570,
    0x4af5,
    0x4970,
    0x64b0,
    0x74a3,
    0xea50,
    0x6b58,
    0x5ac0,
    0xab60,
    0x96d5,
    0x92e0,
    0xc960,
    0xd954,
    0xd4a0,
    0xda50,
    0x7552,
    0x56a0,
    0xabb7,
    0x25d0,
    0x92d0,
    0xcab5,
    0xa950,
    0xb4a0,
    0xbaa4,
    0xad50,
    0x55d9,
    0x4ba0,
    0xa5b0,
    0x5176,
    0x52bf,
    0xa930,
    0x7954,
    0x6aa0,
    0xad50,
    0x5b52,
    0x4b60,
    0xa6e6,
    0xa4e0,
    0xd260,
    0xea65,
    0xd530,
    0x5aa0,
    0x76a3,
    0x96d0,
    0x4afb,
    0x4ad0,
    0xa4d0,
    0xd0b6,
    0xd25f,
    0xd520,
    0xdd45,
    0xb5a0,
    0x56d0,
    0x55b2,
    0x49b0,
    0xa577,
    0xa4b0,
    0xaa50,
    0xb255,
    0x6d2f,
    0xada0,
    0x4b63,
    0x937f,
    0x49f8,
    0x4970,
    0x64b0,
    0x68a6,
    0xea5f,
    0x6b20,
    0xa6c4,
    0xaaef,
    0x92e0,
    0xd2e3,
    0xc960,
    0xd557,
    0xd4a0,
    0xda50,
    0x5d55,
    0x56a0,
    0xa6d0,
    0x55d4,
    0x52d0,
    0xa9b8,
    0xa950,
    0xb4a0,
    0xb6a6,
    0xad50,
    0x55a0,
    0xaba4,
    0xa5b0,
    0x52b0,
    0xb273,
    0x6930,
    0x7337,
    0x6aa0,
    0xad50,
    0x4b55,
    0x4b6f,
    0xa570,
    0x54e4,
    0xd260,
    0xe968,
    0xd520,
    0xdaa0,
    0x6aa6,
    0x56df,
    0x4ae0,
    0xa9d4,
    0xa4d0,
    0xd150,
    0xf252,
    0xd520
);
// var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

//定义农历节日
var lFtv = new Array(
    "0101 春节",
    "0115 元宵节",
    "0505 端午节",
    "0707 七夕",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1223 小年"
);
/**************************************************************
                                      日期计算
**************************************************************/

//返回农历 y年的总天数
function lYearDays(y) {
    var i,
        sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += lunarInfo[y - 1900] & i ? 1 : 0;
    return sum + leapDays(y);
}

//返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return (lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29;
    else return 0;
}

//返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
    var lm = lunarInfo[y - 1900] & 0xf;
    return lm == 0xf ? 0 : lm;
}

//返回农历 y年m月的总天数
function monthDays(y, m) {
    return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
}

//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
class Dianaday {
    constructor(objDate) {
        var i,
            leap = 0,
            temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            this.monCyl += 12;
        }
        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = leapMonth(i); //闰哪个月
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == leap + 1 && this.isLeap == false) {
                //闰月
                --i;
                this.isLeap = true;
                temp = leapDays(this.year);
            } else {
                temp = monthDays(this.year, i);
            }
            if (this.isLeap == true && i == leap + 1) this.isLeap = false; //解除闰月
            offset -= temp;
            if (this.isLeap == false) this.monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) {
                this.isLeap = false;
            } else {
                this.isLeap = true;
                --i;
                --this.monCyl;
            }
        if (offset < 0) {
            offset += temp;
            --i;
            --this.monCyl;
        }
        this.month = i;
        this.day = Math.floor(offset + 1);
    }
}
//返回公历y年m+1月的天数
// function solarDays(y, m) {
//     if (m == 1) return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
//     else return solarMonth[m];
// }
// //记录公历和农历某天的日期
// class calElement {
//     constructor(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap) {
//         this.isToday = false;
//         //公历
//         this.sYear = sYear;
//         this.sMonth = sMonth;
//         this.sDay = sDay;
//         this.week = week;
//         //农历
//         this.lYear = lYear;
//         this.lMonth = lMonth;
//         this.lDay = lDay;
//         this.isLeap = isLeap;
//         //节日记录
//         this.lunarFestival = ""; //农历节日
//         this.solarFestival = ""; //公历节日
//         this.solarTerms = ""; //节气
//     }
// }
// //保存y年m+1月的相关信息
// var fat = 9;
// var mat = 9;
// var eve = 0;
// var nStr1 = [
//     "星期日",
//     "星期一",
//     "星期二",
//     "星期三",
//     "星期四",
//     "星期五",
//     "星期六",
// ];
// class calendar {
//     constructor(y, m) {
//         fat = mat = 0;
//         var sDObj,
//             lDObj,
//             lY,
//             lM,
//             lD = 1,
//             lL,
//             lX = 0,
//             tmp1,
//             tmp2;
//         var lDPOS = new Array(3);
//         var n = 0;
//         var firstLM = 0;
//         sDObj = new Date(y, m, 1); //当月第一天的日期
//         this.length = solarDays(y, m); //公历当月天数
//         this.firstWeek = sDObj.getDay(); //公历当月1日星期几
//         if (m + 1 == 5) {
//             fat = sDObj.getDay();
//         }
//         if (m + 1 == 6) {
//             mat = sDObj.getDay();
//         }
//         for (var i = 0; i < this.length; i++) {
//             if (lD > lX) {
//                 sDObj = new Date(y, m, i + 1); //当月第一天的日期
//                 lDObj = new Dianaday(sDObj); //农历
//                 lY = lDObj.year; //农历年
//                 lM = lDObj.month; //农历月
//                 lD = lDObj.day; //农历日
//                 lL = lDObj.isLeap; //农历是否闰月
//                 lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天
//                 if (lM == 12) {
//                     eve = lX;
//                 }
//                 if (n == 0) firstLM = lM;
//                 lDPOS[n++] = i - lD + 1;
//             }
//             this[i] = new calElement(
//                 y,
//                 m + 1,
//                 i + 1,
//                 nStr1[(i + this.firstWeek) % 7],
//                 lY,
//                 lM,
//                 lD++,
//                 lL
//             );
//         }
//     }
// }

function lunarFestival(y, m, d) {
    let c = new Dianaday(new Date(y, m, d));
    let lm = c.month;
    let ld = c.day;
    let lunarF = "";
    let lunar = {
        lyear: c.year,
        lmonth: c.month,
        lday: c.day,
    };
    console.log(c);
    // 农历节日
    for (let i in lFtv) {
        if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            if (Number(RegExp.$1) == lm && Number(RegExp.$2) == ld) {
                lunar = RegExp.$4;
            }
        }
    }
    return { lunarF, lunar };
}

//判断某一天是什么节日
// judgeFestival(2020, 10, 25); //重阳节

// 二十四节气
function solarTermsFestival(y, m, d) {
    var solarTerm = new Array(
        "小寒",
        "大寒",
        "立春",
        "雨水",
        "惊蛰",
        "春分",
        "清明",
        "谷雨",
        "立夏",
        "小满",
        "芒种",
        "夏至",
        "小暑",
        "大暑",
        "立秋",
        "处暑",
        "白露",
        "秋分",
        "寒露",
        "霜降",
        "立冬",
        "小雪",
        "大雪",
        "冬至"
    );
    var sTermInfo = new Array(
        0,
        21208,
        42467,
        63836,
        85337,
        107014,
        128867,
        150921,
        173149,
        195551,
        218072,
        240693,
        263343,
        285989,
        308563,
        331033,
        353350,
        375494,
        397447,
        419210,
        440795,
        462224,
        483532,
        504758
    );
    var mon = m;
    var solarTerms = "";
    // while (solarTerms == "") {
    var sotmp1 = new Date(
        31556925974.7 * (y - 1900) +
            sTermInfo[mon * 2 + 1] * 60000 +
            Date.UTC(1900, 0, 6, 2, 5)
    );
    var sotmp2 = sotmp1.getUTCDate(); //根据世界时返回一个月 (UTC) 中的某一天
    if (sotmp2 == d) {
        solarTerms = solarTerm[mon * 2 + 1];
        return solarTerms;
    }
    sotmp1 = new Date(
        31556925974.7 * (y - 1900) +
            sTermInfo[mon * 2] * 60000 +
            Date.UTC(1900, 0, 6, 2, 5)
    );
    sotmp2 = sotmp1.getUTCDate();
    if (sotmp2 == d) {
        solarTerms = solarTerm[mon * 2];
        return solarTerms;
    }
    return solarTerms;
}
//判断某一天是什么节气
// judgeFestival(2020, 11, 7); //立冬
function judgeFestival(y, m, d) {
    console.log(y, m, d);
    let solar = solarFestival(y, m, d);
    let lunar = lunarFestival(y, m, d);
    let week = weekFestival(y, m, d);
    let solarTerms = solarTermsFestival(y, m, d);
    return { solar, lunar, week, solarTerms };
}
