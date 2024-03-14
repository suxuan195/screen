<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>职工行业分布</p>
    </div>
    <!-- <p class="more" @click="more">更多</p> -->
    <div class="chart">
      <my-chart :width="432" :height="206" :option="state.option" :click="true" @clickCallBack="clickCallBack"
        :params="_params"></my-chart>
    </div>
    <rightBottomChartDialog ref="rightBottomChartDialogRef" :tableHeader="state.tableHeader" />
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import rightBottomChartDialog from "../dialog/rightBottomChartDialog.vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const state = reactive({
  option: {},
  xData: [
    "采矿业",
    "电力热",
    "房地产业",
    "建筑业",
    "交通运输",
    "教育",
    "金融业",
  ],
  title: ["企业户数"],
  colorList: ["#AAFDFD"],
  dataList: [17.68, 12.45, 10.24, 13.38, 8.9],
  tableHeader: []
});
const rightBottomChartDialogRef = ref(null);
const more = () => {
  rightBottomChartDialogRef.value.showModel = true
};
const clickCallBack = (p) => {
  rightBottomChartDialogRef.value.showModel = true
  state.tableHeader = [{
    label: "企业名称",
    prop: "name",
  },
  {
    label: `${p.name}人数`,
    prop: "nPeople",
  },
  {
    label: `${p.name}人数占比`,
    prop: "proportion",
  },]
}
const init = () => {
  state.option = {
    grid: {
      left: "50",
      right: "45",
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
      formatter: function (p) {
        _params.value = p;
        let str = "";
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.dataIndex % 1]
            };margin-right:6px;display:inline-block;"></span>${item.data
            } </div>`;
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
        type: "category",
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
        axisLine: {
          // 设置x轴的颜色
          lineStyle: {
            color: "#4CB3F3",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位(万人)",
        min: 0,
        max: 40,
        interval: 10,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            width: 1,
            opacity: 0.3,
            color: ["#4CB3F3"],
          },
        },
        axisLabel: {
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
        name: "企业户数",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#AAFDFD" }, // 渐变起始颜色
            { offset: 1, color: hexToRgb("#AAFDFD", 0) }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
        label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "top",
          offset: [0, 7],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        data: state.dataList
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
  position: relative;

  .more {
    position: absolute;
    right: 4px;
    top: 14px;
    cursor: pointer;
    color: rgba(214, 239, 255, 0.6);
    font-size: 14px;

    &:hover {
      color: rgba(214, 239, 255, 1);
    }
  }

  .chart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}
</style>
