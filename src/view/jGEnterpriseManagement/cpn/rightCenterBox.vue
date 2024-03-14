<template>
    <div class="rightCenterBox">
        <ul class="top_box">
            <li>
                <img src='@images/jGEnterpriseManagement/研发经费.png' alt="">
                <div>
                    <p><span>{{ rcList[0][0] }}</span><i>%</i></p>
                    <span class="desc">研发经费投入强度</span>
                </div>
            </li>
            <li style="margin-left: 34px;">
                <img src='@images/jGEnterpriseManagement/科技人员.png' alt="">
                <div>
                    <p><span>{{ rcList[0][1] }}</span><i>人</i></p>
                    <span class="desc">科技人员数</span>
                </div>
            </li>
        </ul>
        <div class="bottom_box">
            <div class="img_box">
                <img src='@images/jGEnterpriseManagement/专利.png' alt="" srcset="">
                <h2>专利情况</h2>
            </div>
            <div>
                <my-chart ref="chartRef" :width="330" :height="140" :option="state.option" :click="true" :params="_params"
                    @clickCallBack="clickACallBack"></my-chart>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const chartRef = ref(null)
const _params = ref(null);
const props = defineProps({
    rcList: {
        type: Array,
        default: () => []
    }
})
watch(props, () => {
    init()
})
const state = reactive({
    option: {},
    xData: [
        "累计专利数",
        "专利申请数",
        "专利授权数",
    ],
    title: ["企业户数"],
    mainColor: "#3C97F1",
});
// const organizationTotalRef = ref(null);
const clickACallBack = () => {
    // organizationTotalRef.value.showModel = true
}
const init = () => {
    state.option = {
        grid: {
            left: "20",
            right: "30",
            top: "20",
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
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.mainColor
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
                        return `${value}`;
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
                axisLabel: {
                    color: state.mainColor,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 10, 0, 0],
                },
                data: props.rcList[1],
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
                data: props.rcList[1],
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                }
            }
        ]
    };
};
onMounted(() => {
    init()
});
</script>
    
<style lang="scss" scoped>
.rightCenterBox {
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    width: 432px;
    height: 218px;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 54px;

    .top_box {
        display: flex;

        li {
            display: flex;

            img {
                width: 64px;
                height: 64px;
            }

            div {
                margin-left: 5px;
                height: 64px;
                width: 120px;
                background-image: url('@images/jGEnterpriseManagement/研发&科技.png');
                background-size: 100% 100%;
                padding-top: 8px;
                padding-left: 18px;
                box-sizing: border-box;

                p {
                    >span {
                        font-size: 28px;
                        font-weight: 600;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #00CCFF;
                    }

                    i {
                        padding-left: 4px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        text-align: center;
                        letter-spacing: 0.2em;
                        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                    }
                }

                .desc {
                    white-space: nowrap;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 14px;
                    color: #FFFFFF;
                }
            }
        }
    }

    .bottom_box {
        display: flex;

        .img_box {
            width: 100.63px;

            img {
                width: 100.63px;
                height: 98.52px;
            }

            h2 {
                font-size: 16px;
                font-weight: 500;
                line-height: 16px;
                text-align: center;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            }
        }
    }
}
</style>