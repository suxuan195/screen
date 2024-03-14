<template>
    <div class="leftTopChart">
        <div class="mainTitle ttf">
            <p>风险处置监控</p>
        </div>
        <div class="chart">
            <div class="bar">
                <my-chart :width="888" :height="600" :option="state.option"></my-chart>
            </div>       
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import bgList from "@/images/riskWarning/bg-list.png";
import bgItem from "@/images/riskWarning/bg-item.png";
import bgItem1 from "@/images/riskWarning/bg-item-1.png";

const state = reactive({
    option: {},
    data: [
        {
            label: "累计预警",
            value: 25,
        },
        {
            label: "累计推送",
            value: 22
        },
        {
            label: "处置中",
            value: 25
        },
        {
            label: "超时未处置",
            value: 4
        },
        {
            label: "处理完成",
            value: 4
        },
    ],

    // [x,y,color]
    dataLabelPosition: [[70, 100, '#F1606C'], [335, 100, '#37D3DB'], [610, 100, '#E7A923'], [70, 380, '#F1606C'], [545, 380, '#37D3DB']],
    index: 0

});



const init = () => {
    state.option = {
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: bgList,
                        x: 140,
                        y: 140,
                        width: 600,
                    },
                }
            ]
        }
    }
    state.data.forEach((item, index) => {
        let margin = index > 2 ? 30 : 0
        state.option.graphic.elements.push({
            type: "image",
            style: {
                image: index > 2 ? bgItem1 : bgItem,
                x: state.dataLabelPosition[index][0],
                y: state.dataLabelPosition[index][1],
                width: index > 2 ? 240 : 180,
                // height: state.dataPosition[index][1],
            },

        })
        state.option.graphic.elements.push({
            type: "text",
            style: {
                x: state.dataLabelPosition[index][0] + 90 + margin,
                y: state.dataLabelPosition[index][1] + 65,
                text: item.label,
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
        state.option.graphic.elements.push({
            type: "text",
            style: {
                x: state.dataLabelPosition[index][0] + 90 + margin,
                y: state.dataLabelPosition[index][1] + 25,
                text: `${item.value} {a|项}`,
                rich: {
                    a: {
                        fontSize: 14,
                        fill: '#fff',
                        padding: [10, 0, 0, -5],
                        textShadowBlur: 0,
                        textShadowColor: 'transparent'
                    }
                },
                font: "30px Microsoft YaHei",
                fill: state.dataLabelPosition[index][2],
                textAlign: "center",
                textBaseline: "middle",
                textShadowColor: state.dataLabelPosition[index][2],
                textShadowBlur: 15,
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
    height: 652px;
    margin-bottom: 40px;

    .chart {
        background: url("@images/riskWarning/item-bg.png") center bottom / 100% no-repeat;
        width: 888px;
        height: 600px;
        box-sizing: border-box;
        border: 1px solid #24387c;
        border-radius: 8px;
        overflow: hidden;
    }
}
</style>
  