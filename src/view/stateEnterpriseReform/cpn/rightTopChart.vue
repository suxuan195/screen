<template>
    <div class="rightCenterChart">
        <my-chart :width="432" :height="238" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import * as echarts from "echarts";

onMounted(() => {
    init()
})
const state = reactive({
    counter: 0,
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
    ],
    title: ["已实施经理层成员任期制合契约化管理的户数比例"],
    colorEnum: [
        '#3C97F1', '#0BE6E6'
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
const init = () => {
    state.option = {
        grid: {
            left: "60",
            right: "30",
            top: "60",
            bottom: "40",
        },
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            position: 'top',
            confine: true,
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
            y: '10', // 图例垂直方向位置，默认为 'top'，可设置为 'bottom', 'center'
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
                name: "单位(%)",
                min: 0,
                max: 20,
                interval: 5,
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
                name: "已实施经理层成员任期制合契约化管理的户数比例",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '元/吨';
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(60, 151, 241, 1)'
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
                                color: 'rgba(60, 151, 241, 0.3)',
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
            let randomNum = Math.random() * 20.2;
            item.data.push(randomNum.toFixed(2));
        }
    });

};
</script>
    
<style lang="scss" scoped>
.rightCenterChart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 238px;
    box-sizing: border-box;
    margin-bottom: 24px;

    .fixed {
        position: relative;
        left: 310px;
        top: 16px;
    }
}
</style>