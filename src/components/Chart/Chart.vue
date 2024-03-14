<template>
  <div class="chart-1" :style="`width: ${boxWidth}px; height: ${boxHeight}px;${hasBg
    ? 'background: url(' + borderImg + ') 0% 0% / 100% 100% no-repeat'
    : ''
    }`">
    <div class="title">
      <p class="ttf">{{ title }}</p>
      <div class="more" v-if="more" @click="routeTo(tag)">更多</div>
    </div>
    <div ref="container" class="chart-canvas" :style="`width: ${canvasWidth}px; height: ${canvasHeight}px`"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";
import borderUrl from "@images/payrollManagement/border.png";
const props = defineProps({
  hasBg: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
    default: "Title",
  },
  option: {
    type: Object,
    required: true,
    default: () => { },
  },
  boxWidth: {
    type: Number,
    default: 888,
  },
  boxHeight: {
    type: Number,
    default: 240,
  },
  canvasWidth: {
    type: Number,
    default: 848,
  },
  canvasHeight: {
    type: Number,
    default: 180,
  },
  more: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: "test",
  },
  borderImg: {
    type: String,
    default: borderUrl,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  click: {
    type: Boolean,
    default: false,
  },
  clickA: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => { },
  },
  legendSelected: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.option,
  (newValue) => {
    myChart.setOption(newValue);
  },
  { deep: true }
);

let myChart;
const container = ref(null);
const timer = ref(null);
const emit = defineEmits(["mouseover", "moreClick","clickACallBack","clickCallBack","legendselectchanged","lineClick"]);
const init = () => {
  myChart = echarts.init(container.value);
  myChart.on("click", handleChartClick);
  myChart.setOption(props.option);
  if (props.highlight) {
    let index = 0;
    timer.value = setInterval(function () {
      myChart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      // 显示提示框
      // myChart.dispatchAction({
      //   type: "showTip",
      //   seriesIndex: 0,
      //   dataIndex: index,
      // });
      // 取消高亮指定的数据图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index == 0 ? 4 : index - 1,
      });
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index > 4) {
        index = 0;
      }
    }, 3000);
  }
  if (props.click) {
    myChart.getZr().on("click", (p) => {
      const pointInPixel = [p.offsetX, p.offsetY];
      if (myChart.containPixel("grid", pointInPixel)) {
      // if (myChart.containPixel("grid", [params.event.offsetX, params.event.offsetY])) {
        //执行代码
        emit("clickCallBack", props.params[0]);
      }
    });
  }
  if (props.clickA) {
    myChart.on("click", (p) => {
      emit("clickACallBack", p);
    });
  }
  
  if (props.legendSelected) {
    myChart.on("legendselectchanged", (p) => {
      emit("legendSelectCallBack", p);
    });
  }
};
// 在图表容器的父元素大小发生变化时调用 resize 方法
const handleResize = () => {
  myChart.resize();
}

// 监听窗口的 resize 事件
window.addEventListener('resize', handleResize);
const routeTo = (url) => {
  emit("moreClick", url);
};

const handleChartClick = (params) => {
  if (params.seriesType === "line") {
    emit("lineClick", params);
  }
};

onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
});
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.chart-1 {
  border-radius: 10px;
  padding: 18px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      line-height: 18px;
      letter-spacing: 0px;
      background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
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
    }
  }
}
</style>
