<template>
  <popup :width="1320" :height="518" title="企业负责人薪酬与企业经营状况关联图" :showModel="props.showModel">
    <div class="box">
      <leftNavList :list="state.companyList" height="380px" maxHeight="380px" @itemClick="itemClick" />
      <div class="right_chart">
        <CommonChart :option="state.option" :canvasWidth="1100" :canvasHeight="400" :highlight="true" />
      </div>
    </div>
  </popup>
</template>

<script setup>
import * as echarts from "echarts";
import { reactive, onMounted } from "vue";
import popup from "@components/popup/pop.vue";
import CommonChart from "@components/Chart/ComonChart.vue";
import leftNavList from "../../leftNavList/leftNavList.vue";
import { hexToRgb } from "@/utils";
const state = reactive({
  option: {},
  title: [
    "折现数据",
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
  companyList: [
    {
      title: '中国平安保险股份有限公司'
   
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
  ]
});
const props = defineProps({
  showModel: Boolean,
  default: false,
});
const itemClick = (index) => {
  console.log(index);
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
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "40",
      right: "0",
      top: "41",
      bottom: "0",
      containLabel: true,
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      orient: "horizontal",
      x: "right",
      right: "40",
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
        name: "折现数据",
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
  state.option.series.forEach((item) => {
    item.data = [];
    for (let i = 0; i < 12; i++) {
      let randomNum = Math.floor(Math.random() * 81);
      item.data.push(randomNum);
    }
  });
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  /*定义滚动条整体样式*/
  width: 2px;
  height: 50px;
  border-radius: 2px;
  opacity: 1;
  background: #d8d8d8;
}

::-webkit-scrollbar-thumb {
  /*定义滚动条内部样式*/
  background: #d8d8d8;

  border-radius: 3px;
  /*圆角程度*/
}

.box {
  padding-top: 36px;
  display: flex;

  .el-scrollbar {
    border-radius: 10px;
    border: 1px solid #4cb3f3;
    width: 140px;
    box-sizing: border-box;
    padding: 10px 0;

    li {
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #9e9e9e;
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;

      &:hover {
        background: #008cff;
        color: #ffffff;

        &::before {
          position: absolute;
          z-index: 100;
          content: "";
          width: 3px;
          height: 32px;
          opacity: 1;
          left: 0px;
          background: linear-gradient(180deg, #ffffff 0%, #008cff 100%);
        }
      }
    }
  }

  .right_chart {
    margin-left: 24px;
  }
}
</style>
