<template>
        <div class="rightCenterChart">
                <ul>
                        <li :class="state.active === 1 ? 'active' : ''" @click="tabClick(1)">固定资产投资</li>
                        <li :class="state.active === 2 ? 'active' : ''" @click="tabClick(2)">股份投资</li>
                </ul>
                <my-chart :width="420" :height="225" :option="state.option"></my-chart>
        </div>
</template>
        
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
const state = reactive({
        option: {},
        active: 1,
        xData: [
                "公航旅集团",
                "公交建集团",
                "铁投集团",
                "机场集团",
                "甘肃建投集团",
                "",
                "",
                "",
        ],
        title: ["投资计划总金额", "实际投资总金额", "当月投资金额", "完成比例"],
        colorList: ["#0BE6E6", "#EBAC23", "#F1606C", "#3C97F1"],
        showModel: false,
        tableData: [],
        activeLine: 0
});
onMounted(() => {
        init();
});
const tabClick = (avtive) => {
        state.active = avtive
}
// legenData处理
const legendData = () => {
        return state.title.map((item, index) => {
                return {
                        name: item,
                        itemStyle: {
                                color: state.colorList[index],
                        },
                };
        });
};
const init = () => {
        state.option = {
                grid: {
                        left: "50",
                        right: "25",
                        top: "95",
                        bottom: "20",
                },
                tooltip: {
                        backgroundColor: "rgba(255,255,255,.1)",
                        textStyle: {
                                color: "#fff", // 设置文本颜色，可根据需要调整
                        },
                        borderColor: "transparent",
                        extraCssText: "backdrop-filter: blur(8px);",
                        trigger: "axis",
                        axisPointer: {
                                type: "cross",
                                crossStyle: {
                                        color: "#999",
                                },
                        },
                },
                legend: {
                        data: legendData(),
                        textStyle: {
                                color: "#fff",
                                fontSize: 12,
                        },
                        left: "20",
                        top: "45",
                        itemWidth: 12, // 图例标记的宽度
                        itemHeight: 6, // 图例标记的高度
                },
                toolbox: {
                        show: false,
                        feature: {
                                dataView: { show: true, readOnly: false },
                                magicType: { show: true, type: ["line", "bar"] },
                                restore: { show: true },
                                saveAsImage: { show: true },
                        },
                },
                xAxis: [
                        {
                                type: "category",
                                data: state.xData,
                                axisTick: {
                                        alignWithLabel: true,
                                },
                                axisPointer: {
                                        type: "shadow",
                                },
                                axisLabel: {
                                        color: "#fff",
                                        fontSize: 12,
                                        interval: 0
                                },
                                axisTick: {
                                        show: false,
                                },
                                axisLine: {
                                        // 设置x轴的颜色
                                        lineStyle: {
                                                color: "#4CB3F3",
                                        },
                                },
                        },
                ],
                yAxis: [
                        {
                                type: "value",
                                name: "单位(亿元)",
                                min: 0,
                                max: 400,
                                interval: 100,
                                splitLine: {
                                        show: true,
                                        lineStyle: {
                                                type: "dashed",
                                                width: 1,
                                                opacity: 0.3,
                                                color: ["#4CB3F3"],
                                        },
                                },
                                axisLabel: {
                                        color: "#fff",
                                        fontSize: 12,
                                },
                                nameTextStyle: {
                                        color: "#fff",
                                        fontSize: 12,
                                },
                        },
                        {
                                type: "value",
                                name: "单位(%)",
                                min: 0,
                                max: 80,
                                interval: 20,
                                splitLine: {
                                        show: true,
                                        lineStyle: {
                                                type: "dashed",
                                                width: 1,
                                                opacity: 0.3,
                                                color: ["#4CB3F3"],
                                        },
                                },
                                axisLabel: {
                                        color: "#fff",
                                        fontSize: 12,
                                },
                                nameTextStyle: {
                                        color: "#fff",
                                        fontSize: 12,
                                },
                        },
                ],
                series: [
                        {
                                name: "投资计划总金额",
                                type: "bar",
                                barWidth: 6,
                                tooltip: {
                                        valueFormatter: function (value) {
                                                return value + " (万元)";
                                        },
                                },
                                itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
                                                { offset: 1, color: "rgba(235,172,35,0)" }, // 渐变终止颜色
                                        ]),
                                        borderRadius: [3, 3, 0, 0],
                                },
                                barGap: "80%",
                        },
                        {
                                name: "实际投资总金额",
                                type: "bar",
                                barWidth: 6,
                                tooltip: {
                                        valueFormatter: function (value) {
                                                return value + " (万元)";
                                        },
                                },
                                itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                                                { offset: 1, color: "rgba(11, 230, 230, 0)" }, // 渐变终止颜色
                                        ]),
                                        borderRadius: [3, 3, 0, 0],
                                },
                                barGap: "80%",
                        },
                        {
                                name: "当月投资金额",
                                type: "bar",
                                barWidth: 6,
                                tooltip: {
                                        valueFormatter: function (value) {
                                                return value + " (万元)";
                                        },
                                },
                                itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                                                { offset: 1, color: "rgba(11, 230, 230, 0)" }, // 渐变终止颜色
                                        ]),
                                        borderRadius: [3, 3, 0, 0],
                                },
                                barGap: "80%",
                        },
                        {
                                name: "完成比例",
                                type: "line",
                                yAxisIndex: 1, // 指定使用第二个y轴
                                smooth: true,
                                tooltip: {
                                        valueFormatter: function (value) {
                                                return value + "%";
                                        },
                                },
                                itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                { offset: 0, color: "#3C97F1" }, // 渐变起始颜色
                                                { offset: 1, color: "rgba(60, 151, 241, 0)" }, // 渐变终止颜色
                                        ]),
                                },
                                lineStyle: {
                                        width: 4
                                },
                                symbol: "circle", // 圆点的形状
                                symbolSize: 6, // 圆点的大小
                                itemStyle: {
                                        color: "#3C97F1", // 圆点的颜色
                                        shadowColor: "#fff", // 阴影颜色
                                        shadowBlur: 4, // 阴影模糊程度
                                },
                                emphasis: {
                                        itemStyle: {
                                                borderColor: "#fff", // 圆点边框颜色
                                                borderWidth: 2, // 圆点边框宽度
                                        },
                                },
                        },
                ],
                dataZoom: {
                        show: true, // 为true 滚动条出现
                        realtime: true,
                        type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
                        start: 0, // 表示默认展示20%～80%这一段。
                        end: 60,
                        zoomOnMouseWheel: false,
                },
        };
        state.option.series.forEach((item, index) => {
                item.data = []
                for (let i = 0; i < 5; i++) {
                        let randomNum = Math.floor(Math.random() * (index !== 3 ? 400 : 80));
                        item.data.push(randomNum);
                }
        });
};
</script>
        
<style lang="scss" scoped>
.rightCenterChart {
        background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
        width: 432px;
        height: 230px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 50px;

        ul {
                display: flex;
                position: absolute;
                top: 16px;
                right: 10px;
                z-index: 100;

                li {
                        cursor: pointer;
                        font-size: 12px;
                        font-weight: normal;
                        line-height: 16px;
                        letter-spacing: 0em;
                        color: #FFFFFF;
                        padding: 4px 8px;
                }

                li.active {
                        border-radius: 15px;
                        background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
                        border: 1px solid;
                }
        }
}
</style>