<template>
    <div class="leftBottomChart">
        <div class="navTitle">
            <h2 class="ttf">企业资产总额情况排名</h2>
            <p>单位：亿元</p>
        </div>
        <my-chart :width="870" :height="420" :option="state.option" :click="true" :clickA="true"
            :params="_params"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const state = reactive({
    showModel: false,
    tag: 0,
    bar: ["施工承包项目", "生产经营项目"],
    option: {},
    xData1: [
        "1、嘉关宏电热有限公责任公司",
        "2、靖煤集国白银热点有限公司",
        "3、中国电力有限责任公司",
        "4、甘肃电投水电开发有限责任公司流水电站",
        "5、甘肃西兴能源投资有限公司",
        "6、甘肃西兴能源投资有限公司",
        "7、甘肃西兴能源投资有限公司",
        "8、甘肃西兴能源投资有限公司",
        "9、甘肃西兴能源投资有限公司"
    ],
    dataList1: [333, 222, 67, 333, 100, 111, 67, 456, 221],
    title: ["企业户数"],
    colorList: ["#3C97F1", "#EBAC23"],
    mainColor: "#3C97F1",
    dataList: [],
    slide: [],
    tableData: [],
    currentActive: 0
});
onMounted(() => {
    init();
});



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
        ],
    };
};
</script>
    
<style lang="scss" scoped>
.leftBottomChart {
    margin-bottom: 54px;
    width: 888px;
    height: 462px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;

    .navTitle {
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
            z-index: 0;
        }

        p {
            font-size: 12px;
            font-weight: normal;
            line-height: 12px;
            letter-spacing: 0px;
            color: rgba(214, 239, 255, 0.6);
        }
    }
}
</style>