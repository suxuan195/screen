<template>
    <div class="leftCenterDialog">
        <Dialog :width="1200" :height="600" :showModel="showModel" title="认定损失及损失风险" @close="close">
            <ul class="mX24">
                <li v-for="(item, index) in  state.options" :key="index + '11'">
                    <div class="title_box">
                        <h2 class="ttf">{{ state.titles[index] }}</h2>
                        <i>单位：万元</i>
                    </div>
                    <my-chart :width="600" :height="520" :option="item" :click="true" :clickA="true"
                        :params="_params"></my-chart>
                </li>
            </ul>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive, onMounted, } from 'vue'
const showModel = ref(false)
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const state = reactive({
    titles: ['各企业认定损失', '各企业损失风险'],
    options: [],
    xData1: [
        ["1、甘肃省公路航空旅游投资集团有限公司",
            "2、金川集团股份有限公司",
            "3、甘肃省建设投资（控股）集团有限公司",
            "4、酒泉钢铁（集团）有限责任公司",
            "5、酒泉钢铁（集团）有限责任公司",
            "6、酒泉钢铁（集团）有限责任公司",
            "7、酒泉钢铁（集团）有限责任公司",
            "8、酒泉钢铁（集团）有限责任公司",
            "9、酒泉钢铁（集团）有限责任公司",
            "10、酒泉钢铁（集团）有限责任公司"],
        [
            "1、甘肃省公路航空旅游投资集团有限公司",
            "2、金川集团股份有限公司",
            "3、甘肃省建设投资（控股）集团有限公司",
            "4、酒泉钢铁（集团）有限责任公司",
            "5、酒泉钢铁（集团）有限责任公司",
            "6、酒泉钢铁（集团）有限责任公司",
            "7、酒泉钢铁（集团）有限责任公司",
            "8、酒泉钢铁（集团）有限责任公司",
            "9、酒泉钢铁（集团）有限责任公司",
            "10、酒泉钢铁（集团）有限责任公司"
        ]
    ],
    dataList1: [[100, 6, 67, 6, 23, 45, 34, 22, 43, 12], [100, 6, 212, 6, 23, 45, 34, 22, 43, 123]],
    colorList: ["#3C97F1", "#EBAC23"],
});
onMounted(() => {
    init();
});


const init = () => {
    state.titles.forEach((item, index) => {
        state.options[index] = {
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
                    data: state.xData1[index],
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
                        color: state.colorList[index],
                        fontSize: "18",
                        verticalAlign: "top",
                        align: "right",
                        padding: [-22, 0, 0, 0],
                    },
                    data: state.dataList1[index],
                },
            ],
            series: [
                {
                    type: "bar",
                    barWidth: 4,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            { offset: 0, color: state.colorList[index] }, // 渐变起始颜色
                            { offset: 1, color: hexToRgb(state.colorList[index], 0) }, // 渐变终止颜色
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
                    data: state.dataList1[index],
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
    })

};

const close = () => {
    showModel.value = false
}
defineExpose({
    showModel
})
</script>
    
<style lang="scss" scoped>
.leftCenterDialog {
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
