<template>
    <div class="leftBottomTop5">
        <topTitle title="平台I/O TOP5" :is-other-text="false" :is-date-show="false" />
        <div class="box">
            <my-chart :width="400" :height="200" :option="state.option"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import topTitle from '@components/applicationModuleManagment/topTitle.vue';

const state = reactive({
    progressData: [
        {
            name: "资源中心服务器18",
            num: 1366,
            value: 1366,
        },
        {
            name: "资源中心服务器10",
            num: 1366,
            value: 4444,
        },
        {
            name: "资源中心服务器04",
            num: 1366,
            value: 800,
        },
        {
            name: "资源中心服务器16",
            num: 1366,
            value: 800,
        },
        {
            name: '资源中心服务器01',
            num: 1366,
            value: 800,
        }
    ],
    option: {},
    list: [
        {
            name: "省属国企",
            value: "29",
            unit: "户",
        },
        {
            name: "国有全资企业",
            value: "810",
            unit: "户",
        },
        {
            name: "国有控股企业",
            value: "638",
            unit: "户",
        },
        {
            name: "全级次企业",
            value: "638",
            unit: "户",
        },
        {
            name: "国有参股企业",
            value: "638",
            unit: "户",
        },
        {
            name: "国有实际控股企业",
            value: "638",
            unit: "户",
        },
    ],
    xData: ["资源中心服务器18", "资源中心服务器10", "资源中心服务器04", "资源中心服务器16", "资源中心服务器01"],
    dataList: [9, 9, 9, 19, 9],
    colorList: ["#1D70BE", "#F6BB3B", "#A2A256", "#1D70BE", "#F1606C"],
    mainColor: "#3C97F1",
})
onMounted(() => {
    init();
});

const init = () => {
    state.option = {
        grid: {
            left: "0",
            right: "0",
            top: "10",
            bottom: "0",
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
                console.log(p);
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.dataIndex]
                        };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
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
                data: state.xData,
                axisLabel: {
                    formatter: function (value, index) {
                        return `{b${index}|●} {a${index}|NO.${index + 1}}  ${value}`;
                    },
                    rich: {
                        a0: {
                            width: 30,
                            color: state.colorList[0],
                            borderRadius: 3,
                            backgroundColor: hexToRgb(state.colorList[0], 0.3),
                            padding: 2,
                        },
                        a1: {
                            width: 30,
                            color: state.colorList[1],
                            borderRadius: 3,
                            backgroundColor: hexToRgb(state.colorList[1], 0.3),
                            padding: [2, 4],
                        },
                        a2: {
                            width: 30,
                            color: state.colorList[2],
                            borderRadius: 3,
                            padding: 2,
                            backgroundColor: hexToRgb(state.colorList[2], 0.3),
                        },
                        a3: {
                            width: 30,
                            color: state.colorList[3],
                            borderRadius: 3,
                            padding: 2,
                            backgroundColor: hexToRgb(state.colorList[3], 0.3),
                        },
                        a4: {
                            width: 30,
                            color: state.colorList[4],
                            borderRadius: 3,
                            padding: 2,
                            backgroundColor: hexToRgb(state.colorList[4], 0.3),
                        },
                        b0: {
                            color: state.colorList[0],
                        },
                        b1: {
                            color: state.colorList[1],
                        },
                        b2: {
                            color: state.colorList[2],
                        },
                        b3: {
                            color: state.colorList[3],
                        },
                        b4: {
                            color: state.colorList[4],
                        },
                    },
                    color: "#fff",
                    fontSize: 12,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-22, 0, 0, 0],
                },
            },
            // {
            //     type: "category",
            //     inverse: true,
            //     axisTick: "none",
            //     axisLine: "none",
            //     show: true,
            //     offset: -10,
            //     axisLabel: {
            //         color: state.mainColor,
            //         fontSize: "14",
            //         verticalAlign: "top",
            //         align: "right",
            //         padding: [-22, 0, 0, 0],
            //         formatter: function (value, index) {
            //             return `{a${index}|${value}}` + '{d|次}';
            //         },
            //         rich: {
            //             a0: {
            //                 color: state.colorList[0],
            //                 fontSize: 20
            //             },
            //             a1: {
            //                 color: state.colorList[1],
            //                 fontSize: 20
            //             },
            //             a2: {
            //                 color: state.colorList[2],
            //                 fontSize: 20
            //             },
            //             a3: {
            //                 color: state.colorList[3],
            //                 fontSize: 20
            //             },
            //             a4: {
            //                 color: state.colorList[4],
            //                 fontSize: 20
            //             },
            //             d: {
            //                 color: "#fff",
            //                 fontSize: 12,
            //                 padding: [0, 0, 0, 5]
            //             }
            //         },
            //     },
            //     data: state.dataList,
            // },
        ],
        // series: [
        //     {
        //         name: "企业户数",
        //         type: "bar",
        //         barWidth: 4,
        //         itemStyle: {
        //             color: function (params) {
        //                 return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        //                     { offset: 0, color: state.colorList[params.dataIndex] }, // 渐变起始颜色
        //                     {
        //                         offset: 1,
        //                         color: hexToRgb(state.colorList[params.dataIndex], 0),
        //                     }, // 渐变终止颜色
        //                 ]);
        //             },
        //             borderRadius: [3, 3, 0, 0],
        //         },
        //         barGap: "60%",
        //         label: {
        //             show: true,
        //             formatter: "",
        //             backgroundColor: "#fff",
        //             width: 4,
        //             height: 4,
        //             position: "right",
        //             offset: [-7, 0],
        //             borderWidth: 2,
        //             borderColor: "rgba(255,255,255,0.2)",
        //             borderRadius: 2,
        //             shadowColor: "#fff",
        //             shadowBlur: 6,
        //         },
        //         data: state.dataList,
        //     },
        //     {
        //         type: "bar",
        //         barWidth: 4,
        //         itemStyle: {
        //             color: "rgba(60,151,241,.1)",
        //         },
        //         data: [100, 100, 100, 100, 100, 100, 100, 100],
        //         barGap: "-100%",
        //         tooltip: {
        //             show: false,
        //         },
        //     },
        // ],
    };
};
</script>
    
<style lang="scss" scoped>
.leftBottomTop5 {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 240px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;

    .box {
        margin-top: 10px;
        max-height: 200px;
        overflow: auto;


    }

    /* 隐藏滚动条 */
    ::-webkit-scrollbar {
        display: none;
    }
}
</style>