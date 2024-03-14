<template>
    <div class="rightBottomChart">
        <my-chart :width="432" :height="350" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    title: ['货币资金余额', '资金计划执行率', '资金归集率', '资金计划执行率管控区间'],
    colorList: ["#0BE6E6", "#D8D8D8", "#EBAC23", "#46556D"],
});
onMounted(() => {
    init();
});
const legendData = state.title.map((item, index) => {
    return { name: item, itemStyle: { color: state.colorList[index] } }
})
const init = () => {
    state.option = {
        grid: {
            left: "30",
            right: "70",
            top: "60",
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
            data: legendData,
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "5",
            itemWidth: 12, // 图例标15的宽度
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
                    show: false,
                    alignWithLabel: true,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    interval: 0,

                },
                axisLine: {
                    // 设置x轴的颜色
                    lineStyle: {
                        color: "#0BE6E6",
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "单位(亿元)",
                min: 0,
                max: 100,
                interval: 20,
                axisTick: {
                    alignWithLabel: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#0BE6E6"],
                    },
                },
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 12,
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                    padding: [0, 0, 10, 0]
                },
            },
            {
                type: "value",
                name: "单位(%)",
                min: 0,
                max: 100,
                interval: 20,
                axisTick: {
                    alignWithLabel: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#0BE6E6"],
                    },
                },
                axisLabel: {
                    show: true,
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
                name: "货币资金余额",
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.colorList[0] }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.colorList[0], 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "80%",
                // label: {
                //     offset: [0, 15],
                //     show: true,
                //     position: 'top',
                //     formatter: [
                //         '{a|{c}}',
                //         '{c|}',
                //     ].join('\n'), // 使用 rich 属性和 formatter 属性
                //     rich: {
                //         a: {
                //             color: '#0BE6E6',
                //             fontSize: 12,
                //             align: 'center',
                //         },
                //         c: {
                //             backgroundColor: {
                //                 image: 'https://z1.ax1x.com/2023/11/01/piuu0sO.png'
                //             },
                //             width: 22,
                //             height: 22,
                //             align: 'center',
                //         }
                //     }
                // },
            },
            {
                name: "资金计划执行率",
                type: "effectScatter",
                barWidth: 6,
                itemStyle: {
                    width: 4,
                    height: 4,
                    color: '#fff',
                    borderRadius: [2, 2, 0, 0],
                },
                symbolSize: 6,
                yAxisIndex: 1, // 使用右侧 Y 轴数据
                barGap: "70%",
                // label: {
                //     offset: [0, 15],
                //     show: true,
                //     position: 'top',
                //     formatter: [
                //         '{a|{c}}',
                //         '{c|}',
                //     ].join('\n'), // 使用 rich 属性和 formatter 属性
                //     rich: {
                //         a: {
                //             color: '#0BE6E6',
                //             fontSize: 12,
                //             align: 'center',
                //         },
                //         c: {
                //             backgroundColor: {
                //                 image: 'https://z1.ax1x.com/2023/11/01/piuu0sO.png'
                //             },
                //             width: 22,
                //             height: 22,
                //             align: 'center',
                //         }
                //     }
                // },
            },
            {
                name: "资金归集率",
                type: "line",
                smooth: true, // 使用平滑曲线
                itemStyle: {
                    color: state.colorList[2],
                    borderRadius: [3, 3, 0, 0],
                },
                symbol: 'none', // 隐藏节点

                lineStyle: {
                    width: 4
                }
                // label: {
                //     offset: [0, 15],
                //     show: true,
                //     position: 'top',
                //     formatter: [
                //         '{a|{c}}',
                //         '{c|}',
                //     ].join('\n'), // 使用 rich 属性和 formatter 属性
                //     rich: {
                //         a: {
                //             color: '#0BE6E6',
                //             fontSize: 12,
                //             align: 'center',
                //         },
                //         c: {
                //             backgroundColor: {
                //                 image: 'https://z1.ax1x.com/2023/11/01/piuu0sO.png'
                //             },
                //             width: 22,
                //             height: 22,
                //             align: 'center',
                //         }
                //     }
                // },
            },
            {
                name: "资金计划执行率管控区间",
                type: 'custom',
                renderItem: function (params, api) {
                    return {
                        type: 'rect',
                        shape: {
                            x: 30,
                            y: 60,
                            width: '340',
                            height: '25'
                        },
                        style: {
                            fill: 'rgba(128, 128, 128, 0.3)'  // 灰色长方形填充颜色
                        }
                    };
                },
                data: [{}]  // 无需传入具体数据，因为长方形的位置和尺寸是固定的
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
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 100);
            item.data.push(randomNum);
        }
    });
};
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    margin-bottom: 54px;
    width: 432px;
    height: 364px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;
}
</style>