<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>市属组织机构</p>
    </div>
    <div class="chart">
      <div class="list">
        <div class="item" v-for="(item, index) in state.list" :key="index" @click="itemClick()">
          <p class=" name">{{ item.name }}</p>
          <p class="value">
            {{ item.value }}<span class="unit">{{ item.unit }}</span>
          </p>
        </div>
      </div>
      <div class="bar">
        <my-chart :width="400" :height="96" :option="state.option"></my-chart>
      </div>
    </div>
    <!-- 企业信息 -->
    <teleport to="#screen">
      <information-dialog ref="refCenterBottomRef" />
    </teleport>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import InformationDialog from '../dialog/InformationDialog.vue';
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const refCenterBottomRef = ref(null)
const state = reactive({
  option: {},
  list: [
    {
      name: "市属国企",
      value: "142",
      unit: "户",
    },
    {
      name: "国有全资企业",
      value: "364",
      unit: "户",
    },
    {
      name: "国有控股企业",
      value: "237",
      unit: "户",
    },
    {
      name: "全级次企业",
      value: "948",
      unit: "户",
    },
    {
      name: "国有参股企业",
      value: "40",
      unit: "户",
    },
    {
      name: "国有实际控股企业",
      value: "9",
      unit: "户",
    },
  ],
  xData: ["投资类", "服务类", "工业类"],
  dataList: [50, 30, 20],
  colorList: ["#1866E5", "#F6BB3B", "#A2A256"],
  mainColor: "#3C97F1",
});
onMounted(() => {
  init();
});
const itemClick = () => {
  refCenterBottomRef.value.showModel = true
}
const init = () => {
  state.option = {
    grid: {
      left: "0",
      right: "0",
      top: "10",
      bottom: "0",
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
            };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      },
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
        splitLine: {
          show: false,
        },
        type: "value",
        show: false,
        axisPointer: {
          show: false, // 隐藏十字指示器
          type: "line", // 设置指示器样式
        },
      },
    ],
    yAxis: [
      {
        inside: true,
        splitLine: {
          show: false,
        },
        axisLine: {
          //y轴
          show: false,
        },
        type: "category",
        axisTick: {
          show: false,
        },
        offset: -10,
        inverse: true,
        data: state.xData,
        axisLabel: {
          formatter: function (value, index) {
            return `{b${index}|●} {a${index}|NO.${index + 1}}  ${value}`;
          },
          rich: {
            a0: {
              width: 30,
              color: state.colorList[0],
              borderRadius: 3,
              backgroundColor: hexToRgb(state.colorList[0], 0.3),
              padding: 2,
            },
            a1: {
              width: 30,
              color: state.colorList[1],
              borderRadius: 3,
              backgroundColor: hexToRgb(state.colorList[1], 0.3),
              padding: [2, 4],
            },
            a2: {
              width: 30,
              color: state.colorList[2],
              borderRadius: 3,
              padding: 2,
              backgroundColor: hexToRgb(state.colorList[2], 0.3),
            },
            b0: {
              color: state.colorList[0],
            },
            b1: {
              color: state.colorList[1],
            },
            b2: {
              color: state.colorList[2],
            },
          },
          color: "#fff",
          fontSize: 12,
          show: true,
          verticalAlign: "top",
          align: "left",
          padding: [-22, 0, 0, 0],
        },
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        offset: -10,
        axisLabel: {
          color: state.mainColor,
          fontSize: "14",
          verticalAlign: "top",
          align: "right",
          padding: [-22, 0, 0, 0],
          formatter: function (value, index) {
            return `{a${index}|${value}}`;
          },
          rich: {
            a0: {
              color: state.colorList[0],
            },
            a1: {
              color: state.colorList[1],
            },
            a2: {
              color: state.colorList[2],
            },
          },
        },
        data: state.dataList,
      },
    ],
    series: [
      {
        name: "企业户数",
        type: "bar",
        barWidth: 4,
        itemStyle: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: state.colorList[params.dataIndex] }, // 渐变起始颜色
              {
                offset: 1,
                color: hexToRgb(state.colorList[params.dataIndex], 0),
              }, // 渐变终止颜色
            ]);
          },
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
        label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 4,
          height: 4,
          position: "right",
          offset: [-7, 0],
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 2,
          shadowColor: "#fff",
          shadowBlur: 6,
        },
        data: state.dataList,
      },
      {
        type: "bar",
        barWidth: 4,
        itemStyle: {
          color: "rgba(60,151,241,.1)",
        },
        data: [100, 100, 100, 100, 100, 100, 100, 100],
        barGap: "-100%",
        tooltip: {
          show: false,
        },
      },
    ],
  };
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  width: 432px;
  height: 296px;
  margin-bottom: 40px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 234px;
    padding: 16px;
    box-sizing: border-box;

    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 8px;
      height: 100px;
      margin-bottom: 12px;

      .item {
        cursor: pointer;

        .name {
          font-size: 14px;
          line-height: 14px;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .value {
          font-size: 24px;
          line-height: 24px;
          color: #00ccff;
        }

        .unit {
          font-size: 14px;
          line-height: 14px;
          color: #ffffff;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
