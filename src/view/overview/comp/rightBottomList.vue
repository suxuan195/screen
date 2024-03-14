<template>
  <div class="rightBottom">
    <div class="mainTitle ttf">
      <p>企业决策异常数量top5</p>
    </div>
    <div class="list">
      <my-chart :width="432" :height="218" :option="state.option" :click="true" :params="_params"
        @clickCallBack="clickACallBack"></my-chart>
    </div>
    <!-- 异常情况 -->
    <abnormal-condition-dialog ref="abnormalConditionRef" />
  </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from "vue";
import abnormalConditionDialog from '../dialog/abnormalConditionDialog.vue'

import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null)
const state = reactive({
  tagPage: 1,
  option: {},
  xData: [
    "甘肃新业公司",
    "甘肃公航旅集团",
    "甘肃能化集团",
    "甘肃能化集团",
    "甘肃能化集团",
  ],
  dataList: [4, 54, 1, 2, 1, 2, 5],
  title: ["企业户数"],
  mainColor: "#1866E5",
});
const abnormalConditionRef = ref(null)
const clickACallBack = (params) => {
  console.log(params)
  abnormalConditionRef.value.showModel = true
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
            return `${index + 1}、${value}`;
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
          padding: [-22, 0, 0, 0],
        },
        data: [42, 55, 23, 88, 90],
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
        data: [42, 55, 23, 88, 90],
      },
      {
        type: "bar",
        barWidth: 4,
        itemStyle: {
          color: "rgba(60,151,241,.1)",
        },
        data: [100, 100, 100, 100, 100],
        barGap: "-100%",
        tooltip: {
          show: false,
        },
      },
    ],
  };
};
onMounted(() => {
  init()
});
</script>
  
<style lang="scss" scoped>
.rightBottom {
  width: 432px;
  height: 280px;

  .list {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    height: 218px;
    width: 432px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 4px;

    .item {
      width: 100px;
      height: 48px;
      padding: 8px;
      box-sizing: border-box;
      background: url("@images/propertyManagement/item-min.png") 0% 0% / 100% 100% no-repeat;
      font-size: 12px;
      line-height: 14px;
      color: #d6ebf7;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: url("@images/propertyManagement/item-min-hover.png") 0% 0% / 100% 100% no-repeat;
      }
    }
  }
}
</style>