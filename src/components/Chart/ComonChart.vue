<template>
  <div ref="container" class="chart-canvas" :style="`width: ${canvasWidth}px; height: ${canvasHeight}px`"></div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from "vue";
import * as echarts from "echarts";
const container = ref(null);
const timer = ref(null);
const props = defineProps({
  canvasWidth: {
    type: Number,
    default: 400,
  },
  canvasHeight: {
    type: Number,
    default: 400,
  },
  option: {
    type: Object,
    default: () => { },
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  length: {
    type: Number,
    default: 4,
  },
});

watch(
  () => props.option,
  (newValue) => {
    myChart.setOption(newValue);
  },
  { deep: true }
);
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
});
let myChart;
const init = () => {
  myChart = echarts.init(container.value);
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
        dataIndex: index == 0 ? props.length : index - 1,
      });
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index > props.length) {
        index = 0;
      }
    }, 3000);
  }
};
// 在图表容器的父元素大小发生变化时调用 resize 方法
const handleResize = () => {
  myChart.resize();
}

// 监听窗口的 resize 事件
window.addEventListener('resize', handleResize);
</script>

<style lang="scss" scoped></style>
