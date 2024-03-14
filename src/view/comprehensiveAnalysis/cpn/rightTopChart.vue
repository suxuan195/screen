<template>
    <div class="rightTopChart">
        <div class="mainTitle ttf">
            <p>历年党员新增数量</p>
        </div>
        <my-chart :width="432" :height="200" :option="state.option"></my-chart>
    </div>
</template>
  
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: [
        "金川集团",
        "农垦集团",
        "电投集团",
        "甘肃建投集团",
        "白银集团",
        "",
        "",
    ],
    title: ['战略新兴'],
    colorList: ["#0BE6E6"],
});
onMounted(() => {
    init();
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
            left: "50",
            right: "20",
            top: "30",
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
            top: "0",
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
                    interval: 0,

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
                name: "单位(个)",
                min: 0,
                max: 15,
                axisTick: {
                    alignWithLabel: true,
                },
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
                name: "战略新兴",
                type: "bar",
                barWidth: 6,
                label: {
                    // 显示数据值
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb("#0BE6E6", 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                    distanceToLabelLine: 10
                },
                barGap: "60%",
                label: {
                    offset: [0, 15],
                    show: true,
                    position: 'top',
                    formatter: [
                        '{a|{c}}',
                        '{c|}',
                    ].join('\n'), // 使用 rich 属性和 formatter 属性
                    rich: {
                        a: {
                            color: '#0BE6E6',
                            fontSize: 12,
                            align: 'center',
                        },
                        c: {
                            backgroundColor: {
                                image: 'https://z1.ax1x.com/2023/11/01/piuu0sO.png'
                            },
                            width: 22,
                            height: 22,
                            align: 'center',
                        }
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
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 15);
            item.data.push(randomNum);
        }
    });
};
</script>
  
<style lang="scss" scoped>
.rightTopChart {
    width: 432px;
    height: 218px;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    margin-bottom: 50px;
}
</style>
  