<template>
  <div class="centerMap">
    <img src="@images/propertyManagement/map-left.png" alt="" />
    <div ref="container" class="map" style="width: 740px; height: 600px"></div>
    <img src="@images/propertyManagement/map-right.png" alt="" />
  </div>
  <teleport to="#screen">
    <CenterMapDialog ref="refCenterMapDialog"></CenterMapDialog>
  </teleport>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts";
import china from "@/echarts/china.json";
import domImg from "@/images/propertyManagement/area.png";
import CenterMapDialog from "../dialog/centerMapDialog.vue";
const container = ref(null);
const refCenterMapDialog = ref(null);
import { useList } from "../hooks/chinaMap";
const { mapCount, getList } = useList();
const state = reactive({
  option: {
    geo: {
      map: "china", // 指定地图类型为中国地图
      roam: true,
      zoom: 1.1,
      left: "40",
      right: "40",
      top: "40",
      label: {
        color: "#fff",
        show: false,
      },
      itemStyle: {
        borderColor: "rgb(59,162,231)",
        borderWidth: 1,
        areaColor: {
          image: domImg,
          repeat: "repeat",
          global: true,
        },
        // shadowColor: "rgba(0, 0, 0, 0.5)",
        // // 阴影模糊度
        // shadowBlur: 10,
        // // 阴影水平偏移量
        // shadowOffsetX: 3,
        // // 阴影垂直偏移量
        // shadowOffsetY: 3,
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(92,220,250,.8)", // 高亮时的颜色
        },
        label: {
          color: "#fff",
          show: false,
        },
      },
      // select: {
      //   itemStyle: {
      //     areaColor: "rgba(92,220,250,.8)", // 高亮时的颜色
      //   },
      //   label: {
      //     color: "#fff",
      //   },
      // },
      // selectedMode: "single",
    },
    tooltip: {
      show: true,
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      formatter: function (params) {
        return `城市：${params.name} </br>项目个数：${params.data.count}`;
      },
    },
    series: [
      {
        type: "effectScatter", // 类型为 effectScatter
        coordinateSystem: "geo", // 使用地理坐标系
        data: mapCount,
        symbolSize: 6, // 散点大小
        rippleEffect: {
          // 设置涟漪特效
          color: "#fff",
          scale: 4, // 涟漪的最大缩放比例
          brushType: "fill", // 绘制方式有 'stroke' 和 'fill'
        },
        label: {
          // 标签配置
          show: false,
          formatter: "{b}", // 显示地名
          position: "right", // 标签位置
          color: "#fff",
        },
        itemStyle: {
          color: "#fff",
        },
      },
    ],
  },
});
let myChart;
const init = () => {
  myChart = echarts.init(container.value);
  echarts.registerMap("china", china);
  myChart.setOption(state.option);
  myChart.on("click", async (p) => {
    if (p.componentSubType == "effectScatter") {
      refCenterMapDialog.value.showModel = true;
      await nextTick();
      refCenterMapDialog.value.setList(p.name);
    }
  });
};
onMounted(async () => {
  await getList();
  init();
});
onUnmounted(() => {
  myChart.dispose();
});
defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
.centerMap {
  width: 960px;
  height: 555px;
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  .map {}
}
</style>