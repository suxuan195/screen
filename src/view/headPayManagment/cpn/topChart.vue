<template>
    <div class="topChart">
        <my-chart :width="1820" :height="400" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
var xAxisGroupData = ["酒钢集团", "金川公司",
    "白银有色集团", "兰石集团", "甘肃农垦",
    "甘肃物流集团", "甘肃机场集团", "甘肃国投",
    "甘肃公航旅集团", "甘肃省城乡发展集团", "甘肃能化集团",
    "甘肃铁投集团", "甘咨询", "甘肃电气集团", "甘肃公交建集团",
    "甘肃科技集团", "信息港公司", "甘肃文旅集团", "甘肃新业公司",
    "白银产业公司", "知识产权港公司"];
var groupSeparates = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]; // 分组分隔线
var xAxisData = ["2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022", "2021", "2022",]

const state = reactive({
    option: {},
    title: ["负责人薪酬", "利润"],
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

    ],

});
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
            right: "45",
            top: "50",
            bottom: "90",
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
            left: "center",
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
        xAxis: [//主要部分
            {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                },
                position: 'bottom',
                axisTick: {
                    length: 0,
                },
                axisLabel: {
                    margin: 10,
                    color: '#fff'
                }
            },
            {
                position: 'bottom',
                data: xAxisGroupData,
                // axisTick: {
                //     length: 40,
                //     interval: function (index, value) {
                //         return groupSeparates[index];
                //     }
                // },
                axisLabel: {
                    margin: 30,
                    interval: 0,
                    color: '#fff',
                    rich: {
                        padding10: {
                            padding: [0, 0, 0, 10]
                        },
                        padding30: {
                            padding: [0, 0, 0, 30]
                        }
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "单位(亿元)",
                min: 0,
                max: 1000,
                interval: 500,
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
                name: "单位(万元)",
                type: "value",
                min: 0,
                max: 1000,
                interval: 500,
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
                name: "利润",
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
            },
            {
                name: "负责人薪酬",
                type: "line",
                yAxisIndex: 1,
                // smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + "(亿元)";
                    },
                },
                lineStyle: {
                    width: 4,
                    color: '#EBAC23',

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
            },
        ],
        dataZoom: {
            show: true, // 为true 滚动条出现
            realtime: true,
            type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            start: 0, // 表示默认展示20%～80%这一段。
            end: 60,
            zoomOnMouseWheel: false,
        },
    };
    state.option.series.forEach((item, itemIndex) => {
        item.data = []
        for (let i = 0; i < 42; i++) {
            let randomNum = Math.floor(Math.random() * 1000);
            item.data.push(randomNum);
        }
    })
};
</script>
<style lang="scss" scoped>
.topChart {
    background: url("@images/payrollManagement/border.png") 0% 0% / 100% 100%;
    width: 1820px;
    height: 400px;
    margin-bottom: 54px;
}
</style>