<template>
    <div class="leftBottomDialog">
        <Dialog :width="1200" :height="600" :showModel="showModel" title="责任认定" @close="close">
            <ul class="mX24">
                <li>
                    <div class="title_box">
                        <h2 class="ttf">各行业认定情况</h2>
                        <i>单位：个</i>
                    </div>
                    <my-chart :width="580" :height="500" :option="state.option"></my-chart>
                </li>
                <li>
                    <div class="title_box">
                        <h2 class="ttf">各企业认定情况</h2>
                        <i>单位：个</i>
                    </div>
                    <my-chart :width="600" :height="520" :option="state.option1" :click="true" :clickA="true"
                        :params="_params"></my-chart>
                </li>
            </ul>
        </Dialog>
    </div>
</template>
    
<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import Dialog from "@components/Dialog/index.vue";
const showModel = ref(false)
const _params = ref(null);
const state = reactive({
    option: {},
    xData: [
        "集团管控",
        "风险管理",
        "工程承包",
        "资金管理",
        "股权转让",
        "固定资产\n投资",
        "投资并购",
        "改组改制",
        "境外经营",
        "",
        "",
        "",
        ""
    ],
    option1: {},
    xData1: ["1、甘肃省公路航空旅游投资集团有限公司",
        "2、金川集团股份有限公司",
        "3、甘肃省建设投资（控股）集团有限公司",
        "4、酒泉钢铁（集团）有限责任公司",
        "5、酒泉钢铁（集团）有限责任公司",
        "6、酒泉钢铁（集团）有限责任公司",
        "7、酒泉钢铁（集团）有限责任公司",
        "8、酒泉钢铁（集团）有限责任公司",
        "9、酒泉钢铁（集团）有限责任公司",
        "10、酒泉钢铁（集团）有限责任公司"],
    dataList1: [111, 6, 67, 6, 23, 45, 34, 22, 43, 12]
});
onMounted(() => {
    init();
    init1()
});

const init = () => {
    state.option = {
        grid: {
            left: "50",
            right: "20",
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
                interval: 0,
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
                max: 80,
                interval: 10,
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
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        ],
        series: [
            {
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb("#0BE6E6", 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    offset: [0, 15],
                    show: true,
                    position: 'top',
                    formatter: [
                        '{a|{c}}',
                        '{c|}',
                    ].join('\n'), // 使用 rich 属性和 formatter 属性
                    rich: {
                        a: {
                            color: '#0BE6E6',
                            fontSize: 12,
                            align: 'center',
                        },
                        c: {
                            backgroundColor: {
                                image: 'https://z1.ax1x.com/2023/11/01/piuu0sO.png'
                            },
                            width: 22,
                            height: 22,
                            align: 'center',
                        }
                    }
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
        for (let i = 0; i < 9; i++) {
            let randomNum = Math.floor(Math.random() * 80);
            item.data.push(randomNum);
        }
    });
};
const init1 = () => {
    state.option1 = {
        grid: {
            left: "0",
            right: "50",
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
                    color: '#EBAC23',
                    fontSize: "18",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
                data: state.dataList1,
            },
        ],
        series: [
            {
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#EBAC23' }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb('#EBAC23', 0) }, // 渐变终止颜色
                    ]),
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
                data: state.dataList1,
            },
            // {
            //     type: "bar",
            //     barWidth: 4,
            //     itemStyle: {
            //         color: "rgba(60,151,241,.1)",
            //     },
            //     data: [200, 200, 200, 200, 200, 200, 200, 200],
            //     barGap: "-100%",
            //     tooltip: {
            //         show: false,
            //     },
            // },
        ],
    };

};

const close = () => {
    showModel.value = false
}
defineExpose({
    showModel
})
</script>
    
<style lang="scss" scoped>
.leftBottomDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
        display: flex;

        li {
            width: 48%;

            .title_box {
                display: flex;
                justify-content: space-between;
                align-items: center;

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

                i {
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 12px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }
        }

        li:last-child {
            margin-left: 4%;
        }
    }
}
</style>