<template>
  <Chart :title="title" :option="state.option" :borderImg="borderImg" :boxWidth="1824" :boxHeight="244"
    :canvasWidth="1784" :canvasHeight="184" :more="true" :tag="`bottomChart`" :showModel="showModel"
    @moreClick="moreClick"  :click="true" :params="_params" 
  @clickCallBack="clickACallBack" ></Chart>
  <economyPopUp :showModel="showModel" />
  <BottomDialog :tableColumns="state.tableColumns" :tableData="state.tableData"   :showModel="showModels" :month="state.month"/>
  <!-- <teleport to="#screen">
      <BottomDialog  ref="BottomDialog " :showModel="showModels" :tableData="state.tableData" >
      </BottomDialog>
    </teleport> -->

</template>

<script setup>
import * as echarts from "echarts";
import emitBus from "@utils/bus";
import { hexToRgb } from "@/utils";
import Chart from "@/components/Chart/Chart.vue";
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import borderImg from "@images/payrollManagement/border-max.png";
import economyPopUp from "@components/popup/payrollManagement/economyPopUp.vue";
import BottomDialog from "../../../components/popup/payrollManagement/BottomDialog.vue";
import { useList } from '../hooks/construct'
const { list, getList } = useList();
const title = ref("");
const _params = ref(null);
const state = reactive({
  option: {},
  month:'',
  title: [
    "负责人薪酬增长率",
    "盈余能力综合值",
    "资产质量综合值",
    "债务风险综合值",
    "经营增长综合值",
  ],
  //   立体柱状图左-右-上的颜色,左为主题颜色组
  colorList: ["#3C97F1", "#3C97F1", "#0BE6E6", "#EBAC23", "#F1606C"],
  rightColorList: ["#1E93BC", "#1E93BC", "#0A8C8C", "#AD7703", "#8A3D43"],
  topColorList: ["#27AFEA", "#27AFEA", "#0FD9D9", "#EBAC23", "#F1606C"],
  //   立体柱状图移动的位置
  position: [-30, -10, 10, 30],
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

// 渲染自定义图表类型
const renderItem = (params, api) => {
  let cubeLeftStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: hexToRgb(state.colorList[params.seriesIndex]),
    },
    {
      offset: 1,
      color: hexToRgb(state.colorList[params.seriesIndex], 0),
    },
  ]);
  let cubeRightStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: hexToRgb(state.rightColorList[params.seriesIndex]),
    },
    {
      offset: 1,
      color: hexToRgb(state.rightColorList[params.seriesIndex], 0),
    },
  ]);
  let cubeTopStyle = {
    color: state.topColorList[params.seriesIndex],
  };
  var location = api.coord([api.value(0), api.value(1)]);
  location = [
    location[0] + state.position[params.seriesIndex - 1],
    location[1],
  ];
  var location1 = api.coord([api.value(0), 0]);
  location1 = [
    location1[0] + state.position[params.seriesIndex - 1],
    location1[1],
  ];
  return {
    type: "group",
    children: [
      {
        type: "CubeLeft",
        shape: {
          api,
          xValue: api.value(0),
          yValue: api.value(1),
          x: location[0],
          y: location[1],
          xAxisPoint: location1,
        },
        style: {
          fill: cubeLeftStyle,
        },
      },
      {
        type: "CubeRight",
        shape: {
          api,
          xValue: api.value(0),
          yValue: api.value(1),
          x: location[0],
          y: location[1],
          xAxisPoint: location1,
        },
        style: {
          fill: cubeRightStyle,
        },
      },
      {
        type: "CubeTop",
        shape: {
          api,
          xValue: api.value(0),
          yValue: api.value(1),
          x: location[0],
          y: location[1],
          xAxisPoint: location1,
        },
        style: {
          fill: cubeTopStyle,
        },
      },
    ],
  };
};

