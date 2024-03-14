<template>
  <div class="centerMap">
    <img src="@images/propertyManagement/map-left.png" alt="" />
    <div ref="container" class="map"></div>
    <img src="@images/propertyManagement/map-right.png" alt="" />
  </div>
</template>

<script setup>
import {ref, onMounted, reactive, watchEffect, watch, computed} from "vue";
import * as echarts from "echarts";
import china from "@/echarts/gansu.json";
import mapImg from "@/images/IntelligentEnergyManagement/gansu.png";
import domImg from "@images/propertyManagement/area.png";
const container = ref(null);
const props = defineProps({
  coordinatesArray: {
    type: Array,
    default: () =>[]
  }
})
const option = {
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
      return `名称：${params.name}`;
    },
  },
  graphic: {
    elements: [
      {
        type: "image",
        style: {
          image: mapImg,
          width: "686",
          height: "542",
        },
        left: "0",
        top: "38",
      },
    ],
  },
  geo: {
    type: "map",
    center: [101.82, 38.05], // 初始地图中心位置的经纬度
    zoom: 3.1,
    tooltip: {
      backgroundColor: "rgba(0,0,0,.6)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "item",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      formatter: function (params, ticket, callback) {
        //根据业务自己拓展要显示的内容
        var res = "";
        var name = params.name;
        var count = params.data ? params.data.count : 0;

        if (!params.data) {
          res = `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                             <div style='color:#fff; font-size: 14px;'>${name}</div>
                          </div>`;
        } else {
          res = `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                             <div style='color:#fff; font-size: 14px;'>${name}</div>
                             <div style="display: flex; align-items: center;padding-top: 6px;">
                              <div style="height: 6px; width: 6px; border-radius: 50%; background:#fff; margin-right: 10px;"></div> <span style='color:#fff;font-size: 12px;margin-right: 20px;'>装机量</span><span style="font-size: 12px;color:#fff;">${count}</span>
                             </div>
                          </div>`;
        }
        return res;
      },
    },
    map: "china",
    label: {
      show: true,
      color: "#fff",
    },
    top: "80",
    left: "150",
    right: "52",
    bottom: "92",
    aspectScale: 0.75,
    itemStyle: {
      borderColor: "rgba(92,219,250,0)",
      borderWidth: 2,
      areaColor: "rgba(255,0,0,0)",
    },
    emphasis: {
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 1000,
          y: 600,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(48,132,178,.3)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(96,228,250,.3)", // 50% 处的颜色
            },
          ],
        },
      },
      label: {
        color: "#fff",
      },
    },
    select: {
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 1000,
          y: 600,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(48,132,178,.1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(96,228,250,.6)", // 50% 处的颜色
            },
          ],
        },
      },
      label: {
        color: "#fff",
      },
    },
  },
  series: [
    {
      type: "effectScatter", // 类型为 effectScatter
      coordinateSystem: "geo", // 使用地理坐标系
      symbolSize: 10, // 散点大小
      data:props.coordinatesArray,
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
  ]
}
let myChart;
const init = () => {
  myChart = echarts.init(container.value);
  echarts.registerMap("china", china);
  myChart.setOption(option);
};

// 使用 watch 来观察 props.coordinatesArray 的变化
watch(() => props.coordinatesArray, (newValue) => {
  // 当坐标数组更新时，重新设置 ECharts 的 option
  // console.log(newValue,'new')
  myChart.setOption({
    series: [{
      data: newValue, // 使用新的坐标数组更新数据
    }]
  });
}, {
  deep: true // 设置 deep 为 true，以侦听数组或对象内部值的变化
});

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.centerMap {
  width: 960px;
  height: 555px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  .map {
    width: 687px;
    height: 542px;
  }
}
</style>
