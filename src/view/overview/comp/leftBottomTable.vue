<template>
  <div class="leftCenterTable">
    <div class="mainTitle ttf">
      <p>经营效率</p>
    </div>
    <div class="chart">
      <div class="title">
        <div class="item" v-for="(item, index) in state.titleList" :key="index" @click="itemClick(index)">
          <p class="name">{{ item.name }}</p>
          <p class="value">
            {{ item.value }}<span class="unit">{{ item.unit }}</span>
          </p>
        </div>
      </div>
      <my-chart :width="400" :height="172" :option="state.option"></my-chart>
    </div>
    <!-- 企业净利润 -->
    <teleport to="#screen">
      <corporate-profits-dialog ref="refCenterBottomRef"></corporate-profits-dialog>
    </teleport>
    <!-- 企业利润总额 -->
    <teleport to="#screen">
      <totalCorporateProfitDialog ref="totalCorporateProfitDialogRef" />
    </teleport>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import corporateProfitsDialog from "../dialog/corporateProfitsDialog.vue"
import totalCorporateProfitDialog from '../dialog/totalCorporateProfitDialog.vue'
import * as echarts from "echarts";
const _params = ref(null);
const refCenterBottomRef = ref(null)
const totalCorporateProfitDialogRef = ref(null)
import { hexToRgb } from "@/utils";
const state = reactive({
  titleList: [
    {
      name: "净利润",
      value: "96.82",
      unit: "亿元",
    },
    {
      name: "利润总额",
      value: "127.80",
      unit: "亿元",
    },
  ],
  option: {},
  xData: ["01", "02", "03", "04", "05", "06", "07", "08"],
  title: ["净利润", "利润总额"],
  colorList: ["#0BE6E6", "#3C97F1"],
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
      left: "30",
      right: "30",
      top: "30",
      bottom: "30",
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
      top: "0",
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
        name: "单位(亿元)",
        min: 0,
        max: 24,
        interval: 6,
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
        name: "单位(%)",
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
        nameTextStyle: {
          color: "#fff",
          fontSize: 12,
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
      },
    ],
    series: [
      {
        name: "利润总额",
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        lineStyle: {
          color: state.colorList[0],
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: state.colorList[0], // 圆点的颜色
          shadowColor: "#fff", // 阴影颜色
          shadowBlur: 4, // 阴影模糊程度
        },
        emphasis: {
          itemStyle: {
            borderColor: "#fff", // 圆点边框颜色
            borderWidth: 2, // 圆点边框宽度
          },
        },
        // data: [12, 5, 20, 12, 5, 6, 22, 3],
      },
      {
        name: "净利润",
        type: "bar",
        barWidth: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: state.colorList[1] }, // 渐变起始颜色
            { offset: 1, color: hexToRgb(state.colorList[1], 0) }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
        // data: [426.7, 40, 0, 0, 0, 29.28, 10875, 0],
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
    for (let i = 0; i < 8; i++) {
      let randomNum = Math.floor(Math.random() * 25);
      item.data.push(randomNum);
    }
  });
};
const itemClick = (index) => {
  if (index === 0) {
    refCenterBottomRef.value.showModel = true
  } else {
    totalCorporateProfitDialogRef.value.showModel = true
  }
}
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.leftCenterTable {
  height: 280px;
  width: 432px;

  .chart {
    padding: 0 16px;
    box-sizing: border-box;

    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;

    .title {
      height: 46px;
      background: url("@images/overview/t-bg.png") no-repeat;
      background-position: center;
      background-size: contain;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        cursor: pointer;

        .name {
          font-size: 14px;
          color: #fff;
          margin-right: 12px;
        }

        .value {
          font-size: 20px;
          color: #00e7ff;
        }

        .unit {
          font-size: 12px;
          color: #00e7ff;
          display: inline-block;
          margin-left: 4px;
          transform: translateY(-2px);
        }
      }
    }
  }
}
</style>
