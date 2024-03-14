<template>
    <div class="leftTopChart">
        <div class="mainTitle ttf">
            <p>风险总览</p>
        </div>
        <div class="chart">
            <div class="bar">
                <my-chart :width="888" :height="856" :option="state.option"></my-chart>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import textBgl from "@/images/riskWarning/text-bg-l.png";
import textBgm from "@/images/riskWarning/text-bg-m.png";
import textBgs from "@/images/riskWarning/text-bg-s.png";

import r1 from "@/images/riskWarning/r1.png";
import r2 from "@/images/riskWarning/r2.png";
import r3 from "@/images/riskWarning/r3.png";
import r4 from "@/images/riskWarning/r4.png";
import r5 from "@/images/riskWarning/r5.png";
import r6 from "@/images/riskWarning/r6.png";
import r7 from "@/images/riskWarning/r7.png";
const state = reactive({
    option: {},
    data: [
        {
            label: "涉外风险",
            value: 0,
        },
        {
            label: "盈利风险",
            value: 0
        },
        {
            label: "投资风险",
            value: 5
        },
        {
            label: "运营风险",
            value: 8
        },
        {
            label: "经营风险",
            value: 0
        },
        {
            label: "筹款风险",
            value: 0
        },
        {
            label: "财务风险",
            value: 13
        }
    ],
    list: [
        {
            label: "带息负债大于预算",
            value: 2
        },
        {
            label: "两金增速大于营业收入增速",
            value: 3
        },
        {
            label: "资产负债率过高",
            value: 2
        },
        {
            label: "已完工项目未结算",
            value: 4
        },
        {
            label: "票据逾期",
            value: 1
        },
        {
            label: "欠款项目",
            value: 3
        },
        {
            label: "两金增速大于营业收入增速",
            value: 6
        },
        {
            label: "带息负债大于预算",
            value: 2
        },
        {
            label: "资产负债率过高",
            value: 2
        },
    ],
    // [w,h,x,y,img]
    dataPosition: [[240, 240, 0, -20, r1], [227, 227, 180, 80, r2], [260, 260, 400, 40, r3], [260, 260, 80, 300, r4], [240, 240, 450, 260, r5], [240, 240, 110, 550, r6], [260, 260, 500, 500, r7]],
    // [x,y]
    dataTextPosition: [[128, 150], [120, 140], [130, 160], [135, 165], [128, 150], [128, 150], [130, 157]],
    // [x,y,bg]
    listPosition: [[340, 50, textBgm], [560, 70, textBgl], [620, 240, textBgm], [40, 320, textBgm], [300, 400, textBgs], [270, 540, textBgs], [560, 520, textBgl], [360, 720, textBgm], [620, 770, textBgm]],
    // [x,y]
    listTextPositon: [[105, 15], [150, 15], [103, 15], [103, 15], [72, 15], [72, 15], [150, 15], [105, 15], [105, 15]],
    index: 0
});



const init = () => {
    state.option = {
        graphic: {
            elements: [
            ]
        }
    }
    state.list.forEach((item, index) => {
        state.option.graphic.elements.push({
            type: "image",
            style: {
                image: state.listPosition[index][2],
                x: state.listPosition[index][0],
                y: state.listPosition[index][1],
                height: 60
            },
        })
        state.option.graphic.elements.push({
            type: "text",
            style: {
                x: state.listPosition[index][0] + state.listTextPositon[index][0],
                y: state.listPosition[index][1] + state.listTextPositon[index][1],
                text: `${item.label}(${item.value})`,
                font: "16px Microsoft YaHei",
                fill: "#fff",
                textAlign: "center",
                textBaseline: "middle"
            },
            onclick: (e) => {
                state.index = index
                console.log(state.index)
            }
        })
    })
    state.data.forEach((item, index) => {
        state.option.graphic.elements.push({
            type: "image",
            style: {
                image: state.dataPosition[index][4],
                x: state.dataPosition[index][2],
                y: state.dataPosition[index][3],
                width: state.dataPosition[index][0],
                // height: state.dataPosition[index][1],
            },
            onclick: (e) => {
                state.index = index
                console.log(state.index)
            }

        })
        state.option.graphic.elements.push({
            type: "text",
            style: {
                x: state.dataPosition[index][2] + state.dataTextPosition[index][0],
                y: state.dataPosition[index][3] + state.dataTextPosition[index][1],
                text: `${item.label}(${item.value})`,
                font: "18px Microsoft YaHei",
                fill: "#fff",
                textAlign: "center",
                textBaseline: "middle"
            },
            onclick: (e) => {
                state.index = index
                console.log(state.index)
            }
        })
    })
};
onMounted(() => {
    init();
});
</script>
  
<style lang="scss" scoped>
.leftTopChart {
    width: 888px;
    height: 918px;
    margin-bottom: 40px;
    margin-top: 30px;

    .chart {
        background: url("@images/riskWarning/item-bg.png") 0% 0% / 100% 100% no-repeat;
        width: 888px;
        height: 856px;
        box-sizing: border-box;
        border: 1px solid #24387c;
        border-radius: 8px;
        overflow: hidden;
    }
}
</style>
  