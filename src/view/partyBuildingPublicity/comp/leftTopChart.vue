<template>
  <div class="leftTopChart">
    <div class="mainTitle  title">
      <p class="ttf">党员统计</p>
      <!-- <div class="more" @click="moreClick">更多</div> -->
    </div>
    <div class="chart">
      <my-chart :width="420" :height="382" :option="state.option"></my-chart>
    </div>
    <partyMemberStatisticsPopUp :showModel="showModel"></partyMemberStatisticsPopUp>
  </div>
</template>

<script setup>
import partyMemberStatisticsPopUp from "./partyMemberStatisticsPopUp.vue"
import { reactive, onMounted, ref, onBeforeMount } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import emitBus from "@/utils/bus.js";
const state = reactive({
  tag: 0,
  option: {},
  xData: [
    "党员总数",
    "女党员",
    "青年党员",
    "产业工人",
  ],
  colorList: ["#6BDAFF"],
  mainColor: "#6BDAFF",
  dataList: [],
});
const showModel = ref(false);

const moreClick = () => {
  showModel.value = true;
}
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  setData();
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});
const selcetBar = (e) => {
  state.tag = e;
  state.mainColor = state.colorList[e]
  setData();
};

const setData = () => {
  // let arr = [];
  // for (let i = 0; i < 8; i++) {
  //   let randomNum = Math.floor(Math.random() * 100);
  //   arr.push(randomNum);
  // }
  state.dataList = [45491, 10841, 14820, 11154];
  init();
};

const init = () => {
  state.option = {
    grid: {
      left: "50",
      right: "20",
      top: "50",
      bottom: "20",
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
          color: "#fff",
          fontSize: 16,
          show: true,
          verticalAlign: "top",
          align: "left",
          padding: [-26, 0, 0, 0],
        },
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        offset: -30,
        axisLabel: {
          color: state.mainColor,
          fontSize: "16",
          verticalAlign: "top",
          align: "right",
          padding: [-26, 0, 0, 0],
        },
        data: state.dataList,
      },
    ],
    series: [
      {
        name: "党员统计",
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
      {
        type: "bar",
        barWidth: 4,
        itemStyle: {
          color: "rgba(60,151,241,.1)",
        },
        data: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
        barGap: "-100%",
        tooltip: {
          show: false,
        },
      },
    ],
  };
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;
}

.leftTopChart {
  width: 420px;
  height: 442px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;

    .bar {
      position: absolute;
      right: 10px;
      top: 21px;
      font-size: 16px;
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

.more {
  font-size: 16px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: rgba(214, 239, 255, 0.6);
  cursor: pointer;

  &:hover {
    color: rgba(214, 239, 255, 1);
  }
}</style>
