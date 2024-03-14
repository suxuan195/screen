<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>溢价率播报图</p>
    </div>
    <div class="chart">
      <my-chart :width="850" :height="270" :option="state.option"></my-chart>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const counterChange = (val) => {
  state.counter = val;
};
import * as echarts from "echarts";
const state = reactive({
  counter: 0,
  option: {},
  xData: [
    "2018年1月",
    "2018年2月",
    "2018年3月",
    "2018年4月",
    "2018年5月",
    "2018年6月",
    "2018年7月",
    "2018年8月",
    "2018年9月",
    "2018年10月",
    "2018年11月",
    "2018年12月",
  ],
  title: ["条形图例", "折线图例"],
});
onMounted(() => {
  init();
});
// legenData处理
const legendData = () => {
  return state.title.map((item, index) => {
    return {
      name: item,
    };
  });
};
const init = () => {
  state.option = {
    grid: {
      left: "50",
      right: "45",
      top: "40",
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
          show: false,
          interval: 0
        },
        axisLine: {
          // 设置x轴的颜色
          show: false,
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
        min: -20,
        max: 20,
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
      {
        type: "value",
        min: 0,
        max: 100,
        interval: 25,
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed",
            width: 1,
            opacity: 0.3,
            color: ["#4CB3F3"],
          },
        },
        axisTick: {
          show: false, // 隐藏刻度线
        },
        axisLabel: {
          show: false, // 隐藏刻度标签
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
        name: "条形图例",
        type: "bar",
        barWidth: 6,
        label: {
          position: "top",
          color: "rgba(11, 230, 230, 0.71)",
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: function (params) {
            if (params.data < 0) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(11,230,230,0.00)" }, // 渐变起始颜色
                { offset: 1, color: " #0BE6E6" }, // 渐变终止颜色
              ]);
            } else {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                { offset: 1, color: "rgba(11,230,230,0.00)" }, // 渐变终止颜色
              ]); // 非渐变颜色
            }
          },
          borderRadius: [2, 2, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#EBAC23' },
              { offset: 1, color: 'rgba(235,172,35,0.00)' }
            ])
          }
        },
        barGap: "60%",
      },
      {
        name: "折线图例",
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
          width: 5, // 设置折线宽度为2
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: "#ffffff", // 圆点的颜色
          shadowColor: "#fff", // 阴影颜色
          shadowBlur: 4, // 阴影模糊程度
        },
        emphasis: {
          itemStyle: {
            borderColor: "#fff", // 圆点边框颜色
            borderWidth: 2, // 圆点边框宽度
          },
        },
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
  state.option.series.forEach((item) => {
    item.data = [];
    for (let i = 0; i < 20; i++) {
      let randomNum = Math.floor(Math.random() * 10);
      item.data.push(randomNum);
      item.data.push(-10);
    }
  });
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  .mainTitle {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 419px;
    height: 70px;
    padding-left: 75px;

    p {
      font-size: 24px;
      font-weight: normal;
      line-height: 40px;
      letter-spacing: 0.2em;
      background: linear-gradient(180deg,
          #ffffff 0%,
          #ffffff 52%,
          #90d1ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
  }

  .chart {
    padding: 16px 20px;
    width: 888px;
    height: 280px;
    border-radius: 8px;
    background: url("@images/propertyMonitoringManagement/3.png");
    background-size: 100% 100%;
    box-sizing: border-box;
  }
}
</style>>

