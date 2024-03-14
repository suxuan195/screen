<template>
  <div class="centerMap">
    <div ref="container" class="map"></div>
  </div>
</template>
    
<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import worldJson from "@/echarts/world.json";
import mapZHName from "@/echarts/mapZHName.js";

const container = ref(null);
const state = reactive({
  option: {
    series: [
      {
        type: "map3D",
        map: "world",
        shading: "color",
        roam: true,
        light: {
          main: {
            intensity: 1,
            shadow: true,
            alpha: 150,
            beta: 70,
          },
          ambient: {
            intensity: 0,
          },
        },
        data: [
          {
            name: "中国", // 区域名称
            value:200,
            itemStyle: {
              color: "#45aeda", // 区域颜色
            },
            label: {
              show: true, // 是否显示区域名称
              color: "#fff", // 区域名称颜色
            },
          },
          // 可以添加更多区域的配置
        ],
        label: {
          show: false,
          color: "#fff",
        },
        itemStyle: {
          color: "#0b3f7b",
          borderColor: "#3ca5e9",
          borderWidth: 1,
        },
        groundPlane: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            color: "#45aeda",
          },
          label: {
            show: true,
            color: "#fff",
          },
        },
        viewControl: {
          alpha: 89, // 设置初始视角的水平旋转角度
          beta: 0, // 设置初始视角的垂直旋转角度
          panMouseButton: "left",
          rotateMouseButton: "right",
          zoomSensitivity: 3,
          panSensitivity: 2,
          zoom: 2,
          distance: 75,
        },
      },
    ],
  },
});

// 世界地图国家英文名映射中文
const formatWorldMapToZH = (data) => {
  let zhFeatures = [];
  if (data.features) {
    zhFeatures = data.features.map((item) => {
      if (mapZHName[item.properties.name]) {
        item.properties.name = mapZHName[item.properties.name];
      }
      return item;
    });
  }
  data.features = zhFeatures;
  return data;
};

let myChart;
const init = () => {
  let worldMap = formatWorldMapToZH(worldJson);
  echarts.registerMap("world", worldMap);
  myChart = echarts.init(container.value);
  myChart.setOption(state.option);
};
onMounted(() => {
  init();
});
onUnmounted(() => {
  myChart.dispose();
});
</script>
    
    <style lang="scss" scoped>
.centerMap {
  width: 1600px;
  height: 798px;
  position: fixed;
  left: 50%;
  top: 128px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  background: url("@images/lead/world-bg.png") center no-repeat;
  .map {
    width: 1400px;
    height: 798px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>