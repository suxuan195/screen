<template>
    <div class="rightBottomChart">
        <my-chart :width="432" :height="206" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import * as echarts from "echarts";

onMounted(() => {
    init()
})
const state = reactive({
    tabList: ['大额交易总金额'],
    counter: 0,
    option: {},
    xData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    list: [1.2, 2.4, 4, 5, 6],
});

const init = () => {
    state.option = {
        grid: {
            left: "30",
            right: "0",
            top: "30",
            bottom: "50",
        },
        legend: {
            data: [
                {
                    name: '大额交易总金额',
                    itemStyle: {
                        color: '#3C97F1',
                    },
                }
            ],
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "-5",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;
                        background-color:#3C97F1;margin-right:6px;display:inline-block;"></span>大额交易总金额：${item.data}</div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
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
                type: 'category',           // x 轴类型为类目轴
                data: state.xData,        // 初始数据为空
                axisLabel: {
                    interval: 0, // 设置刻度标签全部显示
                    color: '#fff',
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
                name: '单位(亿元)',
                min: 0,
                max: 500,
                interval: 100,
                type: "value",
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
                name: '大额交易总金额',
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                label: {
                    show: true,
                    position: 'top',
                    color: '#0080FF'
                },
                lineStyle: {
                    color: "#3C97F1",
                    width: 3, // 设置折线宽度为2
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
            end: 30,
            zoomOnMouseWheel: false,
        },
    };
    state.option.series.forEach((item, index) => {
        item.data = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 500);
            item.data.push(randomNum);
        }
    })
}
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    width: 432px;
    height: 206px;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 54px;
}
</style>