<template>
    <div class="leftCenterChart">
        <div class="chart">
            <my-chart :width="420" :height="225" :option="state.option" @lineClick="lineClick"></my-chart>
        </div>
        <leftCenterPopUp :show-model="state.showModel" :tableData="state.tableData" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import leftCenterPopUp from '../popup/leftCenterPopUp.vue'
import emitBus from "@utils/bus";
import { data } from '../json/leftCenterTable'
const state = reactive({
    option: {},
    xData: [
        "1月",
        "1-2月",
        "1-3月",
        "1-4月",
        "1-5月",
        "1-6月",
        "1-7月",
        "1-8月",
        "",
        "",
        "",
        "",
    ],
    title: ["本月数", "本年累计", "比增"],
    colorList: ["#EBAC23", "#0BE6E6", "#3C97F1"],
    showModel: false,
    tableData: [],
    activeLine: 0
});
onMounted(() => {
    init();
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
});
const lineClick = (params) => {
    state.activeLine = params.dataIndex + 1
    state.showModel = true
    state.tableData = data[`dataList${params.dataIndex + 1}`]
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
            right: "45",
            top: "50",
            bottom: "40",
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
            right: "50",
            top: "20",
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
                name: "单位(万元)",
                min: 0,
                max: 3000,
                interval: 500,
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
                name: "%",
                min: 0,
                max: 18,
                interval: 3,
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
                name: "本月数",
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
                barGap: "60%",
            },
            {
                name: "本年累计",
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
                barGap: "60%",
            },
            {
                name: "比增",
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
    let objDataList = [
        {
            title: '本月数',
            data: [339.73, 364.44, 383.23, 380.31, 380.1, 394.98, 359.38, 362.97]
        },
        {
            title: '本年累计',
            data: [339.73, 704.18, 1087.41, 1467.7, 1847.49, 2242.77, 2602.14, 2965.11]
        },
        {
            title: '比增',
            data: [15.16, 16.8, 12.56, 11.81, 10.36, 9.18, 11.44, 12.08]
        }
    ]
    state.option.series.forEach((item, index) => {
        item.data = objDataList[index].data
        // for (let i = 0; i < 12; i++) {
        //     let randomNum = Math.floor(Math.random() * 1201);
        //     item.data.push(randomNum);
        // }
    });
    console.log(state.option.series);
};
</script>
    
<style lang="scss" scoped>
.leftCenterChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 420px;
    height: 218px;
    box-sizing: border-box;
}
</style>