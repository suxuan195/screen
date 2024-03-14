<template>
  <div class="chartBox">
    <div class="mainTitle">
      <p class="ttf">职工养老保险缴纳情况</p>
    </div>
    <!-- <p class="more" @click="more">更多</p> -->
    <div class="chart">
      <my-chart :width="864" :height="206" :option="state.option" :click="true" :params="_params"
        @clickCallBack="clickACallBack"></my-chart>
    </div>
  </div>
  <centerChartDialog ref="centerChartDialogRef"></centerChartDialog>
</template>
    
<script setup>
import emitBus from "@/utils/bus";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import centerChartDialog from "../dialog/centerChartDialog.vue";
import { reactive, onMounted, onBeforeMount, ref, } from "vue";
const centerChartDialogRef = ref(null);
const _params = ref(null);
const state = reactive({
  showModel: false,
  option: {},
  title: ["个人缴费", "企业缴费"],
  //   立体柱状图左-右-上的颜色,左为主题颜色组
  colorList: ["#3C97F1", "#EBAC23"],
  rightColorList: ["#1E93BC", "#AD7703"],
  topColorList: ["#27AFEA", "#EBAC23"],
  //   立体柱状图移动的位置
  // position: [-30, -10, 10, 30],
  position: [-10, 10, 10, 30],
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
  dataList: [
    [
      1331,
      1334,
      1343,
      1332,
      1334,
      1352,
      1363,
      1342,
      1762,
      1324,
      1321,
      1323
    ],
    [
      1690.73,
      1694.54,
      1705.97,
      1692.00,
      1694.54,
      1717.41,
      1731.38,
      1704.70,
      2238.22,
      1681.84,
      1678.03,
      1680.57
    ]
  ]
});
const clickACallBack = () => {
  centerChartDialogRef.value.showModel = true
}
// const more = async () => {
//   state.showModel = true;
//   await nextTick();
//   refCenterChartDialog.value.init();
// };
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
  location = [location[0] + state.position[params.seriesIndex], location[1]];
  var location1 = api.coord([api.value(0), 0]);
  location1 = [location1[0] + state.position[params.seriesIndex], location1[1]];
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
      formatter: function (params) {
        _params.value = params;
        let dom = `<div>${params[0].name}</div>`;
        params.forEach((item) => {
          dom += `<div style="display: flex;align-items: center;"><span style="margin-right:4px;width:8px;height:8px;border-radius: 4px;background-color:${state.colorList[item.seriesIndex]
            }"></span><div>${item.seriesName}&nbsp;&nbsp;${item.value
            }</div></div>`;
        });
        return dom;
      },
    },
    grid: {
      left: "30",
      right: "30",
      top: "50",
      bottom: "20",
      containLabel: true,
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      right: "10",
      top: "20",
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
      name: "单位(万元)",
      // min: 0,
      // max: 1200,
      // interval: 300,
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
      nameTextStyle: {
        color: "#fff",
        fontSize: 12,
      },
      axisLabel: {
        fontSize: 12,
        color: "white",
      },
      boundaryGap: ["20%", "20%"],
    },
    series: [
      {
        type: "custom",
        name: "个人缴费",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        renderItem: (params, api) => renderItem(params, api),
        data: state.dataList[0]
      },
      {
        type: "custom",
        name: "企业缴费",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        renderItem: (params, api) => renderItem(params, api),
        data: state.dataList[1]
      },
    ],
  };

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
    