<template>
  <div class="chartBox">
    <div class="mainTitle ttf">
      <p>职工性别分布</p>
    </div>
    <!-- <p class="more" @click="more">更多</p> -->
    <div class="chart">
      <my-chart :width="432" :height="206" :option="state.option" :clickA="true"
        @clickACallBack="clickCallBack"></my-chart>
    </div>
    <leftTopDialog ref="leftTopDialogRef" />
  </div>
</template>
    
<script setup>
import { reactive, onMounted, ref } from "vue";
import imageBg from "@images/employeeAllocation/leftTop.png";
import male from "@images/employeeAllocation/male.svg";
import female from "@images/employeeAllocation/female.svg";
import line from "@images/employeeAllocation/line.png";
import leftTopDialog from "../dialog/leftTopDialog.vue";
const leftTopDialogRef = ref(null);
const state = reactive({
  option: {},
  list: [
    {
      name: "男",
      value: 54,
    },
    {
      name: "女",
      value: 46,
    },
  ],
  colorEnum: [
    {
      r: 24,
      g: 102,
      b: 229,
    },
    {
      r: 241,
      g: 96,
      b: 108,
    },
  ],
});

const getLocation = (dx, dy) => {
  const tanV = dx / dy;
  // 这里是在计算按照横向渐变还是按照纵向渐变。
  const directSign = Math.abs(tanV) < 1;
  const t = directSign ? tanV : 1 / tanV;

  const sign1 = t > 0 ? 1 : -1;
  const sign2 = dx > 0 ? 1 : -1;
  const sign = directSign ? sign1 * sign2 : sign2;

  // 把整个圆形的坐标映射到了[0-1]之间0.5，0.5即为圆心坐标。
  const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
  // 这里给纵向渐变还是横向渐变赋值、即group中的第三项和第四项的值
  const group2 = sign > 0 ? [0, 1] : [1, 0];
  const group = [...group1, ...group2];
  const keys = directSign ? ["x", "x2", "y", "y2"] : ["y", "y2", "x", "x2"];

  const res = {};
  keys.forEach((k, idx) => {
    res[k] = group[idx];
  });
  return res;
};
const clickCallBack = () => {
  leftTopDialogRef.value.showModel = true;

}
const getCoordinates = (startArc, endArc) => {
  // 这里计算扇形最外层的x,y坐标
  const position = [
    Math.sin(startArc),
    -Math.cos(startArc),
    Math.sin(endArc),
    -Math.cos(endArc),
  ];
  // 这里求得了最外层两个顶点坐标的差值。
  const dx = position[2] - position[0];
  const dy = position[3] - position[1];

  // 这里在根据两点坐标的差值计算x,y,x2,y2
  return getLocation(dx, dy);
};

const setGradientColorInItemSyle = (
  data,
  colorlist,
  startOpacity = 0,
  endOpacity = 1
) => {
  for (let i = 0; i < data.length; i++) {
    const color = colorlist[i % 6];
    const startAngle = data[i].startAngle;
    const endAngle = data[i].endAngle;
    // 这里计算了 线性渐变的起止方向
    // @ts-ignore
    const coordinates = getCoordinates(startAngle, endAngle);
    data[i].itemStyle = {
      color: {
        ...coordinates,
        type: "linear",
        global: false,
        colorStops: [
          {
            offset: 0,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`,
          },
          {
            offset: 1,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`,
          },
        ],
      },
    };
  }
  return data;
};
const legendData = () => {
  return state.list.map((item, index) => {
    const color = state.colorEnum[index % 2];
    return {
      name: item.name,
      itemStyle: {
        color: `rgb(${color.r}, ${color.g}, ${color.b})`,
      },
    };
  });
};
const init = () => {
  const dataTotal = state.list.reduce((prev, curr) => prev + curr.value, 0);
  state.list.forEach((item, idx) => {
    item.percent = item.value / dataTotal;
    item.angle = item.percent * Math.PI * 2; // 弧度制的角度
    if (idx == 0) {
      item.startAngle = 0;
      item.endAngle = item.angle;
    } else {
      item.startAngle =
        state.list[idx - 1].startAngle + state.list[idx - 1].angle;
      item.endAngle = item.startAngle + item.angle;
    }
  });
  state.option = {
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "item",
      formatter: function (params) {
        var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
        const color = state.colorEnum[params.dataIndex % 2];
        return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: imageBg,
            width: 168,
            height: 168,
          },
          left: "45",
          top: "center",
        },
        {
          type: "image",
          style: {
            image: line,
            width: 130,
            height: 1,
          },
          right: "40",
          top: "center",
        },
        {
          type: "image",
          style: {
            image: male,
            width: 40,
            height: 40,
          },
          right: "140",
          top: "51",
        },
        {
          type: "image",
          style: {
            image: female,
            width: 40,
            height: 40,
          },
          right: "140",
          top: "113",
        },
        {
          type: "circle",
          style: {
            fill: "#00172E",
          },
          shape: {
            cx: 130, // 圆心的 x 坐标
            cy: 103, // 圆心的 y 坐标
            r: 43, // 圆的半径
          },
        },
        {
          type: "text",
          left: 115, // 文本左上角的 x 坐标
          top: "center", // 文本左上角的 y 坐标
          style: {
            text: "性别\n分布", // 要显示的文本内容
            fill: "#fff", // 文本颜色
            fontSize: 16, // 字体大小
          },
        },
        {
          type: "text",
          right: "40",
          top: "65",
          style: {
            text: `${state.list[0].value}%`, // 要显示的文本内容
            fill: "#1866E5", // 文本颜色
            fontSize: 20, // 字体大小
          },
        },
        {
          type: "text",
          right: "40",
          bottom: "62",
          style: {
            text: `${state.list[1].value}%`, // 要显示的文本内容
            fill: "#F1606C", // 文本颜色
            fontSize: 20, // 字体大小
          },
        },
      ],
    },
    legend: [
      {
        data: legendData(),
        textStyle: {
          color: "#fff",
          fontSize: 20,
          lineHeight: 14,
        },
        icon: "none",
        orient: "vertical",
        top: "center",
        right: "100",
        itemWidth: 6, // 图例标记的宽度
        itemHeight: 6, // 图例标记的高度
        itemGap: 40,
      },
    ],
    series: [
      {
        type: "pie",
        select: false,
        center: ["30%", "50%"],
        radius: ["55%", "65%"],
        label: {
          show: false, // 显示标签
          fontSize: 12, // 标签字体大小
          color: "#fff",
        },
        data: setGradientColorInItemSyle(state.list, state.colorEnum),
      },
    ],
  };
};

onMounted(() => {
  init();
});
</script>
    
<style lang="scss" scoped>
.chartBox {
  margin-top: 32px;
  width: 432px;
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
    