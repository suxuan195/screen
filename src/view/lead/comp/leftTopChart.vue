<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>项目分布情况</p>
    </div>
    <div class="chart">
      <my-chart
        :width="420"
        :height="382"
        :option="state.option"
        :click="true"
        :params="_params"
        @clickCallBack="clickACallBack"
      ></my-chart>
    </div>
  </div>
  <teleport to="#screen">
    <LeftTopDialog
      ref="refLeftTopDialog"
      :showModel="state.showModel"
      :tableData="state.tableData"
    >
    </LeftTopDialog>
  </teleport>
</template>

<script setup>
import LeftTopDialog from "./leftTopDialog.vue";
import { reactive, onMounted, onBeforeMount, ref } from "vue";
import emitBus from "@/utils/bus";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
// import { enterpriseData, tableCountryData } from "../json/country";
import { useList } from "../hooks/distribution";
const { list, getList } = useList();
const refLeftTopDialog = ref(null);
const _params = ref(null);
const state = reactive({
  showModel: false,
  tag: 0,
  bar: ["施工承包项目", "生产经营项目"],
  option: {},
  xData: [
    "采矿业",
    "建筑业",
    "交通运输、仓储和邮政业",
    "居民服务、修理和其他服务业",
    "农、林、牧、渔业",
    "水利、环境和公共设施管理业",
    "制造业",
  ],
  dataList: [4, 54, 1, 2, 1, 2, 5],
  title: ["企业户数"],
  colorList: ["#3C97F1", "#EBAC23"],
  mainColor: "#3C97F1",
  slide: [],
  tableData: [],
  currentActive: 0,
});
onMounted(() => {
  setData();
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
});
//点击柱状图线段
const clickACallBack = (params) => {
  // state.currentActive = params.dataIndex + 1;
  state.showModel = true;
  getList(params.name);
  state.tableData = list;
  // state.slide =
  //   enterpriseData[`country${state.tag + 1}`][
  //   `countryList${state.currentActive}`
  //   ];
  // state.tableData =
  //   tableCountryData[`countryProject${state.tag + 1}`][
  //     `classification${state.currentActive}`
  //   ].countryProjectList1;
};
//点击左侧tab
// const clickItem = (index) => {
//   state.tableData =
//     tableCountryData[`countryProject${state.tag + 1}`][
//     `classification${state.currentActive}`
//     ][`countryProjectList${index + 1}`];
// };
onBeforeMount(() => {
  emitBus.off("closeModel");
});

const setData = () => {
  init();
};

const init = () => {
  state.option = {
    grid: {
      left: "50",
      right: "20",
      top: "50",
      bottom: "20",
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
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${
            state.colorList[item.seriesIndex % 1]
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
        offset: -30,
        axisLabel: {
          color: state.mainColor,
          fontSize: "14",
          verticalAlign: "top",
          align: "right",
          padding: [-22, 0, 0, 0],
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
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: state.mainColor }, // 渐变起始颜色
            { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
          ]),
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
  width: 420px;
  height: 444px;
  margin-bottom: 50px;

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%
    no-repeat;
    position: relative;
  }
}
</style>
