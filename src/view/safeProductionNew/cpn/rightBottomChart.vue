<template>
    <div class="rightBottomChart">
        <div class="leftChart">
            <h2 class="ttf">截止目前事故领域情况</h2>
            <my-chart :width="192" :height="380" :option="state.option"></my-chart>
        </div>
        <div class="rightChart">
            <h2 class="ttf">截止目前事件类型情况</h2>
            <my-chart :width="192" :height="380" :option="state.option1"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: [
        "危化品",
        "煤矿",
        "非煤矿山",
        "金属冶金",
        "建筑施工",
        "文化旅游",
        "能源电力",
        "装备制造",
        "装备制造"
    ],
    title: ["企业户数"],
    mainColor: "#1866E5",
    option1: {},
    xData1: [
        "物体打击",
        "机械伤害",
        "起重伤害",
        "触电",
        "淹弱",
        "焯烫",
        "火灾",
        "高处坠落",
        "高处坠落"
    ],
    title1: ["企业户数"],
    mainColor1: "#1866E5",
})
const init = () => {
    state.option = {
        grid: {
            left: "0",
            right: "20",
            top: "20",
            bottom: "0",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:#09BAE0;margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
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
                inverse: true,
            },
        ],
        yAxis: [
            {
                inverse: true,
                inside: true,
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
                offset: -150,
                data: state.xData,
                axisLabel: {
                    formatter: function (value, index) {
                        return `${value}`;
                    },
                    color: "#fff",
                    fontSize: 12,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-22, 0, 0, 0],
                },
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    color: '#09BAE0',
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 165, 0, 0],
                },
                data: [10, 9, 8, 7, 6, 5, 4, 4, 4],
            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 1, color: '#09BAE0' }, // 渐变起始颜色
                        { offset: 0, color: hexToRgb('#09BAE0', 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 4,
                    height: 4,
                    position: "left",
                    offset: [7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: [11, 12, 22, 15, 33, 42, 55, 23, 88,],
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
            },
        ],
    };
};
const init1 = () => {
    state.option1 = {
        grid: {
            left: "0",
            right: "20",
            top: "20",
            bottom: "0",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.mainColor
                        };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
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
                inverse: true,
                inside: true,
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
                data: state.xData1,
                axisLabel: {
                    formatter: function (value, index) {
                        return `${value}`;
                    },
                    color: "#fff",
                    fontSize: 12,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-22, 0, 0, 0],
                },
            },
            {

                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    color: state.mainColor1,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
                data: [10, 9, 8, 7, 6, 5, 4, 4, 4],
            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor1 }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor1, 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
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
                data: [100, 55, 23, 88, 90, 42, 55, 23, 88,],
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
            },

        ],
    };
};
onMounted(() => {
    init()
    init1()
});
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 408px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;

    div {
        width: 50%;
    }

    h2 {
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        z-index: 0;
    }
}
</style>