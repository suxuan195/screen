<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>历年党员新增数量</p>
    </div>
    <div class="chart">
      <my-chart :width="420" :height="382" :option="state.option"></my-chart>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
  option: {},
  xData: [
    "2020",
    "2021",
    "2022",
    "2023",
  ],
  title: [],
  colorList: ["#AAFDFD"],
});
onMounted(() => {
  init();
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
      left: "70",
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
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 16,
      },
      left: "center",
      top: "20",
      itemWidth: 16, // 图例标记的宽度
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
          fontSize: 16,
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
        min: 0,
        max: 3000,
        interval: 600,
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
          fontSize: 16,
        },
        nameTextStyle: {
          color: "#fff",
          fontSize: 16,
        },
      },{
        name: "单位(人)",
        nameTextStyle: {
          color: "#fff",
          fontSize: 16,
        },
      }
    ],
    series: [
      {
        name: "企业户数",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
            { offset: 1, color: hexToRgb("#FAEDD0", 0) }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%", label: {
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
      },
    ],
    dataZoom: {
      show: true, // 为true 滚动条出现
      realtime: true,
      type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      start: 0, // 表示默认展示20%～80%这一段。
      end: 100,
      zoomOnMouseWheel: false,
    },
  };
  state.option.series.forEach((item) => {
    item.data = [1614,2777,1731,2173];
    // for (let i = 0; i < 7; i++) {
    //   let randomNum = Math.floor(Math.random() * 1201);
    //   item.data.push(randomNum);
    // }
  });
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  width: 420px;
  height: 442px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}
</style>
