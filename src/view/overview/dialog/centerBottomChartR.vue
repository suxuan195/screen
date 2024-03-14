<template>
  <div class="box">
    <div class="title">
      <div class="item" v-for="(item, index) in state.titleList" :key="index" @click="itemClick">
        <p class="name">{{ item.name }}</p>
        <p class="value">
          {{ item.value }}<span class="unit">{{ item.unit }}</span>
        </p>
      </div>
    </div>
    <my-chart :width="432" :height="172" :option="state.option" :click="true" @clickCallBack="clickCallBack"
      :params="_params"></my-chart>
    <teleport to="#screen">
      <CenterBottomDialog ref="refCenterBottomDialog"></CenterBottomDialog>
    </teleport>
  </div>
</template>
      
<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import CenterBottomDialog from "./centerBottomDialogR.vue";
const refCenterBottomDialog = ref(null);
const _params = ref(null);
const state = reactive({
  option: {},
  colorList: ["#3C97F1"],
  title: ["资产负债率"],
  xData: ["01", "02", "03", "04", "05", "06", "07", "08"],
  titleList: [
    {
      name: "负债总额",
      value: "11,111.29",
      unit: "亿元",
    },
  ],
});
const itemClick = () => {
  refCenterBottomDialog.value.showModel = true;
}
const clickCallBack = async (p) => {
  await nextTick();
  refCenterBottomDialog.value.setList(p.name);
};
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
      right: "30",
      top: "30",
      bottom: "30",
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
            };margin-right:6px;display:inline-block;"></span>资产负债率：${item.data
            } </div>`;
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
      top: "0",
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
        name: "(%)",
        min: 0,
        max: 100,
        interval: 20,
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
    let arr = [];
    for (let i = 0; i < 8; i++) {
      let randomNum = Math.floor(Math.random() * 100);
      arr.push(randomNum);
    }
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
});
</script>
      
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  height: 46px;
  background: url("@images/overview/t-bg.png") no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  .item {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      font-size: 14px;
      color: #fff;
      margin-right: 12px;
    }

    .value {
      font-size: 20px;
      color: #00e7ff;
    }

    .unit {
      font-size: 12px;
      color: #00e7ff;
      display: inline-block;
      margin-left: 4px;
      transform: translateY(-2px);
    }
  }
}
</style>
      