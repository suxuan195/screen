<template>
    <div class="leftTopChart">
        <div class="chart">
            <my-chart :width="432" :height="238" :option="state.option" 
                :params="_params"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const refRightCenterDialog = ref(null);
const _params = ref(null);
const state = reactive({
    option: {},
    xData: [
        "华龙证劵公\n司",
        "甘肃中金实\n业",
        "甘肃能化集\n团",
        "丝绸之路信\n息港公司",
        "甘肃新盛公\n司",
        "",
        "",
        "",
        "",
        ""

    ],
    title: ["已建立董事会占应建企业户致比例", "已实现外部董事占多数的企业户数比例"],
    colorList: ["#AAFDFD"],
});

const clickCallBack = async (p) => {
    refRightCenterDialog.value.showModel = true;
    await nextTick();
    refRightCenterDialog.value.setList(p.name);
};

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
            right: "25",
            top: "65",
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
            position: 'top',
            confine: true,
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999",
                },
            },
            // formatter: function (p) {
            //     _params.value = p;
            //     let str = "";
            //     for (let i in p) {
            //         let item = p[i];
            //         str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 1]
            //             };margin-right:6px;display:inline-block;"></span>${item.data
            //             } (户)</div>`;
            //     }
            //     return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
            // },
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "10",
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
                name: "单位(%)",
                min: 0,
                max: 300,
                interval: 100,
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
                name: "已建立董事会占应建企业户致比例",
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
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "top",
                    offset: [0, 7],
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    shadowColor: "#fff",
                    shadowBlur: 16,
                },
                data: [23, 44, 55, 66, 77, 88],
            },
            {
                name: "已实现外部董事占多数的企业户数比例",
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb("#EBAC23", 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "top",
                    offset: [0, 7],
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    shadowColor: "#fff",
                    shadowBlur: 16,
                },
                data: [56, 78, 222, 123, 234, 222],
            },
        ],
        dataZoom: {
            show: true, // 为true 滚动条出现
            realtime: true,
            type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            start: 0, // 表示默认展示20%～80%这一段。
            end: 40,
            zoomOnMouseWheel: false,
        },
    };
};
</script>
  
<style lang="scss" scoped>
.leftTopChart {
    width: 432px;
    height: 238px;
    margin-bottom: 24px;

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    }
}
</style>
  