// 自定义图表类型-立体柱状图
const registerShape = () => {
  const offsetX = 6;
  const offsetY = 3;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      // console.log(shape);
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape("CubeLeft", CubeLeft);
  echarts.graphic.registerShape("CubeRight", CubeRight);
  echarts.graphic.registerShape("CubeTop", CubeTop);
};

const init = () => {
  registerShape();
  state.option = {
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "axis",
      axisPointer: {
        type: "shadow",
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
    
    grid: {
      left: "40",
      right: "180",
      top: "10",
      bottom: "0",
      containLabel: true,
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      orient: "vertical",
      right: "40",
      bottom: "20",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    
    // x 坐标
    xAxis: {
      type: "category",
      data: state.xData,
      // 坐标线条
      axisLine: {
        show: true,
        lineStyle: {
          color: "#4CB3F3",
        },
      },
      // 标志位
      axisTick: {
        show: false,
        length: 9,
        alignWithLabel: true,
        lineStyle: {
          color: "#7DFFFD",
        },
      },
      // x 坐标的文字标注的颜色
      axisLabel: {
        fontSize: 12,
        color: "white",
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 80,
      interval: 20,
      axisLine: {
        show: false,
      },
      // 分割线
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
        fontSize: 12,
        color: "white",
        formatter: function (value, index) {
          return index > 0 ? value + "%" : value;
        },
      },
      boundaryGap: ["20%", "20%"],
    },
    series: [
      {
        name: "负责人薪酬增长率",
        type: "line",
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
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
        type: "custom",
        name: "盈余能力综合值",
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        renderItem: (params, api) => renderItem(params, api),
      },
      {
        type: "custom",
        name: "资产质量综合值",
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        renderItem: (params, api) => renderItem(params, api),
      },
      {
        type: "custom",
        name: "债务风险综合值",
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        renderItem: (params, api) => renderItem(params, api),
      },
      {
        type: "custom",
        name: "经营增长综合值",
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        renderItem: (params, api) => renderItem(params, api),
      },
    ],
  };
  // state.option.series.forEach((item) => {
  //   item.data = [];
  //   for (let i = 0; i < 12; i++) {
  //     let randomNum = Math.floor(Math.random() * 81);
  //     item.data.push(randomNum);
  //   }
  // });
  // 负责人薪酬增长率
   //                            
   state.option.series[0].data=["5.00","7.00","6.00","6.00","5.00","8.00","8.00","8.00","8.00","6.00","7.00","7.00"];
   state.option.series[1].data=["65.00","46.00","56.00","63.00","51.00","62.00","48.00","41.00","50.00","41.00","60.00","60.00"];
   state.option.series[2].data=["43.00","62.00","48.00","65.00","42.00","42.00","46.00","58.00","57.00","62.00","58.00","65.00"];
   state.option.series[3].data=["55.00","58.00","65.00","46.00","47.00","51.00","65.00","53.00","55.00","53.00","64.00","51.00"];
   state.option.series[4].data=["64.00","49.00","40.00","40.00","45.00","61.00","50.00","50.00","63.00","58.00","61.00","57.00"];


};
const showModel = ref(false);
//点击更多事件
const moreClick = () => {
  showModel.value = true;
};

onBeforeMount(() => {
  emitBus.off("closeModel");
});
const showModels=ref(false)
onMounted(() => {
  init();
  emitBus.on("closeModel", () => {
    showModel.value = false;
    showModels.value=false
  });
  // getList()
  // state.tableData=JSON.parse(JSON.stringify(list))
  // console.log( state.tableData,'-- state.tableData',list);
});


//点击柱状图线段
const clickACallBack = (params) => {
  // console.log(params.axisValue);
  state.month=params.axisValue
  // console.log(state.month,'-----');
  showModels.value=true
  getList(params.name)
  state.tableData = list
  // state.tableData=JSON.parse(JSON.stringify(list))
  // console.log(state.tableData,list,'----list');

};


</script>
<style lang="scss" scoped></style>
