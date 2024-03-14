<template>
    <div class="centerBottomChart">
        <selectTab :optionList="state.optionList" width="81px" class="fixed" @selectChange="selectChange" />
        <my-chart :width="776" :height="208" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import selectTab from "../../supplySideReformManagment/cpn/selectTab.vue";
import * as echarts from "echarts";
import { analogData1 } from '../json/analogData'
const currentIndex = ref(0)
const state = reactive({
    option: {},
    xData: [],
    title: ["本月数", "本年累计", "比增"],
    colorList: ["#9446FF", "#0BE6E6", "#3C97F1"],
    optionList: [{
        label: '所有企业',
        value: 0
    },
    {
        label: '10%以下',
        value: 1
    },
    {
        label: '10%-20%',
        value: 2
    },
    {
        label: '20%-50%',
        value: 3
    },
    {
        label: '50%以上',
        value: 4
    },

    ]
});
const filterEnterprise = () => {
    let allList = state.xData.map((val, index) => {
        return {
            label: val,
            value: index + 1
        }
    })
    state.optionList.push(...allList)
}
const selectChange = (val) => {
    currentIndex.value = val

    init()
}
onMounted(() => {
    filterEnterprise()
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
            right: "45",
            top: "50",
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
            left: "120",
            top: "20",
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
                axisTick: {
                    alignWithLabel: true,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    interval: 0
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
                type: "value",
                name: "%",
                min: -20,
                max: 100,
                interval: 20,
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
                name: "本月数",
                type: "bar",
                barWidth: 6,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (万元)";
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#9446FF" }, // 渐变起始颜色
                        { offset: 1, color: "rgba(148, 70, 255, 0)" }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
            },
            {
                name: "本年累计",
                type: "bar",
                barWidth: 6,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " (万元)";
                    },
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                        { offset: 1, color: "rgba(11, 230, 230, 0)" }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
            },
            {
                name: "比增",
                type: "line",
                yAxisIndex: 1,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + " %";
                    },
                },
                lineStyle: {
                    width: 4,
                    color: 'rgba(60, 151, 241, 1)',

                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#3C97F1", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
            },
            {
                yAxisIndex: 1,
                type: 'line',
                data: [15],  // 警告线的数据点
                markLine: {
                    label: {
                        color: 'red',
                        show: true  // 隐藏警告线的标签
                    },
                    lineStyle: {
                        color: 'red'  // 警告线的颜色
                    },
                    data: [
                        {
                            yAxis: 15  // 警告线的阈值位置
                        }
                    ]
                },
            }
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
    state.option.xAxis[0].data = []
    console.log(analogData1[`dataList${currentIndex.value + 1}`]);
    let nameOld = analogData1[`dataList${currentIndex.value + 1}`].map(item => item.QYMC)
    console.log(nameOld);
    state.option.xAxis[0].data = nameOld
    state.option.xAxis[0].data.push('', '', '', '', '', '', '', '')

    state.option.series.forEach((item, itemIndex) => {
        item.data = []
        switch (itemIndex) {
            case 0:
                item.data = analogData1[`dataList${currentIndex.value + 1}`].map(item => item.CZ_BY)
                break;
            case 1:
                item.data = analogData1[`dataList${currentIndex.value + 1}`].map(item => item.CZ_BNLJ)
                break;
            case 2:
                item.data = analogData1[`dataList${currentIndex.value + 1}`].map(item => item.CZ_TB)
                break;
            default:
                break;
        }
    })
    console.log(state.option);
};
</script>
    
<style lang="scss" scoped>
.centerBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 776px;
    height: 208px;
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 90px;

    .fixed {
        position: absolute;
        right: 62px;
        top: 16px;
    }
}
</style>