<template>
    <div class="capacityReductionStatistics">
        <div class="topBox">
            <h2 class="ttf">企业去产能职工安置完成情况</h2>
            <selectTab :optionList="state.optionList" width="240px" @selectChange="selectChange" />
        </div>
        <div class="bottomChart" v-show="state.tag == 0">
            <template v-for="(item, index) in state.option" :key="index+'22'">
                <my-chart :width="420" :height="200" :option="item"
                    :style="{ marginLeft: index === 1 ? '24px' : '' }"></my-chart>
            </template>
        </div>
        <ul class="other" v-show="state.tag == 2">
            <li v-for="(item, index) in  state.otherList" :key="index + '11'">
                <h2>{{ item.title }}</h2>
                <div class="bg"></div>
                <p v-html="item.desc"></p>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import selectTab from './selectTab.vue';
const state = reactive({
    optionList: [
        {
            value: 0,
            label: '企业去产能职工安置完成情况',
        },
        {
            value: 2,
            label: '十三五”期间全国去产能目标任务',
        },
    ],
    option: [],
    xData: [
        "2017",
        "2018",
    ],
    title: ["目标值", "完成值", "完成率"],
    colorList: ["#0BE6E6", "#EBAC23", "#3C97F1"],
    tag: 0,
    otherList: [
        {
            title: '钢铁',
            desc: '减粗钢产能1亿~1.5亿吨'
        },
        {
            title: '煤炭',
            desc: '退出产能5亿吨，减量重组5亿吨左右'
        },
        {
            title: '煤电',
            desc: '全国停建和缓建煤电产能1.5亿千瓦，<br>淘汰落后产能0.2亿千瓦以上'
        }
    ]
})
const selectChange = (val) => {
    state.tag = val
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
    for (let index = 0; index < 2; index++) {
        state.option[index] = {
            grid: {
                left: "50",
                right: "45",
                top: "35",
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
                left: "center",
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
                        show: false
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
                    name: index === 0 ? "煤炭（人）" : "钢铁（人）",
                    min: 0,
                    max: 1200,
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
                {
                    name: "单位（%）",
                    type: "value",
                    min: 0,
                    max: 100,
                    interval: 25,
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
                    name: "完成率",
                    type: "line",
                    yAxisIndex: 0,
                    smooth: true,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " %";
                        },
                    },
                    lineStyle: {
                        color: "#3C97F1",
                        width: 3
                    },
                    symbol: "circle", // 圆点的形状
                    symbolSize: 8, // 圆点的大小
                    itemStyle: {
                        color: "#3C97F1", // 圆点的颜色
                        shadowColor: "#fff", // 阴影颜色
                        shadowBlur: 4, // 阴影模糊程度
                        borderWidth: 2,
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: "#fff", // 圆点边框颜色
                            borderWidth: 2, // 圆点边框宽度
                        },
                    },
                    markPoint: {
                        symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png',
                        symbolSize: [40, 20],
                        symbolOffset: [0, '-60%'], // 调整标记点的垂直偏移量
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ],
                        itemStyle: {
                            color: 'white'
                        },
                        label: {
                            color: '#ffffff',
                            fontSize: '12px',
                            formatter: function (params) {
                                return params.value + '%';
                            }
                        }
                    },
                },
                {
                    name: "目标值",
                    type: "bar",
                    barWidth: 16,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " (万元)";
                        },
                    },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#99FD9B" }, // 渐变起始颜色
                            { offset: 1, color: "#81FFF1" }, // 渐变终止颜色
                        ]),
                        borderRadius: [3, 3, 0, 0],
                    },
                    barGap: "60%",
                    markPoint: {
                        symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png',
                        symbolSize: [40, 20],
                        symbolOffset: [0, '-50%'], // 调整标记点的垂直偏移量
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ],
                        itemStyle: {
                            color: 'white'
                        },
                        label: {
                            color: '#ffffff',
                            fontSize: '12px',
                        }
                    },
                },
                {
                    name: "完成值",
                    type: "bar",
                    barWidth: 16,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " (万元)";
                        },
                    },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#EBD586" }, // 渐变起始颜色
                            { offset: 1, color: "#E8776D" }, // 渐变终止颜色
                        ]),
                        borderRadius: [3, 3, 0, 0],
                    },
                    barGap: "60%",
                    markPoint: {
                        symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png',
                        symbolSize: [40, 20],
                        symbolOffset: [0, '-50%'], // 调整标记点的垂直偏移量
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ],
                        itemStyle: {
                            color: 'white'
                        },
                        label: {
                            color: '#ffffff',
                            fontSize: '12px',
                        }
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
        state.option[index].series.forEach((item) => {
            item.data = [];
            for (let i = 0; i < 12; i++) {
                let randomNum = Math.floor(Math.random() * 1200);
                item.data.push(randomNum);
            }
        });
    }
};
onMounted(() => {
    init();
});
</script>
    
<style lang="scss" scoped>
.capacityReductionStatistics {
    padding: 16px;
    box-sizing: border-box;
    width: 888px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;

    .topBox {
        display: flex;
        justify-content: space-between;

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
        }
    }

    .bottomChart {
        display: flex;
    }



    .other {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;

        li {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        li:nth-child(1) {
            .bg {
                background: url('@images/supplySideReformManagment/去产能统计icon底座.png');
                background-size: 100% 100%;
                background-position: center center;
                width: 137px;
                height: 90px;
                position: relative;

                &::before {
                    content: '';
                    left: 50%;
                    transform: translateX(-50%);
                    position: absolute;
                    width: 54px;
                    height: 54px;
                    background: url('@images/supplySideReformManagment/钢铁.png');
                    background-size: 100% 100%;
                }
            }
        }

        li:nth-child(2) {
            .bg {
                background: url('@images/supplySideReformManagment/去产能统计icon底座.png');
                background-size: 100% 100%;
                background-position: center center;
                width: 137px;
                height: 90px;
                position: relative;

                &::before {
                    content: '';
                    left: 50%;
                    transform: translateX(-50%);
                    position: absolute;
                    width: 54px;
                    height: 54px;
                    background: url('@images/supplySideReformManagment/煤炭.png');
                    background-size: 100% 100%;
                }
            }
        }

        li:nth-child(3) {
            .bg {
                background: url('@images/supplySideReformManagment/去产能统计icon底座.png');
                background-size: 100% 100%;
                background-position: center center;
                width: 137px;
                height: 90px;
                position: relative;

                &::before {
                    content: '';
                    left: 50%;
                    transform: translateX(-50%);
                    position: absolute;
                    width: 54px;
                    height: 54px;
                    background: url('@images/supplySideReformManagment/煤电.png');
                    background-size: 100% 100%;
                }
            }
        }

        h2 {
            font-size: 16px;
            font-weight: normal;
            line-height: 16px;
            text-align: center;
            letter-spacing: 1.44px;
            color: #FFFFFF;
        }

        .bg {
            margin-top: 10px;
            width: 100%;
            height: 80px;
        }

        p {
            margin-top: 10px;
            font-size: 14px;
            font-weight: normal;
            line-height: 18px;
            text-align: center;
            letter-spacing: 1.44px;
            color: #FFFFFF;
        }
    }
}
</style>