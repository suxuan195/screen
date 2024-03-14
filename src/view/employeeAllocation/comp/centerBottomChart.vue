<template>
  <div class="chartBox">
    <div class="mainTitle ttf">
      <p>职工人数趋势</p>
    </div>
    <p class="more" @click="more">更多</p>
    <div class="chart">
      <my-chart :width="864" :height="206" :option="state.option" :click="true" @clickCallBack="clickCallBack"
        :params="_params"></my-chart>
    </div>
  </div>
  <CenterBottomDialog ref="refCenterBottomDialog" :showModel="state.showModel"></CenterBottomDialog>
</template>
<script setup>
import emitBus from "@/utils/bus";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import CenterBottomDialog from "./centerBottomDialog.vue";
import { reactive, onMounted, nextTick, ref, onBeforeMount } from "vue";
const refCenterBottomDialog = ref(null);
const _params = ref(null);
const state = reactive({
  showModel: false,
  option: {},
  colorList: ["#EBAC23"],
  title: ["职工人数增长数"],
  xData: ["2020年", "2021年", "2022年", "2023年", "2024年", "2025年"],
});
const more = async () => {
  state.showModel = true;
  await nextTick();
  refCenterBottomDialog.value.init();
};
const clickCallBack = async () => {
  state.showModel = true;
  await nextTick();
  refCenterBottomDialog.value.init();
}
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
      left: "60",
      right: "30",
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
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.dataIndex % 2]
            };margin-right:6px;display:inline-block;"></span>${item.data
            } (万元)</div>`;
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
      right: "center",
      top: "20",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    xAxis: [
      {
        type: "category",
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
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
        name: "单位(万人)",
        // min: 0,
        // max: 1200,
        // interval: 300,
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
    series: [],
  };
  state.option.series = [];
  state.title.forEach((item, index) => {
    let arr = [12324, 13242, 11023, 15235, 14231, 16272];
    state.option.series.push({
      name: item,
      type: "line",
      smooth: true,
      lineStyle: {
        color: state.colorList[index],
      },
      symbol: "circle", // 圆点的形状
      symbolSize: 6, // 圆点的大小
      itemStyle: {
        color: state.colorList[index], // 圆点的颜色
        shadowColor: "#fff", // 阴影颜色
        shadowBlur: 4, // 阴影模糊程度
      },
      emphasis: {
        itemStyle: {
          borderColor: "#fff", // 圆点边框颜色
          borderWidth: 2, // 圆点边框宽度
        },
      },
      data: arr,
      areaStyle: {
        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: hexToRgb(state.colorList[index], 0.3),
            },
            {
              offset: 1,
              color: hexToRgb(state.colorList[index], 0),
            },
          ],
          false
        ),
        shadowColor: hexToRgb(state.colorList[index], 0.9), //阴影颜色
        shadowBlur: 20,
      },
    });
  });
};

onMounted(() => {
  init();
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
});

onBeforeMount(() => {
  emitBus.off("closeModel");
});
</script>
    
<style lang="scss" scoped>
.chartBox {
  width: 864px;
  height: 268px;
  margin-bottom: 50px;
  position: relative;

  .more {
    position: absolute;
    right: 4px;
    top: 14px;
    cursor: pointer;
    color: rgba(214, 239, 255, 0.6);
    font-size: 14px;

    &:hover {
      color: rgba(214, 239, 255, 1);
    }
  }

  .chart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}
</style>
    