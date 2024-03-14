<template>
    <div class="rightCenterChart">
        <selectTab width="80px" :option-list="state.optionList" class="fixed" @select-change="selectChange" />
        <my-chart :width="420" :height="200" :option="state.option" @lineClick="lineClick"></my-chart>
        <rightCenterPopUp :show-model="state.showModel" :currentIndex="state.lineActive" :table-data="state.tableData" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from 'vue'
import * as echarts from "echarts";
import selectTab from "../../supplySideReformManagment/cpn/selectTab.vue";
import rightCenterPopUp from '../popup/rightCenterPopUp.vue';
import { analogData } from '../json/analogData'
import emitBus from "@utils/bus";
import { data } from '../json/rightCenterTable'

onMounted(() => {
    state.tableData = data[`dataList` + state.lineActive]
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
    emitBus.on("buttonClick", (val) => {
        if (state.lineActive === 8) return
        state.lineActive += val
        if (state.lineActive < 1) {
            state.lineActive = 1
        } else if (state.lineActive > 6) {
            state.lineActive = 6
        }
        state.tableData = data[`dataList${state.lineActive}`]
    });
})
const state = reactive({
    counter: 0,
    option: {},
    xData: [
        "1月",
        "1-2月",
        "1-3月",
        "1-4月",
        "1-5月",
        "1-6月",
        "1-8月",
        "",
        "",
        "",
        "",
    ],
    title: ["本月", "本月平均", "去年同月"],
    colorEnum: [
        '#3C97F1', '#0BE6E6', '#EBAC23'
    ],
    optionList: [
        {
            label: '镍',
            value: 0
        },
        {
            label: '铜(金川)',
            value: 1
        },
        {
            label: '钢材',
            value: 2
        },
        {
            label: '铝',
            value: 3
        },
        {
            label: '铜(白银)',
            value: 4
        },
        {
            label: '铅',
            value: 5
        },
        {
            label: '锌',
            value: 6
        },
        {
            label: '原煤(靖煤)',
            value: 7
        },
        {
            label: '原煤(窑煤)',
            value: 8
        }
    ],
    tableData: [],
    showModel: false,
    currentIndex: 1,//控制下拉菜单
    lineActive: 1//控制那条线点击了
});
const lineClick = (params) => {
    state.lineActive = params.dataIndex + 1
    if (params.dataIndex + 1 === 7) {
        state.lineActive = 8
    }
    state.tableData = data[`dataList${state.lineActive}`]
    state.showModel = true
}
// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
            itemStyle: {
                color: state.colorEnum[index]
            }
        };
    });
};
const currentIndex = ref(0)
const init = () => {
    state.option = {
        grid: {
            left: "60",
            right: "30",
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
        toolbox: {
            show: false,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            padding: [2, 10],
            x: "80",
            y: '0', // 图例垂直方向位置，默认为 'top'，可设置为 'bottom', 'center'
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
        },
        xAxis: [
            {
                type: 'category',           // x 轴类型为类目轴
                data: state.xData,                   // 初始数据为空
                axisLabel: {
                    interval: 0,
                    color: '#fff'           // 控制刻度标签显示间隔
                },
                axisTick: {
                    show: false,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisLine: {
                    // 设置x轴的颜色
                    show: true,
                    lineStyle: {
                        color: '#4CB3F3'
                    }
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "元/吨",
                // min: 0,
                // max: 1200,
                // interval: 300,
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
                    align: 'right'
                },
            },
        ],
        series: [
            {
                name: "本月",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '元/吨';
                    },
                },
                lineStyle: {
                    color: "rgba(60, 151, 241, 0.6)",
                    width: 2, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 8, // 圆点的大小
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
                                color: 'rgba(60, 151, 241, 0.2)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(60, 151, 241, 0.00)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(60, 151, 241, 0.9)', //阴影颜色
                    shadowBlur: 20,
                },
            },
            {
                name: "本月平均",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '元/吨';
                    },
                },
                lineStyle: {
                    color: "rgba(11, 230, 230, 0.6)",
                    width: 2, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#0BE6E6", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
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
                                color: 'rgba(11, 230, 230, 0.3)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(11, 230, 230, 0.00)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(11, 230, 230, 0.9)', //阴影颜色
                    shadowBlur: 20,
                },
            },
            {
                name: "去年同月",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '元/吨';
                    },
                },

                lineStyle: {
                    color: "rgba(235, 172, 35, 0.6)",
                    width: 2, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#EBAC23", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
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
                                color: 'rgba(235, 172, 35, 0.3)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(235, 172, 35, 0.00)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(235, 172, 35, 0.9)', //阴影颜色
                    shadowBlur: 20,
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
    state.option.series.forEach((item, dataIndex) => {
        item.data = []
        switch (dataIndex) {
            case 0:
                item.data = analogData[`dataList${currentIndex.value + 1}`].map(item => item.JG_BY * 1)
                break;
            case 1:
                item.data = analogData[`dataList${currentIndex.value + 1}`].map(item => item.JG_BNLJ * 1)
                break;
            case 2:
                item.data = analogData[`dataList${currentIndex.value + 1}`].map(item => item.JG_SNTQ * 1)
                break;
            default:
                break;
        }
    })

};
const selectChange = (index) => {
    currentIndex.value = index
    init()
}
onMounted(() => {
    init()
})
</script>
    
<style lang="scss" scoped>
.rightCenterChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 420px;
    height: 218px;
    box-sizing: border-box;

    .fixed {
        position: relative;
        left: 310px;
        top: 16px;
    }
}
</style>