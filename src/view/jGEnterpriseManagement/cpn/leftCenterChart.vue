<template>
    <div class="leftCenterChart">
        <div v-for="(item, index) in  state.options" :key="index + 'option'">
            <h2 class="ttf">{{ props.titles[index] }}</h2>
            <my-chart :width="400" :height="90" :option="item" :click="true" :params="_params"
                @clickCallBack="clickCallBack"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const props = defineProps({
    dataList: {
        type: Array,
        default: () => [
            [
                698.56, 883
            ],
            [
                127.14, 163
            ]
        ]
    },
    titles: {
        type: Array,
        default: () => [
            '镍', '铜'
        ]
    }
})
watch(props, () => {
    init()
})
const state = reactive({
    options: [],
    titles: ['镍', '铜'],
    xData: ["累计产量", "年目标产量"],
    colorList: ["#68D8FD", "#F6BB3B"],
});

const refCenterBottomRef = ref(null)
const organizationTotalRef = ref(null)

const itemClick = () => {
    refCenterBottomRef.value.showModel = true
}
const clickCallBack = () => {
}
const init = () => {
    props.titles.forEach((item, index) => {
        state.options[index] = {
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
                    _params.value = p;
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
                            return `{b${index}|●} {a| ${value}}`;
                        },
                        rich: {
                            a: {
                                fontSize: 14
                            },
                            b0: {
                                color: state.colorList[0],
                            },
                            b1: {
                                color: state.colorList[1],
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
                {
                    type: "category",
                    inverse: true,
                    axisTick: "none",
                    axisLine: "none",
                    show: true,
                    offset: -10,
                    axisLabel: {
                        fontSize: "14",
                        verticalAlign: "top",
                        align: "right",
                        padding: [-22, 0, 0, 0],
                        formatter: function (value, index) {
                            return `{a${index}|${value}} {c|万吨}`;
                        },
                        rich: {
                            a0: {
                                color: state.colorList[0],
                                fontSize: 20
                            },
                            a1: {
                                color: state.colorList[1],
                                fontSize: 20
                            },
                            c: {
                                color: '#fff',
                                fontSize: 12
                            }
                        },
                    },
                    data: props.dataList[index],
                },
            ],
            series: [
                {
                    type: "bar",
                    barWidth: 4,
                    itemStyle: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                { offset: 0, color: state.colorList[params.dataIndex] }, // 渐变起始颜色
                                {
                                    offset: 1,
                                    color: hexToRgb(state.colorList[params.dataIndex], 0),
                                }, // 渐变终止颜色
                            ]);
                        },
                        borderRadius: [3, 3, 0, 0],
                    },
                    barGap: "60%",
                    showBackground: true,//开启背景
                    backgroundStyle: {//设置背景样式
                        color: "rgba(255, 255, 255, 0.08)",
                        barBorderRadius: 10,
                    },
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
                    data: props.dataList[index],
                },
            ],
        };
    })

};
onMounted(() => {
    init();
});
</script>
  
<style lang="scss" scoped>
.leftCenterChart {
    width: 432px;
    height: 218px;
    margin-bottom: 50px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    padding: 11px 16px;
    box-sizing: border-box;

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
    }
}
</style>
  