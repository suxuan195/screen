<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>历年重要指示票批示情况</p>
    </div>
    <div class="chart">
      <my-chart :width="420" :height="224" :option="state.option" :click="true" :params="_params"
        @clickCallBack="clickACallBack"></my-chart>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const state = reactive({
  bar: ["境外投资项目", "承包工程项目"],
  option: {},
  xData: [
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ],
  title: ["计划数"],
  colorList: ["#EBAC23"],
  mainColor: "#EBAC23",
  tableData: [],
});
//点击柱状图线段
const clickACallBack = (params) => {
  console.log(params);
};

onMounted(() => {
  init();
});
// legenData处理
const legendData = () => {
  return state.title.map((item, index) => {
    return {
      name: item,
      itemStyle: {
        color: state.mainColor,
      },
    };
  });
};
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
      formatter: function (p) {
        _params.value = p;
        let str = "";
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 1]
            };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
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
          interval: 0,
        },
        axisLine: {
          // 设置x轴的颜色
          lineStyle: {
            color: state.mainColor,
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位(个)",
        min: 0,
        max: 8,
        interval: 2,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            width: 1,
            opacity: 0.3,
            color: [state.mainColor],
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
        name: "计划数",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
        // data: [6, 6, 4, 7, 2, 4, 5, 7, 5],
      },
    ],
    // dataZoom: {
    //   show: true, // 为true 滚动条出现
    //   realtime: true,
    //   type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
    //   start: 0, // 表示默认展示20%～80%这一段。
    //   end: 60,
    //   zoomOnMouseWheel: false,
    // },
  };
  state.option.series.forEach((item) => {
    item.data = [];
    for (let i = 0; i < 9; i++) {
      let randomNum = Math.floor(Math.random() * 9);
      item.data.push(randomNum);
    }
  });
};
</script>

<style lang="scss" scoped>
.leftTopChart {

  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
    width: 420px;
    height: 224;

    .bar {
      position: absolute;
      right: 10px;
      top: 21px;
      font-size: 12px;
      display: flex;
      z-index: 9;

      .item {
        color: #fff;
        margin-left: 15px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        width: 82px;
        cursor: pointer;
        border-radius: 15px;
        box-sizing: border-box;

        &:hover {
          background: #1766a1;
          border: 1px solid #166cff;
        }
      }

      .item.active {
        background: #1766a1;
        border: 1px solid #166cff;
      }
    }
  }
}
</style>
