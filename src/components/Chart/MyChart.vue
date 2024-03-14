<template>
  <div class="myChart">
    <div ref="container" class="chart-canvas" :style="`width: ${width}px; height: ${height}px`"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from "vue";
import * as echarts from "echarts";
const container = ref(null);
const timer = ref(null);
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
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

const emits = defineEmits(["clickCallBack", "lineClick", "clickACallBack", 'legendSelectCallBack']);

let myChart;
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
  if (props.click) {
    myChart.getZr().on("click", (p) => {
      const pointInPixel = [p.offsetX, p.offsetY];
      if (myChart.containPixel("grid", pointInPixel)) {
        //执行代码
        emits("clickCallBack", props.params[0]);
      }

    });
  }
  if (props.clickA) {
    myChart.on("click", (p) => {
      emits("clickACallBack", p);
    });
  }

  if (props.legendSelected) {
    myChart.on("legendselectchanged", (p) => {
      emits("legendSelectCallBack", p);
    });
  }
};
// 在图表容器的父元素大小发生变化时调用 resize 方法
const handleResize = () => {
  myChart.resize();
}


// 监听窗口的 resize 事件
window.addEventListener('resize', handleResize);

const handleChartClick = (params) => {
  if (params.seriesType === "line") {
    emits("lineClick", params);
  }
};
onMounted(() => {
  init()
});
onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
  myChart.dispose();
});
</script>

<style lang="scss" scoped></style>
