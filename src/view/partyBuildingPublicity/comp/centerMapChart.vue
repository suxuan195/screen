<template>
  <div class="centerMap">
    <img src="@images/propertyManagement/map-left.png" alt="" />
    <div ref="container" class="map"></div>
    <img src="@images/propertyManagement/map-right.png" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import china from "@/echarts/gansu.json";
import mapImg from "@/images/IntelligentEnergyManagement/gansu.png";
const container = ref(null);

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
        var count = params.value ? params.value : 0;

        if (params.componentType == 'series') {
          res = `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                             <div style='color:#fff; font-size: 14px;'>${name}</div>
                          </div>`;
        } else {
          res = `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                             <div style='color:#fff; font-size: 14px;'>${name}</div>
                             <div style="display: flex; align-items: center;padding-top: 6px;">
                              <div style="height: 6px; width: 6px; border-radius: 50%; background:#fff; margin-right: 10px;"></div> <span style='color:#fff;font-size: 12px;margin-right: 20px;'>人数</span><span style="font-size: 12px;color:#fff;">${count}</span>
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
  // series: [
  //   {
  //     type: 'effectScatter',  // scatter 类型的系列用于显示散点图
  //     coordinateSystem: "geo", // 使用地理坐标系
  //     data: [  // 景区的坐标点数据
  //       { name: '会宁红军会师旧址', value: [105.06321, 35.69724] },
  //       { name: '八路军兰州办事处纪念馆', value: [103.833, 36.05643] },
  //       { name: '会宁红军会师旧址', value: [105.06321, 35.69724] },
  //       { name: '南梁革命纪念馆', value: [108.34551, 36.39818] },
  //       { name: '高台中国工农红军西路军纪念馆', value: [99.82576, 39.38365] },
  //       { name: '两当兵变纪念馆', value: [106.31309, 33.92742] },
  //       { name: '哈达铺红军长征纪念馆', value: [104.23496, 34.2327] },
  //       { name: '榜罗镇会议纪念馆', value: [104.94739, 35.03896] },
  //       { name: '界石铺红军长征纪念馆', value: [105.55322, 35.6164] },
  //       { name: '岷州会议纪念馆', value: [103.90164, 34.45653] },
  //       { name: '肋巴佛革命纪念馆', value: [103.36223, 35.44363] },
  //       { name: '中共中央西北局岷州会议纪念馆', value: [103.90164, 34.45653] },
  //       { name: '八路军驻兰办事处旧址', value: [103.833, 36.05643] },
  //       { name: '兰州战役纪念馆', value: [103.80546, 36.04875] },
  //       { name: '甘肃省博物馆', value: [103.78175, 36.07273] },
  //       { name: '玉门铁人王进喜纪念馆', value: [97.06774, 97.06774] },
  //       { name: '中国工农红军西路军临泽战役纪念馆', value: [100.17055, 39.15851] },
  //       { name: '山丹艾黎纪念馆', value: [101.09562, 38.79045] },
  //       { name: '古浪战役纪念馆', value: [102.90363, 37.4758] },
  //       { name: '武威市凉州战役纪念馆', value: [102.64857, 37.93412] },
  //       { name: '白银市会宁县红军长征会师旧址', value: [105.05925, 35.69676] },
  //       { name: '甘南州迭部腊子口战役遗址', value: [103.90139, 34.12952] },
  //       { name: '陇南市宕昌县哈达铺红军长征纪念馆', value: [104.39939, 34.05349] },
  //       { name: '定西市岷县岷州会议纪念馆', value: [103.90653, 34.45526] },
  //       { name: '定西市通渭县榜罗镇革命遗址', value: [104.94824, 35.03808] },
  //       { name: '武威市古浪县红军西路军古浪战役遗址', value: [102.89383, 37.46267] },
  //       { name: '兰州市城关区八路军兰州办事处旧址', value: [103.83300, 36.05643] },
  //       { name: '庆阳市华池县陕甘边区苏维埃政府旧址', value: [108.35014, 36.40458] },
  //       { name: '庆阳市环县山城堡战役遗址', value: [107.04289, 36.96430] },
  //       { name: '平凉市中国工农红军长征界石铺纪念园', value: [105.55011, 35.61606] },
  //       { name: '陇南市两当县两当兵变旧址', value: [106.31309, 33.92742] },
  //       { name: '张掖市山丹艾黎纪念馆', value: [101.09385, 38.80478] },
  //       { name: '甘南州舟曲特大山洪', value: [104.37796, 33.78872] },
  //       // 其他景区的坐标点数据
  //     ],
  //     symbolSize: 10,  // 点的大小
  //     label: {
  //       // 标签配置
  //       show: false,
  //       formatter: "{b}", // 显示地名
  //       position: "top", // 标签位置
  //       color: "#fff",
  //     },
  //     itemStyle: {
  //       color: '#fff'  // 点的颜色
  //     }
  //   }
  // ],
  series: [
    {
      type: "effectScatter", // 类型为 effectScatter
      coordinateSystem: "geo", // 使用地理坐标系
      data: [  // 景区的坐标点数据
        { name: '会宁红军会师旧址', value: [105.06321, 35.69724] },
        { name: '八路军兰州办事处纪念馆', value: [103.833, 36.05643] },
        { name: '会宁红军会师旧址', value: [105.06321, 35.69724] },
        { name: '南梁革命纪念馆', value: [108.34551, 36.39818] },
        { name: '高台中国工农红军西路军纪念馆', value: [99.82576, 39.38365] },
        { name: '两当兵变纪念馆', value: [106.31309, 33.92742] },
        { name: '哈达铺红军长征纪念馆', value: [104.23496, 34.2327] },
        { name: '榜罗镇会议纪念馆', value: [104.94739, 35.03896] },
        { name: '界石铺红军长征纪念馆', value: [105.55322, 35.6164] },
        { name: '岷州会议纪念馆', value: [103.90164, 34.45653] },
        { name: '肋巴佛革命纪念馆', value: [103.36223, 35.44363] },
        { name: '中共中央西北局岷州会议纪念馆', value: [103.90164, 34.45653] },
        { name: '八路军驻兰办事处旧址', value: [103.833, 36.05643] },
        { name: '兰州战役纪念馆', value: [103.80546, 36.04875] },
        { name: '甘肃省博物馆', value: [103.78175, 36.07273] },
        { name: '玉门铁人王进喜纪念馆', value: [97.06774, 97.06774] },
        { name: '中国工农红军西路军临泽战役纪念馆', value: [100.17055, 39.15851] },
        { name: '山丹艾黎纪念馆', value: [101.09562, 38.79045] },
        { name: '古浪战役纪念馆', value: [102.90363, 37.4758] },
        { name: '武威市凉州战役纪念馆', value: [102.64857, 37.93412] },
        { name: '白银市会宁县红军长征会师旧址', value: [105.05925, 35.69676] },
        { name: '甘南州迭部腊子口战役遗址', value: [103.90139, 34.12952] },
        { name: '陇南市宕昌县哈达铺红军长征纪念馆', value: [104.39939, 34.05349] },
        { name: '定西市岷县岷州会议纪念馆', value: [103.90653, 34.45526] },
        { name: '定西市通渭县榜罗镇革命遗址', value: [104.94824, 35.03808] },
        { name: '武威市古浪县红军西路军古浪战役遗址', value: [102.89383, 37.46267] },
        { name: '兰州市城关区八路军兰州办事处旧址', value: [103.83300, 36.05643] },
        { name: '庆阳市华池县陕甘边区苏维埃政府旧址', value: [108.35014, 36.40458] },
        { name: '庆阳市环县山城堡战役遗址', value: [107.04289, 36.96430] },
        { name: '平凉市中国工农红军长征界石铺纪念园', value: [105.55011, 35.61606] },
        { name: '陇南市两当县两当兵变旧址', value: [106.31309, 33.92742] },
        { name: '张掖市山丹艾黎纪念馆', value: [101.09385, 38.80478] },
        { name: '甘南州舟曲特大山洪', value: [104.37796, 33.78872] },
        // 其他景区的坐标点数据
      ],
      symbolSize: 10, // 散点大小
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
  transform: translate(-50%, -50%) scale(1.1);
  display: flex;
  justify-content: space-between;

  .map {
    width: 684px;
    height: 542px;
  }
}
</style>