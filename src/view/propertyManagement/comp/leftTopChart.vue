<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>产权交易统计</p>
    </div>
    <div class="chart">
      <my-chart :width="420" :height="218" :option="state.option" :click="true" @clickCallBack="clickCallBack"
        :params="_params"></my-chart>
    </div>
    <teleport to="#screen">
      <propertyTransactionStatisticsPopUp :showModel="showModel" :modelId="modelId"></propertyTransactionStatisticsPopUp>
    </teleport>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, onBeforeMount } from "vue";
import propertyTransactionStatisticsPopUp from "./propertyTransactionStatisticsPopUp.vue";
import * as echarts from "echarts";
import emitBus from "@/utils/bus.js";
const showModel = ref(false);
const modelId = ref("-1");
const _params = ref(null);
const state = reactive({
  option: {},
  xData: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  title: ["增长率", "条形图例"],
  colorList: ["#3C97F1", "#EBAC23"],
  data: [
    12571.0791, 930.4085, 1029.6820, 0, 1013.3864, 3536.736597, 0, 359.6680, 0,
    9023.4900, 1468.1400, 4172.469547,
  ],
});
onMounted(() => {
  setTimeout(() => {
    init();
  })
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});
onBeforeMount(() => {
  emitBus.off("closeModel");
});
// legenData处理
const legendData = () => {
  return state.title.map((item, index) => {
    return {
      name: item,
      itemStyle: {
        color: state.colorList[index],
      },
    };
  });
};
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
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 2]
            };margin-right:6px;display:inline-block;"></span>${item.data
            } (万元)</div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      },
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      left: "center",
      top: "20",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
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
        name: "单位(万元)",
        min: 0,
        max: 15000,
        interval: 3750,
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
      {
        type: "value",
        min: 0,
        max: 100,
        interval: 25,
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
          formatter: function (value, index) {
            return `${value}${index == 0 ? "" : "%"}`;
          },
        },
      },
    ],
    series: [
      {
        name: "增长率",
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        lineStyle: {
          color: "#3C97F1",
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: "#3C97F1", // 圆点的颜色
          shadowColor: "#fff", // 阴影颜色
          shadowBlur: 4, // 阴影模糊程度
        },
        emphasis: {
          itemStyle: {
            borderColor: "#fff", // 圆点边框颜色
            borderWidth: 2, // 圆点边框宽度
          },
        },
        data: state.data,
      },
      {
        name: "条形图例",
        type: "bar",
        barWidth: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
            { offset: 1, color: "rgba(235,172,35,0)" }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
        data: state.data,
      },
    ],
    dataZoom: {
      show: true, // 为true 滚动条出现
      realtime: true,
      type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      start: 0, // 表示默认展示20%～80%这一段。
      end: 40,
      zoomOnMouseWheel: false,
    },
  };
  // state.option.series.forEach((item) => {
  //   item.data = [];
  //   for (let i = 0; i < 12; i++) {
  //     let randomNum = Math.floor(Math.random() * 1201);
  //     item.data.push(randomNum);
  //   }
  // });
};
const clickCallBack = (p) => {
  console.log(p);
  modelId.value = p.axisValue;
  showModel.value = true;
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  width: 420px;
  height: 280px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}
</style>
