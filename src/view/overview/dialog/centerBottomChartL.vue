<template>
  <div class="box">
    <div class="title">
      <div class="item" v-for="(item, index) in state.titleList" :key="index" @click="itemClick(index)">
        <p class="name">{{ item.name }}</p>
        <p class="value">
          {{ item.value }}<span class="unit">{{ item.unit }}</span>
        </p>
      </div>
    </div>
    <my-chart :width="432" :height="172" :option="state.option"></my-chart>

    <!-- 企业营业收入 -->
    <teleport to="#screen">
      <enterpriseTradeIInComeDialog ref="enterpriseTradeIInComeRef" />
    </teleport>
    <!-- 企业资产总额 -->
    <teleport to="#screen">
      <totale-enterprise-assets-dialog ref="totaleEnterpriseAssetsRef" />
    </teleport>
  </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import enterpriseTradeIInComeDialog from '../dialog/enterpriseTradeIInComeDialog.vue'
import totaleEnterpriseAssetsDialog from '../dialog/totaleEnterpriseAssetsDialog.vue'
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
  option: {},
  colorList: ["#0BE6E6"],
  rightColorList: ["#1E93BC", "#AD7703"],
  topColorList: ["#27AFEA", "#EBAC23"],
  position: [0],
  xData: ["01", "02", "03", "04", "05", "06", "07", "08"],
  title: ["全缘劳动生产率", "研发经费强度", "营业收入利润率"],
  titleList: [
    {
      name: "营业收入",
      value: "6,82",
      unit: "亿元",
    },
    {
      name: "资产总额",
      value: "16,842.51",
      unit: "亿元",
    },
  ],
});
const enterpriseTradeIInComeRef = ref(null)
const totaleEnterpriseAssetsRef = ref(null)
const itemClick = (index) => {
  if (index === 0) {
    enterpriseTradeIInComeRef.value.showModel = true
  } else {
    totaleEnterpriseAssetsRef.value.showModel = true
  }
}
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
  const value = api.value(2); // 获取当前数据点的值
  const pos = api.coord([api.value(0), value]); // 获取当前数据点的坐标
  const group = {
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
  return group;
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
      left: "0",
      right: "0",
      top: "30",
      bottom: "10",
      containLabel: true,
    },
    legend: {
      data: [
        {
          name: "全缘劳动生产率",
          itemStyle: {
            color: "#3C97F1",
          },
        },
        {
          name: "研发经费强度",
          itemStyle: {
            color: "#0BE6E6",
          },
        },
        {
          name: "营业收入利润率",
          itemStyle: {
            color: "#EBAC23",
          },
        },
      ],
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      right: "30",
      top: "0",
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
        align: "center", // 居中对齐
        margin: 10,
        fontSize: 12,
        color: "white",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "(万元/人)",
        min: 0,
        max: 15,
        interval: 3,
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
        axisTick: {
          alignWithLabel: true, // 将刻度线与标签对齐
        },
        axisLabel: {
          show: true,
          fontSize: 12,
          color: "white",
        },
        boundaryGap: ["20%", "20%"],
      },
      {
        type: "value",
        name: "(%)",
        min: 0,
        max: 5,
        interval: 1,
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
        axisTick: {
          alignWithLabel: true, // 将刻度线与标签对齐
        },
        axisLabel: {
          show: true,
          fontSize: 12,
          color: "white",
        },
        boundaryGap: ["20%", "20%"],
      },
    ],
    series: [
      {
        barWidth: "50%", // 设置柱子宽度为整个类目间距的一半
        type: "custom",
        name: "全缘劳动生产率",
        renderItem: (params, api) => renderItem(params, api),
      },
      {
        name: "研发经费强度",
        type: "line",
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        lineStyle: {
          color: "#0BE6E6",
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: "#0BE6E6", // 圆点的颜色
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
        name: "营业收入利润率",
        type: "line",
        smooth: true,
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        lineStyle: {
          color: "#EBAC23",
        },
        symbol: "circle", // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: "#EBAC23", // 圆点的颜色
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
    ],
  };
  state.option.series.forEach((item) => {
    item.data = [];
    for (let i = 0; i < 8; i++) {
      let randomNum = Math.floor(Math.random() * 14);
      item.data.push(randomNum);
    }
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