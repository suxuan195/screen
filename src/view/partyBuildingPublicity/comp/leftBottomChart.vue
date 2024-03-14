<template>
  <div class="rightTopChart">
    <div class="mainTitle  title">
      <p class="ttf">党组织统计</p>
      <!-- <div class="more" @click="moreClick">更多</div> -->
    </div>
    <div class="chart">
      <my-chart :width="420" :height="382" :option="state.option" :highlight="true" :length="5"></my-chart>
    </div>
    <partyOrganizationStatistics :showModel="showModel"></partyOrganizationStatistics>
  </div>
</template>

<script setup>
import partyOrganizationStatistics from "./partyOrganizationStatistics.vue"
import { reactive, onMounted, ref, onBeforeMount, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
import emitBus from "@/utils/bus.js";
const state = reactive({
  option: {},
  list: [
    {
      name: "一级党委",
      value: 28,
    },
    {
      name: "党总支",
      value: 97,
    },
    {
      name: "党支部",
      value: 3420,
    },
    {
      name: "一级以下党委",
      value: 439,
    },
  ],
  colorEnum: [
    {
      r: 241,
      g: 96,
      b: 108,
    },
    {
      r: 38,
      g: 194,
      b: 150,
    },
    {
      r: 24,
      g: 102,
      b: 229,
    },
    {
      r: 246,
      g: 187,
      b: 59,
    },
    {
      r: 72,
      g: 214,
      b: 255,
    },
    {
      r: 38,
      g: 194,
      b: 150,
    },
  ],
});
let title = "党组织总数";
let formatNumber = function (num) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
let total = state.list.reduce((a, b) => {
  return a + b.value * 1;
}, 0);
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
    title: {
      text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          name: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#fff",
            padding: [10, 0],
          },
          val: {
            fontSize: 32,
            fontWeight: "bold",
            color: "rgba(57, 200, 253)",
          },
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "item",
      formatter: function (params) {
        var tooltipContent = `${params.name} ${params.value}`; // 自定义tooltip内容
        const color = state.colorEnum[params.dataIndex % 6];
        return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: centerImg,
            width: 120,
            height: 120,
          },
          left: "center",
          top: "center",
        },
      ],
    },
    series: [
      {
        type: "pie",
        select: false,
        center: ["50%", "50%"],
        radius: ["50%", "60%"],
        label: {
          show: true, // 显示标签
          position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
          formatter: (params) => {
            return `{a${params.dataIndex}|${params.value}}  {b|${params.name}}`;
          }, // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
          rich: {
            // a0: {
            //   color: `rgb(${state.colorEnum[0].r},${state.colorEnum[0].g},${state.colorEnum[0].b})`,
            // },
            // a1: {
            //   color: `rgb(${state.colorEnum[1].r},${state.colorEnum[1].g},${state.colorEnum[1].b})`,
            // },
            // a2: {
            //   color: `rgb(${state.colorEnum[2].r},${state.colorEnum[2].g},${state.colorEnum[2].b})`,
            // },
            // a3: {
            //   color: `rgb(${state.colorEnum[3].r},${state.colorEnum[3].g},${state.colorEnum[3].b})`,
            // },
            // a4: {
            //   color: `rgb(${state.colorEnum[4].r},${state.colorEnum[4].g},${state.colorEnum[4].b})`,
            // },
            // a5: {
            //   color: `rgb(${state.colorEnum[5].r},${state.colorEnum[5].g},${state.colorEnum[5].b})`,
            // },
          },
          fontSize: 16, // 标签字体大小
          color: "#fff",
        },
        data: setGradientColorInItemSyle(state.list, state.colorEnum),
      },
    ],
  };
  state.colorEnum.forEach((item, index) => {
    state.option.series[0].label.rich[`a${index}`] = {};
    state.option.series[0].label.rich[
      `a${index}`
    ].color = `rgb(${item.r},${item.g},${item.b})`;
  });
};
const showModel = ref(false);

const moreClick = () => {
  showModel.value = true;
}
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  init();
  window.addEventListener('resize', () => init())
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});

onUnmounted(() => {
  window.addEventListener('resize', () => null)
})

</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;
}

.rightTopChart {
  width: 420px;
  height: 442px;

  //margin-bottom: 50px;
  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  }
}

.more {
  font-size: 16px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: rgba(214, 239, 255, 0.6);
  cursor: pointer;

  &:hover {
    color: rgba(214, 239, 255, 1);
  }
}
</style>

