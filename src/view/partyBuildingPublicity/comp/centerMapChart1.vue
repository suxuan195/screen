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
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params) {
      console.log(params);
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
          return res;
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
        color: "#fff"
      }
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
        color: "#fff"
      }
    }
  },
  series: [
    {
      type: 'effectScatter',  // scatter 类型的系列用于显示散点图
      coordinateSystem: 'geo',  // 坐标系设为地理坐标系
      data: [  // 景区的坐标点数据
        { name: '甘肃省兰州市金川集团股份有限公司', value: [103.97871, 35.99346] },
        { name: '甘肃省嘉峪关市酒泉钢铁（集团）有限责任公司', value: [98.2856, 39.80659] },
        { name: '甘肃省陇南市白银有色集团股份有限公司', value: [105.68525, 33.97848] },
        { name: '兰州兰石集团有限公司', value: [103.70064, 36.50189] },
        { name: '甘肃省农垦集团有限责任公司', value: [103.89538, 36.05836] },
        { name: '甘肃省民航机场集团有限公司', value: [100.66413, 38.82055] },
        { name: '甘肃省电力投资集团有限责任公司', value: [103.85709, 36.07657] },
        { name: '甘肃省公路航空旅游投资集团有限公司', value: [103.85028, 36.06362] },
        { name: '甘肃能源化工投资集团有限公司', value: [103.83153, 36.04973] },
        { name: '甘肃能化股份有限公司', value: [103.75261, 36.08041] },
        { name: '甘肃省铁路投资建设集团有限公司', value: [103.85634, 36.07717] },
        { name: '甘肃工程咨询集团股份有限公司', value: [103.75906, 36.08008] },
        { name: '甘肃电气装备集团有限公司', value: [103.76211, 36.08046] },
        { name: '甘肃省公路交通建设集团有限公司', value: [104.09433, 36.02679] },
        { name: '甘肃科技投资集团有限公司', value: [103.90224, 36.0581] },
        { name: '甘肃药业投资集团有限公司', value: [103.75927, 36.08027] },
        { name: '甘肃文旅产业集团有限公司', value: [103.84736, 36.06353] },
        { name: '甘肃省水务发展集团有限公司', value: [103.83494, 36.06481] },
        { name: '甘肃省新业资产经营有限责任公司', value: [103.83309, 36.05329] },
        { name: '白银有色产业集团有限责任公司', value: [104.18627, 36.56094] },
        { name: '甘肃省长城建设集团有限责任公司', value: [103.86809, 36.04737] },
        // 其他景区的坐标点数据
      ],
      symbolSize: 10,  // 点的大小
      label: {
        show: false,
        formatter: '{b}',
        fontSize: 14,
        color: '#fff'
      },
      itemStyle: {
        color: '#fff'  // 点的颜色
      }
    }
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