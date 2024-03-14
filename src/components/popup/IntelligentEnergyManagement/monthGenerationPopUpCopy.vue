<template>
    <popup :width="833" :height="400" title="月度发电完成情况" :showModel="props.showModel">
        <CommonChart :option="state.option" :canvasWidth="833" :canvasHeight="320" :highlight="true" />
    </popup>
</template>
    
<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import emitBus from "../../../utils/bus";
import popup from "@components/popup/pop.vue";
import CommonChart from "@components/Chart/ComonChart.vue";
import { reactive, ref, onMounted, defineProps } from "vue";

const state = reactive({
    option: {},
    colorList: ["#1866E5", "#F6BB3B", "#6BDAFF"],
    title: ["计划发电量", "实际发电量", "上网电量"],
    xData: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07", "2023-08", "2023-09", "2023-10", "2023-11", "2023-12"],
});
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
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
            right: "50",
            top: "60",
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
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            icon: "rect",
            right: 24,                              //调整图例位置
            top: 26,
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
        },
        xAxis: [
            {
                type: "category",
                data: state.xData,
                boundaryGap: false,
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                },
                axisLine: {
                    // 设置x轴的颜色
                    lineStyle: {
                        color: "#4CB3F3",
                        width: 2 // 设置刻度线段的宽度为 2 像素
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: '单位(万千瓦时)',
                min: 0,
                max: 10000,
                interval: 2000,
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
        series: [],
    };
    state.option.series = [];
    state.title.forEach((item, index) => {
        let arr = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 10000);
            arr.push(randomNum);
        }
        state.option.series.push({
            name: item,
            type: "line",
            symbol: 'none', // 去掉线段上的圆点
            lineStyle: {
                color: state.colorList[index],
                width: 3 // 设置线段宽度为 2 像素
            },
            data: arr,
            areaStyle: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: hexToRgb(state.colorList[index], 1),
                        },
                        {
                            offset: 1,
                            color: hexToRgb(state.colorList[index], 0),
                        },
                    ],
                    false
                ),
                // shadowColor: hexToRgb(state.colorList[index], 0.86), //阴影颜色
                // shadowBlur: 30,
            },
        });
    });
};
const showModel = ref(false);
//点击更多事件
// const moreClick = () => {
//     showModel.value = true;
// };
onMounted(() => {
    init();
    emitBus.on("closeModel", () => {
        showModel.value = false;
    });
});
</script>
    
<style lang="scss" scoped></style>