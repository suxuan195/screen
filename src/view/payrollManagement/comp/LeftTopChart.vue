<template>
  <Chart :title="title" :option="state.option" :click="true" :params="_params" 
  @clickCallBack="clickACallBack" ></Chart>
  <leftTopDialog :tableColumns="state.tableColumns" :tableData="state.tableData"   :showModel="showModel" :month="state.month"/>

</template>

<script setup>
import { reactive, ref, onMounted ,onBeforeMount} from "vue";
import Chart from "@/components/Chart/Chart.vue";
import * as echarts from "echarts";
import leftTopDialog from "../../../components/popup/payrollManagement/leftTopDialog.vue";
import emitBus from "@utils/bus";
const title = ref("月度业绩考核指标总览");
const showModel=ref(false)
const _params = ref(null);
const state = reactive({
  option: {},
  month:'',
  xData: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  title: ["工业总产值", "营业收入", "利润总额"],
  colorList: ["#3C97F1", "#0BE6E6", "#EBAC23"],
});

onBeforeMount(() => {
  emitBus.off("closeModel");
});

onMounted(() => {
  init();
  emitBus.on("closeModel", () => {
    showModel.value = false;

  });
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

//点击柱状图线段
const clickACallBack = (params) => {
  // console.log(params.axisValue);
  state.month=params.axisValue
  // console.log(state.month,'-----');
  showModel.value=true
};

const init = () => {
  state.option = {
    grid: {
      left: "40",
      right: "140",
      top: "41",
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
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 1]
            };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
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
      orient: "vertical",
      right: "0",
      bottom: "center",
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
        triggerEvent:true,
      },
      
    ],
    yAxis: [
      {
        type: "value",
        name: "单位(万元)",
        min: 0,
        max: 1200,
        interval: 300,
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
      {
        type: "value",
        min: 0,
        max: 1200,
        interval: 300,
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
      },
    ],
    series: [
      {
        name: "工业总产值",
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        lineStyle: {
          color: "#3C97F1",
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: "#3C97F1", // 圆点的颜色
          shadowColor: "#fff", // 阴影颜色
          shadowBlur: 4, // 阴影模糊程度
        },
        emphasis: {
          itemStyle: {
            borderColor: "#fff", // 圆点边框颜色
            borderWidth: 2, // 圆点边框宽度
          },
        },
      },
      {
        name: "利润总额",
        type: "bar",
        barWidth: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#EBAC23" }, // 渐变起始颜色
            { offset: 1, color: "rgba(235,172,35,0)" }, // 渐变终止颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
      },
      {
        name: "营业收入",
        type: "bar",
        barWidth: 6,
        barBorderRadius: [3, 3, 0, 0],
        tooltip: {
          valueFormatter: function (value) {
            return value + " (万元)";
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
            { offset: 1, color: "rgba(11,230,230,0)" }, // 渐变终止颜色为透明（rgba）
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%",
      },
    ],

  };
  // state.option.series.forEach((item) => {
  //   item.data = [];
  //   for (let i = 0; i < 12; i++) {
  //     let randomNum = Math.floor(Math.random() * 1201);
  //     item.data.push(randomNum);
  //   }
  // });
  // 工业总产值
  //                            1月      2月      3月     4月      5月      6月      7月     8月       9月     10月     11月     12月 
  state.option.series[0].data=["363.17","363.1","368.5","372.98","372.6","374.53","375.21","375.11","373.18","367.32","375.3","372.37"]
  // 利润总额
  state.option.series[1].data=["12.75","12.85","24.7", "12.65", "12.25","25.25",  "11.96","15.39","18.03",  "18.93","20.98","20.58"]
  // 营业收入
  state.option.series[2].data=["749.1","748","749.6","751.2","822.15","931","801.87","527.69","732.1","745.2","763.12","805.21"]
   
};



</script>
<style lang="scss" scoped>
</style>