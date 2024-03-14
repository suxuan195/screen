<template>
    <div class="rightBottomChart">
        <my-chart :width="432" :height="370" :option="state.option"></my-chart>
    </div>
</template>
  
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: [
        "一级企业",
        "二级企业",
        "三级企业·",
        "四级企业",
        "五级企业",
        "",
        "",
    ],
});
onMounted(() => {
    init();
});

const init = () => {
    state.option = {
        grid: {
            left: "50",
            right: "20",
            top: "50",
            bottom: "20",
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
            data: [{ name: '企业层次', itemStyle: { color: '#0BE6E6' } }],
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "15",
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
                name: "单位(个)",
                min: 0,
                max: 100,
                interval: 10,
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
                name: "企业层次",
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb("#0BE6E6", 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
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
                data: [28, 35, 52, 24, 24]
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
};
</script>
  
<style lang="scss" scoped>
.rightBottomChart {
    position: relative;
    z-index: 100;
    width: 432px;
    height: 382px;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
}
</style>
  