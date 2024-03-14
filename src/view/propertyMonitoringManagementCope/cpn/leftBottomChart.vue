<template>
  <div class="leftBottomChart">
    <div class="tab-bar">
      <div :class="state.counter === 0 ? 'active' : ''" @click="counterChange(0)">
        产（股）权月度成交情况
      </div>
      <div :class="state.counter === 1 ? 'active' : ''" style="margin-left: 10px" @click="counterChange(1)">
        产（股）权月度挂牌情况
      </div>
    </div>
    <div class="chart">
      <my-chart :width="850" :height="340" :option="state.option"></my-chart>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const counterChange = (val) => {
  state.counter = val;
  init()
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
const setColor = () => {
  if (state.counter === 1) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
      { offset: 1, color: "rgba(235,172,35,0.00)" }, // 渐变终止颜色
    ])
  } else {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: "#46E7E7" }, // 渐变起始颜色
      { offset: 1, color: "rgba(11,230,230,0.00)" }, // 渐变终止颜色
    ])
  }
}
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
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      top: "0",
      x: "180",
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
          interval: 0
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
        name: "单位(户)",
        min: 0,
        max: 2100,
        interval: 300,
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
          interval: 0, // 设置刻度标签的显示间隔为0，表示显示所有的刻度标签
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
          show: true,
          position: "top",
          color: "rgba(11, 230, 230, 0.71)",
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: setColor(),
          borderRadius: [2, 2, 0, 0],
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
  state.option.series.forEach((item, index) => {
    item.data = [];
    let coord = []
    for (let i = 0; i < 12; i++) {
      let randomNum = Math.floor(Math.random() * 1300);
      item.data.push(randomNum);
      coord.push({ coord: [i, randomNum], value: randomNum })
    }
    if (index === 0) {
      item.markPoint = {
        symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png',
        symbolSize: [40, 20],
        symbolOffset: [0, 5],
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
          { type: 'average', name: '平均值' }, // 标记平均值
          ...coord.map(item => item)
        ],
        itemStyle: {
          color: 'white'
        },
        label: {
          color: '#ffffff',
          fontSize: '12px',
          verticalAlign: 'middle'
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.leftBottomChart {
  margin-top: 24px;
  background: url("@images/propertyMonitoringManagement/4.png");
  background-size: 100% 100%;
  width: 888px;
  height: 375px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  .tab-bar {
    position: absolute;
    right: 15px;
    top: 20px;
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0em;
    display: flex;
    color: #ffffff;

    div {
      cursor: pointer;
      padding: 2px 5px;
    }

    .active {
      background: radial-gradient(68% 67% at 50% 50%,
          rgba(0, 22, 52, 0.15) 0%,
          #1766a1 100%);
      border-radius: 15px;
      border-image: linear-gradient(358deg,
          #166cff 7%,
          rgba(209, 226, 255, 0.87) 17%,
          rgba(129, 206, 255, 0.76) 90%) 1;
    }
  }

  .chart {
    margin-top: 20px;
  }
}
</style>>

