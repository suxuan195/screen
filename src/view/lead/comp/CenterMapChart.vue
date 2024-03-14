<template>
  <div class="centerMap">
    <div ref="container" class="map"></div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, watch, reactive } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import map from "@images/lead/map.jpg";
import { useList } from "../hooks/map";
const { mapCount, getList } = useList();
const container = ref(null);
const state = reactive({
  option: {
    globe: {
      baseTexture: map, // 地球底图
      displacementScale: 0.1, // 地形浮动比例
      shading: "lambert", // 地球着色方式
      light: {
        ambient: {
          intensity: 0.5, // 增加环境光强度
        },
        main: {
          intensity: 1.5, // 增加主光强度
        },
      },
      atmosphere: {
        show: true,
        color: "#1e6bb6",
        glowPower: 6,
        innerGlowPower: 2,
      },
      viewControl: {
        autoRotate: true, // 自动旋转
        alpha: 30, // 初始视角的水平旋转角度
        beta: 0, // 初始视角的垂直旋转角度
        zoomSensitivity: 0,
        autoRotateSpeed: 7,
        autoRotateDirection: 'ccw'
      },
      // postEffect: { 
      //   enable: true,
      //   bloom: {
      //     enable: true,
      //     bloomIntensity: 0.1,
      //   },
      // },
    },
    series: [
      {
        type: "scatter3D",
        coordinateSystem: "globe",
        symbolSize: [10, 10],
        data: mapCount,
        label: {
          // 标签配置
          fontSize: 16,
          show: false,
          formatter: "{b}", // 显示地名
          position: "right", // 标签位置
          color: "#0ff",
        },
        itemStyle: {
          color: "#4DE8FF",
        },
      },
    ],
  },
});
let myChart;
const init = () => {
  myChart = echarts.init(container.value);
  myChart.setOption(state.option);
};
onMounted(async () => {
  await getList()
  init();
});
onUnmounted(() => {
  myChart.dispose();
});
</script>
  
<style lang="scss" scoped>
.centerMap {
  width: 960px;
  height: 555px;
  position: fixed;
  left: 50%;
  top: 108px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;

  .map {
    width: 960px;
    height: 826px;
    background: url("@images/lead/map-bg.png") center no-repeat;
  }
}
</style>