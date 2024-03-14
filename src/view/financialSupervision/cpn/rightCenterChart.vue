<template>
    <div class="leftTopChart">
        <div class="chart">
            <my-chart :width="432" :height="206" :option="state.option"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, onBeforeMount } from "vue";
import emitBus from "@/utils/bus";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    showModel: false,
    option: {},
    xData: [
        "甘肃建设投资(控股)集团有限公司",
        "甘肃科技投资集团有限公司",
        "甘肃省公路交通建设集团有限公司",
    ],
    title: ["今年", "去年"],
    colorList: ["#3C97F1", "#EBAC23"],
    mainColor: "#3C97F1",
    dataList: [],
});

onMounted(() => {
    setData();
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
});
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
onBeforeMount(() => {
    emitBus.off("closeModel");
});


const setData = () => {
    init();
};

const init = () => {
    state.option = {
        grid: {
            left: "20",
            right: "60",
            top: "50",
            bottom: "0",
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "15",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
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
                splitLine: {
                    show: false,
                },
                type: "value",
                show: false,
                axisPointer: {
                    show: false, // 隐藏十字指示器
                    type: "line", // 设置指示器样式
                },
            },
        ],
        yAxis: [
            {
                name: '单位(万)',
                nameLocation: 'start',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12,
                    padding: [0, 0, 0, 720],
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    //y轴
                    show: false,
                },
                type: "category",
                axisTick: {
                    show: false,
                },
                offset: -10,
                inverse: true,
                data: state.xData,
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-30, 0, 0, 0],
                },
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                offset: 50,
                axisLabel: {
                    color: '#3C97F1',
                    show: true,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-15, 20, 0, 0],
                },
                data: [212, 222, 333],
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                offset: 50,
                axisLabel: {
                    color: "#EBAC23",
                    show: true,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [3, 20, 0, 10],
                },
                data: [20, 30, 40],
            },
        ],
        series: [
            {
                name: "今年",
                type: "bar",
                barWidth: 4,
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#3C97F1' }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb('#3C97F1', 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: '300%',
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 4,
                    height: 4,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: [212, 222, 333],
            },
            {
                name: "去年",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#EBAC23' }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb('#EBAC23', 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 4,
                    height: 4,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: [20, 30, 40],
            },

        ],
    };
};
</script>
  
<style lang="scss" scoped>
.leftTopChart {
    width: 432px;
    height: 206px;
    margin-bottom: 50px;

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        position: relative;

    }
}
</style>
  