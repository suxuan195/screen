<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>行业分布情况</p>
    </div>
    <div class="chart">
      <my-chart :width="420" :height="218" :option="state.option" :click="true" @clickCallBack="clickCallBack"
        :params="_params"></my-chart>
    </div>
  </div>
  <teleport to="#screen">
    <RightCenterDialog ref="refRightCenterDialog"></RightCenterDialog>
  </teleport>
</template>

<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import * as echarts from "echarts";
import RightCenterDialog from "../dialog/rightCenterDialog.vue";
import { hexToRgb } from "@/utils";
const refRightCenterDialog = ref(null);
const _params = ref(null);
const state = reactive({
  option: {},
  xData: [
    "采矿业",
    "电力热",
    "房地产业",
    "建筑业",
    "交通运输",
    "教育",
    "金融业",
    "居民服务",
    "科学研究",
    "农林牧渔",
    "批发零售",
    "水利环境",
    "文化体育",
    "信息传输",
    "制造业",
    "住宿餐饮",
    "租赁服务",
  ],
  title: ["企业户数"],
  colorList: ["#AAFDFD"],
});

const clickCallBack = async (p) => {
  refRightCenterDialog.value.showModel = true;
  await nextTick();
  refRightCenterDialog.value.setList(p.name);
};

onMounted(() => {
  setTimeout(() => {
    init();
  }, 200)
});

// legenData处理
const legendData = () => {
  return state.title.map((item, index) => {
    return {
      name: item,
      itemStyle: {
        color: state.colorList[index],
      },
    };
  });
};
const init = () => {
  state.option = {
    grid: {
      left: "50",
      right: "25",
      top: "50",
      bottom: "40",
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      formatter: function (p) {
        _params.value = p;
        let str = "";
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 1]
            };margin-right:6px;display:inline-block;"></span>${item.data
            } (户)</div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      },
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      left: "center",
      top: "20",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
        axisLine: {
          // 设置x轴的颜色
          lineStyle: {
            color: "#4CB3F3",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位(户)",
        min: 0,
        max: 200,
        interval: 50,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            width: 1,
            opacity: 0.3,
            color: ["#4CB3F3"],
          },
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
        nameTextStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
    ],
    series: [
      {
        name: "企业户数",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#AAFDFD" }, // 渐变起始颜色
            { offset: 1, color: hexToRgb("#AAFDFD", 0) }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
        label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "top",
          offset: [0, 7],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        data: [1, 13, 53, 177, 6, 2, 6, 4, 28, 6, 52, 11, 12, 6, 14, 15, 51],
      },
    ],
    dataZoom: {
      show: true, // 为true 滚动条出现
      realtime: true,
      type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      start: 0, // 表示默认展示20%～80%这一段。
      end: 25,
      zoomOnMouseWheel: false,
    },
  };
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  width: 420px;
  height: 280px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}
</style>
