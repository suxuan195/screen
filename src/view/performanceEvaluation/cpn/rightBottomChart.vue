<template>
    <div class="leftTopChart">
        <div class="title">
            <p class="ttf" @click="tClick">{{ title }}</p>
            <div class="more" @click="moreClick" v-if="isBack">返回</div>
        </div>
        <div v-show="!isBack">
            <my-chart :width="888" :height="360" :option="state.option" :click="true" :params="_params"
                @clickCallBack="clickACallBack"></my-chart>
        </div>
        <div v-show="isBack">
            <my-chart :width="888" :height="200" :option="state.option1"></my-chart>
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="450px"
                :tableHeader="state.tableHeader"></custom-table>
        </div>
        <rightBottomDialog ref="rightBottomDialogRef" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import rightBottomDialog from "../dialog/rightBottomDialog.vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const isBack = ref(false);
const rightBottomDialogRef = ref(null);
const title = ref('经营增长综合分析');
const state = reactive({
    option: {},
    xData: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
        "",
        "",
        "",
        "",
        "",
        "",
        "",

    ],
    title: ['销售增长率', '资本保值增长率', '销售(营业)利润增长率', '总资产增长率', '技术投入比率'],
    colorList: ["#F6BB3B", "#3C97F1", "#6BDAFF", "#FC9202", "#5C6C80"],
    option1: {},
    title1: ['本月', '同比增长'],
    colorList1: ["#6BDAFF", "#EBAC23"],
    tableHeader: [
        {
            prop: 'title',
            width: 100
        },
        {
            label: "1月",
            prop: "month1",
        },
        {
            label: "2月",
            prop: "month2",
        },
        {
            label: "3月",
            prop: "month3",
        },
        {
            label: "4月",
            prop: "month4",
        },
        {
            label: "5月",
            prop: "month5",
        },
        {
            label: "6月",
            prop: "month6",
        },
        {
            label: "7月",
            prop: "month7",
        },
        {
            label: "8月",
            prop: "month8",
        },
        {
            label: "9月",
            prop: "month9",
        },
        {
            label: "10月",
            prop: "month10",
        },
        {
            label: "11月",
            prop: "month11",
        },
        {
            label: "12月",
            prop: "month12",
        },
    ],
    tableData: [
        {
            title: '本月',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '同比增长',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        }
    ],
});

let selected = {}
const legendData = state.title.map((item, index) => {
    selected[item] = index === 0
    return { name: item, itemStyle: { color: state.colorList[index] } }
})
const init = () => {
    state.option = {
        grid: {
            left: "35",
            right: "30",
            top: "40",
            bottom: "50",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    console.log(item);
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 5]
                        };margin-right:6px;display:inline-block;"></span>${item.seriesName} ${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
            },
        },
        legend: {
            data: legendData,
            selected: selected,
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "5",
            itemWidth: 12, // 图例标15的宽度
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
                    show: false,
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
                        color: "#0BE6E6",
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 30,
                interval: 5,
                axisTick: {
                    alignWithLabel: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#0BE6E6"],
                    },
                },
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 12,
                    formatter: function (value) {
                        return value + ' %'; // 自定义 Y 轴名称格式
                    }
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        ],
        series: [
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
    state.title.forEach((item, index) => {
        let arr = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 30);
            arr.push(randomNum);
        }
        let serviceItem = {
            name: item,
            type: "line",
            lineStyle: {
                color: state.colorList[index],
            },
            symbol: "circle", // 圆点的形状
            symbolSize: 6, // 圆点的大小
            itemStyle: {
                color: state.colorList[index], // 圆点的颜色
                shadowColor: "#fff", // 阴影颜色
                shadowBlur: 4, // 阴影模糊程度
            },
            emphasis: {
                itemStyle: {
                    borderColor: "#fff", // 圆点边框颜色
                    borderWidth: 2, // 圆点边框宽度
                },
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
                            color: hexToRgb(state.colorList[index], 0.1),
                        },
                        {
                            offset: 1,
                            color: hexToRgb(state.colorList[index], 0),
                        },
                    ],
                    false
                ),
                shadowColor: hexToRgb(state.colorList[index], 0.9), //阴影颜色
                shadowBlur: 20,
            },
        }
        state.option.series.push(serviceItem)
    })
    // state.option.series.forEach((item) => {
    //     item.data = [];
    //     for (let i = 0; i < 8; i++) {
    //         let randomNum = Math.floor(Math.random() * 100);
    //         item.data.push(randomNum);
    //     }
    // });
};
const legendData1 = state.title1.map((item, index) => {
    return { name: item, itemStyle: { color: state.colorList1[index] } }
})
const init1 = () => {
    state.option1 = {
        grid: {
            left: "35",
            right: "30",
            top: "40",
            bottom: "30",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    console.log(item);
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 6]
                        };margin-right:6px;display:inline-block;"></span>${item.seriesName} ${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
            },
        },
        legend: {
            data: legendData1,
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            left: "center",
            top: "5",
            itemWidth: 12, // 图例标15的宽度
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
                    show: false,
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
                        color: "#0BE6E6",
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 30,
                interval: 5,
                axisTick: {
                    alignWithLabel: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#0BE6E6"],
                    },
                },
                axisLabel: {
                    show: true,
                    color: "#fff",
                    fontSize: 12,
                    formatter: function (value) {
                        return value + ' %'; // 自定义 Y 轴名称格式
                    }
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        ],
        series: [
            {
                name: '本月',
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.colorList1[0] }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.colorList1[0], 0) }, // 渐变终止颜色
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
            },
            {
                name: '同比增长',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: state.colorList1[1],
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: state.colorList1[1], // 圆点的颜色
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
                                color: hexToRgb(state.colorList1[1], 0.3),
                            },
                            {
                                offset: 1,
                                color: hexToRgb(state.colorList1[1], 0),
                            },
                        ],
                        false
                    ),
                    shadowColor: hexToRgb(state.colorList1[1], 0.9), //阴影颜色
                    shadowBlur: 20,
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
    state.option1.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 30);
            item.data.push(randomNum);
        }
    });
};
const clickACallBack = () => {
    isBack.value = true
    title.value = '技术投入比率趋势'
}
const tClick = () => {
    rightBottomDialogRef.value.showModel = true
}
const moreClick = () => {
    isBack.value = false
    title.value = '经营增长综合分析'
}
onMounted(() => {
    init();
    init1()
});
</script>
    
<style lang="scss" scoped>
.leftTopChart {
    margin-bottom: 54px;
    margin-top: 16px;
    width: 888px;
    height: 400px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        p {
            margin: 0;
            font-size: 18px;
            font-weight: normal;
            line-height: 18px;
            letter-spacing: 0px;
            background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            cursor: pointer;
        }

        .more {
            font-size: 16px;
            font-weight: normal;
            line-height: 16px;
            letter-spacing: 0px;
            color: rgba(214, 239, 255, 0.6);
            cursor: pointer;

            &:hover {
                color: rgba(214, 239, 255, 1);
            }
        }
    }
}
</style>