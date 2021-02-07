// 地图对象
let MAP = null;

window.maponload = () => {
    initPage();
};
function initPage() {
    console.log(2222);
    MAP = new AMap.Map("amap-map");
    driving();
}
function driving() {
    AMap.plugin("AMap.Driving", function () {
        //异步加载插件
        var driving = new AMap.Driving({
            map: MAP,
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.search(
            new AMap.LngLat(116.379028, 39.865042),
            new AMap.LngLat(116.427281, 39.903719),
            function (status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === "complete") {
                    console.log("绘制驾车路线完成", result);
                } else {
                    console.log("获取驾车数据失败：" + result);
                }
            }
        );
    });
}
