// 测试用图片
// https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=182623993,1093186456&fm=27&gp=0.jpg
// http://dev130.bncwork.com/bnc_rest/space/5ed79ee70bbb044c66c7c026
// http://dev130.bncwork.com/bnc_rest/space/5fdc1ecd2aa7122be6cc9664

const vm = new Vue({
    el: "#vueData",
    data() {
        return {
            imgList: [
                // {
                //     src:
                //         "http://dev130.bncwork.com/bnc_rest/space/5ed79ee70bbb044c66c7c026",
                //     mainColor: [
                //         {
                //             color: "rgba(54, 49, 76, 1)",
                //             weight: 14.587440157702055,
                //         },
                //         {
                //             color: "rgba(252, 226, 211, 1)",
                //             weight: 14.186144747958322,
                //         },
                //         {
                //             color: "rgba(65, 47, 43, 1)",
                //             weight: 13.53139960574486,
                //         },
                //         {
                //             color: "rgba(247, 213, 198, 1)",
                //             weight: 3.6398197690791325,
                //         },
                //     ],
                // },
            ],
            newImg: "",
        };
    },
    methods: {
        getImgData() {
            if (!this.newImg) return;
            let img = new Image();
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");

            img.onload = () => {
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                img.style.display = "none";
                let imgData = ctx.getImageData(0, 0, img.width, img.height)
                    .data;
                this.dealwithImgData(imgData);
            };
            img.onerror = () => {
                alert("图片加载失败，请检查图片路径是否正确。");
            };
            img.src = this.newImg;
            img.crossOrigin = "anonymous";
        },
        dealwithImgData(imgData) {
            const rgbaList = [];
            const len = imgData.length;
            for (let i = 0, j = 0; i < len; i += 4, j++) {
                rgbaList[j] = `rgba(${imgData[i]}, ${imgData[i + 1]}, ${
                    imgData[i + 2]
                }, ${imgData[i + 3] / 255})`;
            }
            // console.log(rgbaList);
            this.getMainColor(rgbaList);
        },
        getMainColor(rgbaList) {
            const total = rgbaList.length;
            const colorWeight = {};
            let colorTotal = 0; // 颜色总数
            rgbaList.forEach((item) => {
                if (colorWeight[item]) {
                    colorWeight[item].sum++;
                } else {
                    colorWeight[item] = {
                        sum: 1,
                        weight: 0,
                        index: colorTotal,
                    };
                    colorTotal++;
                }
            });
            for (let key in colorWeight) {
                if (key === "rgba(0, 0, 0, 0)") {
                    delete colorWeight[key];
                    continue;
                }
                const item = colorWeight[key];
                item.weight = (item.sum / total) * 100;
            }
            let colorArr = [];
            for (let key in colorWeight) {
                const item = colorWeight[key];
                const index = item.index;
                colorArr[index] = {
                    color: key,
                    weight: item.weight,
                };
            }
            // console.log(colorWeight);
            colorArr.sort(this.sortByKey("weight"));
            console.log(colorArr);
            mainColor = colorArr.splice(0, 4);
            this.imgList.push({
                src: this.newImg,
                mainColor: mainColor,
            });
            this.newImg = "";
        },
        sortByKey(key) {
            console.log("开始排序");
            return (a, b) => {
                return b[key] - a[key];
            };
        },
        isWhite(color) {},
    },
    mounted() {},
});
