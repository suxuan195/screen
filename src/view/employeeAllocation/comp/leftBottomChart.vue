<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>职工年龄段人数</p>
    </div>
    <div class="chart">
      <my-chart :width="432" :height="206" :option="state.option" :click="true" :params="_params"
        @clickCallBack="clickACallBack"></my-chart>
    </div>
    <leftBottomDialog ref="leftBottomDialogRef" :tableHeader="state.tableHeader" />
  </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import leftBottomDialog from "../dialog/leftBottomDialog.vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null)
const state = reactive({
  tag: 0,
  option: {},
  xData: ["50岁以上", "40-49岁", "30-39岁", "30岁以下"],
  title: ["企业户数"],
  colorList: ["#1D70BE"],
  mainColor: "#1D70BE",
  dataList: [23467, 33532, 43453, 23434],
  tableHeader: []
});

const leftBottomDialogRef = ref(null);
const clickACallBack = (p) => {
  leftBottomDialogRef.value.showModel = true
  state.tableHeader = [
    {
      prop: 'enterpriseName',
      label: "企业名称"
    },
    {
      prop: 'pTotal',
      label: `${p.name}人数`
    },
    {
      prop: 'roportion',
      label: `${p.name}人数占比`
    }
  ]
}
const init = () => {
  state.option = {
    grid: {
      left: "80",
      right: "50",
      top: "20",
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
      formatter: function (params) {
        _params.value = params;
        var tooltipContent = `${params[0].name}   ${params[0].data}`; // 自定义tooltip内容
        return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(60,151,241);margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
      },
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      }
    },
    xAxis: [
      {
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(76,179,243,.2)",
          },
        },
        type: "value",
        show: true,
        axisPointer: {
          color: "#fff",
          fontSize: 12,
          show: true, // 隐藏十字指示器
          type: "line", // 设置指示器样式
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
      },
    ],
    yAxis: [
      {
        inverse: true,
        splitLine: {
          show: false,
        },
        axisLine: {
          //y轴
          show: true,
          lineStyle: {
            color: "#4CB3F3",
          },
        },
        type: "category",
        axisTick: {
          show: false,
        },
        data: state.xData,
        axisLabel: {
          color: "#fff",
          fontSize: 12,
          show: true,
        },
      },
    ],
    series: [
      {
        name: "人数",
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
        data: state.dataList,
      },
    ],
  };
};
onMounted(() => {
  init();
});

</script>
    
<style lang="scss" scoped>
.leftTopChart {
  width: 420px;
  height: 268px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
  }
}
</style>
    