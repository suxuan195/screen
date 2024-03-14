<template>
  <div class="centerMap">
    <div ref="container" class="map" style="width: 1400px; height: 798px"></div>
  </div>
</template>
      
<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import * as echarts from "echarts";
import worldJson from "@/echarts/world.json";
import mapZHName from "@/echarts/mapZHName.js";
import domImg from "@/images/propertyManagement/area.png";
import { useList } from "../hooks/worldMap.js";
const { list, getList } = useList();
const container = ref(null);
const state = reactive({
  option: {
    geo: {
      map: "world", // 指定地图类型为中国地图
      roam: true,
      zoom: 1.1,
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
      regions: [
        {
          name: "中国",
          itemStyle: {
            areaColor: "rgba(92,220,250,.8)", // 高亮时的颜色
          },
          label: {
            show: false,
          },
        },
      ],
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
        let str = "";
        params.data.name.forEach((item) => {
          str += `${item}<br />`;
        });
        return str;
      },
    },
    series: [
      {
        type: "effectScatter", // 类型为 effectScatter
        coordinateSystem: "geo", // 使用地理坐标系
        data: list,
        symbolSize: 10, // 散点大小
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
          position: "top", // 标签位置
          color: "#fff",
        },
        itemStyle: {
          color: "#fff",
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
onMounted(async () => {
  await getList();
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>