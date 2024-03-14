<template>
    <div class="leftTopChart">
        <div class="chart">
            <my-chart :width="864" :height="238" :option="state.option" :click="true" :clickA="true"
                :params="_params"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import centerImg from '@images/stateEnterpriseReform/清退箭头.png'
const _params = ref(null);
const state = reactive({
    showModel: false,
    tag: 0,
    bar: ["施工承包项目", "生产经营项目"],
    option: {},
    xData1: [
        "已列入不具备竞争优势企业",
        "已完成存量清退处置企业",
        "纳入专项治理范围企业",
    ],
    dataList1: [200, 500, 800],
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
    window.addEventListener('resize', () => setData())
});

onUnmounted(() => {
    window.addEventListener('resize', () => null)
})

const setData = () => {
    init();
};

const init = () => {
    state.option = {
        grid: {
            left: "80",
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
                    padding: [-25, 0, 0, 0],

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
                    color: '#FFFFFF',
                    fontSize: "22",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-27, 50, 0, 0],

                },

                data: state.dataList1,
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                offset: -10,
                axisLabel: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: "18",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-24, 0, 0, 0],
                    formatter: function (value) {
                        // 这里可以编写自定义的格式化逻辑，并添加自定义样式
                        return '/' + value
                    }
                },

                data: [1173, 1173, 1173],
            }
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
                barGap: "60%",
                label: {
                    show: true,
                    position: 'right',
                    color: '#1866E5',
                    fontSize: 18,
                    formatter: function (value) {
                        let data = (value.value / 1000) * 100
                        return `   ${data.toFixed(0) + '%'}`
                    },
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "right",
                    offset: [-2, 0],
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    shadowColor: "#fff",
                    shadowBlur: 16,
                },
                data: state.dataList1,
            },
            {
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: "rgba(60,151,241,.1)",
                },
                data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
                barGap: "-100%",
                tooltip: {
                    show: false,
                },
            },
        ],
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 12,
                        height: 12,
                    },
                    left: "22",
                    top: "48",
                },
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 12,
                        height: 12,
                    },
                    left: "22",
                    top: "120",
                },
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 12,
                        height: 12,
                    },
                    left: "22",
                    top: "189",
                },
            ],
        },
    };
};
</script>
  
<style lang="scss" scoped>
.leftTopChart {
    width: 864px;
    height: 238px;
    margin-bottom: 50px;

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        position: relative;

    }
}
</style>
  