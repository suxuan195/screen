<template>
    <div class="leftCenterTable">
        <div class="chart">
            <div class="title">
                <div class="item" v-for="(item, index) in state.titleList" :key="index">
                    <img :src="item.img" alt="">
                    <div class="conx">
                        <h2 class="name">{{ item.name }}</h2>
                        <p class="value">
                            {{ item.value }}<span class="unit">{{ item.unit }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <my-chart :width="860" :height="60" :option="state.option1" :click="true" :clickA="true"
                    :params="_params"></my-chart>
            </div>
            <my-chart :width="860" :height="230" :option="state.option"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
const _params = ref(null);
import { hexToRgb } from "@/utils";
import bg1 from '@images/workdEmployeeDistribution/工资总额预算.png';
import bg2 from '@images/workdEmployeeDistribution/实发工资.png';
import bg3 from '@images/workdEmployeeDistribution/时序进度.png';
const state = reactive({
    titleList: [
        {
            name: "工资总额预算",
            value: "5544.65",
            unit: "万元",
            img: bg1
        },
        {
            name: "实发工资总额",
            value: "4511.21",
            unit: "万元",
            img: bg2
        },
        {
            name: "时序进度",
            value: "95%",
            unit: "%",
            img: bg3
        },
    ],
    option: {},
    option1: {},
    xData: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
        "",
        ,
        "",
        ,
        "",
        ,
        "",
    ],
    xData1: [
    ],
    dataList1: [1298],
    mainColor: "#3C97F1",
    title: ['工资总额预算', '实发工资总额','超出预算'],
    titleColor: ["#39465d","#1866E5", "#ed3833"]
});

// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
            itemStyle: {
                color: state.titleColor[index],
            },
        };
    });
};
const init = () => {
    state.option = {
        grid: {
            left: "50",
            right: "30",
            top: "40",
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
            formatter: function (p) {
                _params.value = p;
                let str = "";
                let total = 0;
                let yu = 0;
                for (let i in p) {
                    let item = p[i];
                    if (item.seriesIndex == 0) {
                        yu = item.data
                    } else {
                        total = item.data + yu
                    }
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.titleColor[item.seriesIndex % 2]
                        };margin-right:6px;display:inline-block;"></span>${state.title[item.seriesIndex]}：${item.seriesIndex == 0 ? 900 : total
                        } (万元)</div>`;
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
            right: "25",
            top: "5",
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
                max: 1500,
                interval: 300,
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
                name: '工资总额预算',
                type: 'bar',
                stack: 'Ad',
                barWidth: 6,
                emphasis: {
                    focus: 'series'
                },
                data: [900, 332, 900, 900, 555, 400, 456, 767, 900, 900, 900, 345],
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#1866E5'
                            }, {
                                offset: 1,
                                color: '#fff'
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    borderRadius: [3, 3, 0, 0],
                },
            },
            {
                name: '实发工资总额',
                type: 'bar',
                stack: 'Ad',
                barWidth: 6,
                emphasis: {
                    focus: 'series'
                },
                data: [300, 0, 125, 333, 0, 0, 0, 0, 234, 111, 345, 0],
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#ed3833'
                            }, {
                                offset: 1,
                                color: '#fff'
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    borderRadius: [3, 3, 0, 0],
                },
            },
            {
                name:'超出预算',
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: "rgba(255,255,255,0.2)",
                    borderWidth: 1 // 设置柱状图的边框宽度
                },
                data: [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
                barGap: "-100%",
                tooltip: {
                    show: false,
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
    // state.option.series.forEach((item) => {
    //     item.data = [];
    //     for (let i = 0; i < 12; i++) {
    //         let randomNum = Math.floor(Math.random() * 1000);
    //         item.data.push(randomNum);
    //     }
    // });
};
const init1 = () => {
    state.option1 = {
        grid: {
            left: "20",
            right: "20",
            top: "20",
            bottom: "10",
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
                inverse: true,
                data: state.xData1,
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    show: false,
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
                offset: -10,
                axisLabel: {
                    color: state.mainColor,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                    show: false
                },
                data: state.dataList1,
            },
        ],
        series: [
            {
                name: "",
                type: "bar",
                barWidth: 8,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
                barGap: "60%",
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 8,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: state.dataList1,
            },
        ],
    };
};
onMounted(() => {
    init();
    init1()
});
</script>
  
<style lang="scss" scoped>
.leftCenterTable {
    width: 888px;
    height: 364px;


    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        width: 888px;
        height: 364px;
        padding: 20px;
        box-sizing: border-box;

        .title {
            display: flex;
            justify-content: space-between;
            padding: 0 50px;

            .item {
                margin-right: 30px;
                display: flex;
                align-items: center;

                img {
                    width: 70px;
                    height: 64px;
                }

                .conx {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                }

                .name {
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }

                .value {
                    font-size: 20px;
                    color: #00e7ff;
                }

                .unit {
                    padding-left: 4px;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 20px;
                    text-align: right;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>
  