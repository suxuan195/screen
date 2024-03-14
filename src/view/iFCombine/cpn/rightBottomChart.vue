<template>
    <div class="rightBottomChart">
        <h2 class="ttf">股份划转市值/比例TOP</h2>
        <ul class="chartBox">
            <li v-for="(item, index) in  state.options" :key="index + '11'"
                :style="{ 'marginLeft': index == 1 ? '24px' : '' }">
                <h3>{{ titles[index] }}</h3>
                <my-chart :width="420" :height="390" :option="item"></my-chart>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
const titles = ['划转股份市值TOP10', '划转股份市值TOP10']
import { onMounted, reactive } from 'vue';
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    options: {},
    enterpriseList: [
        ["危化品",
            "煤矿",
            "非煤矿山",
            "金属冶金",
            "建筑施工",
            "文化旅游",
            "能源电力",
            "装备制造",
            "装备制造",
            "能源电力"],
        ["危化品",
            "煤矿",
            "非煤矿山",
            "金属冶金",
            "建筑施工",
            "文化旅游",
            "能源电力",
            "装备制造",
            "装备制造",
            "能源电力"]
    ],
    colorList: ['#6BDAFF', '#F6BB3B'],
    data: [
        [111, 333, 33.8, 501, 501, 45.45, 45.45, 45, 45.45, 23],
        [0.1, 0.34, 0.56, 0.67, 0.56, 0.34, 0.78, 0.23, 0.25, 0.34]
    ]
})
const init = () => {
    titles.forEach((item, index) => {
        state.options[index] = {
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
                        str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[index]
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
                    data: state.enterpriseList[index],
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
                        formatter: function (value,) {
                            return `${value}${index === 0 ? '亿元' : '%'}`;
                        },
                        color: state.colorList[index],
                        fontSize: "14",
                        verticalAlign: "top",
                        align: "right",
                        padding: [-22, 0, 0, 0],
                    },
                    data: state.data[index],
                },
            ],
            series: [
                {
                    name: "企业户数",
                    type: "bar",
                    barWidth: 4,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            { offset: 0, color: state.colorList[index] }, // 渐变起始颜色
                            { offset: 1, color: hexToRgb(state.colorList[index], 0) }, // 渐变终止颜色
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
                    data: state.data[index],
                    showBackground: true,//开启背景
                    backgroundStyle: {//设置背景样式
                        color: "rgba(255, 255, 255, 0.08)",
                        barBorderRadius: 10,
                    },
                },

            ],
        };
    })
};
onMounted(() => {
    init()
})
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    width: 888px;
    height: 462px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;

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

    .chartBox {
        display: flex;

        h3 {
            margin-top: 16px;
            font-size: 16px;
            font-weight: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #FFFFFF;
        }

        li {
            width: 50%;
        }
    }
}
</style>