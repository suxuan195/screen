<template>
    <div class="leftTopChart">
        <div class="chart">
            <my-chart :width="432" :height="206" :option="state.option" :click="true" :clickA="true"
                :params="_params"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, onBeforeMount, ref } from "vue";
import emitBus from "@/utils/bus";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const state = reactive({
    showModel: false,
    tag: 0,
    bar: ["施工承包项目", "生产经营项目"],
    option: {},
    xData1: [
        "1、甘肃省公路航空旅游投资集团有限公司",
        "2、金川集团股份有限公司",
        "3、甘肃省建设投资（控股）集团有限公司",
        "4、酒泉钢铁（集团）有限责任公司",
    ],
    dataList1: [100, 6, 67, 6,],
    title: ["企业户数"],
    colorList: ["#3C97F1", "#EBAC23"],
    mainColor: "#3C97F1",
    dataList: [],
    slide: [],
    tableData: [],
    currentActive: 0
});
onMounted(() => {
    setData();
});

const setData = () => {
    init();
};

const init = () => {
    state.option = {
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
                offset: -10,
                axisLabel: {
                    color: state.mainColor,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
                data: state.dataList1,
            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
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
                data: state.dataList1,
            },
            {
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: "rgba(60,151,241,.1)",
                },
                data: [200, 200, 200, 200, 200, 200, 200, 200],
                barGap: "-100%",
                tooltip: {
                    show: false,
                },
            },
        ],
    };
};
</script>
  
<style lang="scss" scoped>
.leftTopChart {
    width: 432px;
    height: 206px;
    margin-bottom: 50px;

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        position: relative;

    }
}
</style>
  