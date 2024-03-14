<template>
    <div class="leftTopChart">
        <div class="mainTitle ttf">
            <p>今日风险预警</p>
        </div>
        <div class="chart">
            <div class="bar">
                <my-chart :width="888" :height="156" :option="state.option"></my-chart>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";


import icon1 from "@/images/riskWarning/icon-1.png";
import icon2 from "@/images/riskWarning/icon-2.png";
import icon3 from "@/images/riskWarning/icon-3.png";
import icon4 from "@/images/riskWarning/icon-4.png";

const state = reactive({
    option: {},
    data: [
        {
            label: "今日发现",
            value: 30,
        },
        {
            label: "今日推送",
            value: 30
        },
        {
            label: "今日超时未处理",
            value: 30
        },
        {
            label: "今日处置完成",
            value: 30
        },
    ],
    // [w,h,x,y,img]
    dataPosition: [[80, 0, 100, 0, icon1], [80, 0, 302, 0, icon2], [80, 0, 504, 0, icon3], [80, 0, 706, -12, icon4]],
    // [x,y]
    dataLabelPosition: [[40, 90], [40, 90], [40, 90], [40, 102]],
    dataValuePosition: [[40, 115], [40, 115], [40, 115], [40, 127]],
    index: 0
});



const init = () => {
    state.option = {
        graphic: {
            elements: [
            ]
        }
    }
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
                x: state.dataPosition[index][2] + state.dataLabelPosition[index][0],
                y: state.dataPosition[index][3] + state.dataLabelPosition[index][1],
                text: item.label,
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
        state.option.graphic.elements.push({
            type: "text",
            style: {
                x: state.dataPosition[index][2] + state.dataValuePosition[index][0],
                y: state.dataPosition[index][3] + state.dataValuePosition[index][1],
                text: `${item.value} {a|项}`,
                rich: {
                    a: {
                        fontSize: 14,
                        fill: '#fff',
                        padding: [4, 0, 0, -5],
                    }
                },
                font: "26px Microsoft YaHei",
                fill: "#00CCFF",
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
    height: 218px;
    margin-bottom: 40px;
    margin-top: 30px;

    .chart {
        background: url("@images/riskWarning/item-bg.png") center bottom / 100% no-repeat;
        width: 888px;
        height: 156px;
        box-sizing: border-box;
        border: 1px solid #24387c;
        border-radius: 8px;
        overflow: hidden;
    }
}
</style>
  