<template>
    <div class="chart">
        <my-chart :width="900" :height="206" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    colorList: ["#EBAC23", "#0BE6E6"],
    xData: ["2020", "2021", "2022"],
});

const init = () => {
    state.option = {
        grid: {
            left: "60",
            right: "20",
            top: "30",
            bottom: "50",
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
        xAxis: [
            {
                type: "category",
                data: state.xData,
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
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
                name: "",
                min: 0,
                max: 4000,
                interval: 1000,
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
        series: [{
            name: '单元',
            type: "line",
            smooth: true,
            lineStyle: {
                color: '#3C97F1',
            },
            symbol: "circle", // 圆点的形状
            symbolSize: 6, // 圆点的大小
            itemStyle: {
                color: '#3C97F1', // 圆点的颜色
                shadowColor: "#fff", // 阴影颜色
                shadowBlur: 4, // 阴影模糊程度
            },
            emphasis: {
                itemStyle: {
                    borderColor: "#fff", // 圆点边框颜色
                    borderWidth: 2, // 圆点边框宽度
                },
            },
            data: [3000,3400,2566],
            areaStyle: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: hexToRgb('#3C97F1', 0.3),
                        },
                        {
                            offset: 1,
                            color: hexToRgb('#3C97F1', 0),
                        },
                    ],
                    false
                ),
                shadowColor: hexToRgb('#3C97F1', 0.9), //阴影颜色
                shadowBlur: 20,
            },
        }],
    };
};

onMounted(() => {
    init();
});


</script>
    
<style lang="scss" scoped>
.chart {
    width: 900px;
    height: 183px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    margin-bottom: 50px;
}
</style>