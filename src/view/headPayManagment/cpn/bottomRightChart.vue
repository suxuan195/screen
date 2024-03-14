<template>
    <div class="leftTopChart">
        <my-chart :width="432" :height="364" :option="state.option"></my-chart>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
const _params = ref(null);
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: ["2021", "2022", "2023"],
    title: ["资产总额", "职工人数"],
    colorList: ["#3C97F1", "#EBAC23", "#0BE6E6"],
});

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
            left: "40",
            right: "40",
            top: "40",
            bottom: "30",
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
            formatter: function (p) {
                _params.value = p;
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 2]
                        };margin-right:6px;display:inline-block;"></span>${item.data
                        } (亿元)</div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
            },
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "7",
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
                max: 1000,
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

        ],
        series: [
            {
                name: "资产总额",
                type: "bar",
                label: {
                    show: true,
                    position: 'top',
                    color: '#3C97F1'
                },
                barWidth: 6,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (万元)";
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.colorList[0] }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.colorList[0], 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
            },
            {
                name: "净资产",
                type: "bar",
                label: {
                    show: true,
                    position: 'top',
                    color: '#3C97F1'
                },
                barWidth: 6,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (万元)";
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.colorList[1] }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.colorList[1], 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
            },
            {
                name: "营业收入",
                type: "bar",
                label: {
                    show: true,
                    position: 'top',
                    color: '#3C97F1'
                },
                barWidth: 6,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (万元)";
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.colorList[2] }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.colorList[2], 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
            },
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 3; i++) {
            let randomNum = Math.floor(Math.random() * 1000);
            item.data.push(randomNum);
        }
    });
};
onMounted(() => {
    init();
});
</script>
<style lang="scss" scoped>
.leftTopChart {
    margin-bottom: 50px;
    width: 432px;
    height: 364px;
    background: url("@images/payrollManagement/border.png") 0% 0% / 100% 100%;
}
</style>
  