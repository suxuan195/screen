<template>
    <div class="leftTopChart">
        <my-chart :width="432" :height="206" :option="state.option"></my-chart>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
const _params = ref(null);
import { hexToRgb } from "@/utils";
const state = reactive({
    titleList: [
        {
            name: "净利润",
            value: "96.82",
            unit: "亿元",
        },
        {
            name: "利润总额",
            value: "127.80",
            unit: "亿元",
        },
    ],
    option: {},
    xData: ["一般损失", "较大损失", "重大损失"],
    title: ["项目涉嫌损失金额", "项目数量"],
    colorList: ["#3C97F1", "#EBAC23"],
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
                        } (${item.seriesIndex === 0 ? '万元' : '件'})</div>`;
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
                name: "单位(万元)",
                min: 0,
                max: 50,
                interval: 10,
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
                name: "单位(件)",
                min: 0,
                max: 50,
                interval: 10,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#4CB3F3"],
                    },
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        ],
        series: [
            {
                name: "项目数量",
                type: "line",
                label: {
                    show: true,
                    position: 'top',
                    color: '#EBAC23'
                },
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (件)";
                    },
                },
                lineStyle: {
                    color: state.colorList[1],
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: state.colorList[1], // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
                // data: [12, 5, 20, 12, 5, 6, 22, 3],
            },
            {
                name: "项目涉嫌损失金额",
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
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 3; i++) {
            let randomNum = Math.floor(Math.random() * 50);
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
    height: 206px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
}
</style>
  