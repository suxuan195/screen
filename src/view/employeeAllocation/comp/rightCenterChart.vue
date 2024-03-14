<template>
  <div class="rightTopChart">
    <div class="mainTitle ttf">
      <p>职工职称人数占比</p>
    </div>
    <!-- <p class="more" @click="more">更多</p> -->
    <div class="chart">
      <my-chart :width="432" :height="206" :option="state.option" :clickA="true"
        @clickACallBack="clickCallBack"></my-chart>
    </div>
    <rightCenterDialog ref="rightCenterDialogRef" :tableHeader="state.tableHeader" />
    <!-- <RightCenterDialog ref="refRightCenterDialog" :showModel="state.showModel"></RightCenterDialog> -->
  </div>
</template>
    
<script setup>
// import RightCenterDialog from "./rightCenterDialog.vue";
import rightCenterDialog from "../dialog/rightCenterDialog.vue"
import { reactive, onMounted, onBeforeMount, onUnmounted, ref } from "vue";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import border from "@images/payrollManagement/border-1.svg";
import emitBus from "@/utils/bus";
const rightCenterDialogRef = ref(null);
const state = reactive({
  showModel: false,
  option: {},
  list: [
    {
      name: "初级",
      value: 54232,
      proportion: '58.69%'
    },
    {
      name: "中级",
      value: 32342,
      proportion: '35%'
    },
    {
      name: "高级",
      value: 25,
      value: 4890,
      proportion: '5.29%'
    },
    {
      name: "专家",
      value: 935,
      proportion: '1.01%'
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
  tableHeader: []
});
// const more = async () => {
//   state.showModel = true;
//   await nextTick();
//   refRightCenterDialog.value.init();
// };
const clickCallBack = (p) => {
  if (!p.name) return
  rightCenterDialogRef.value.showModel = true;
  state.tableHeader = [
    {
      label: '企业名称',
      prop: 'enterpriseName'
    },
    {
      label: `${p.name}人数`,
      prop: 'num'
    },
    {
      label: `${p.name}占比`,
      prop: 'proportion'
    }
  ]
}
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
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
      extraCssText: "backdrop-filter: blur(8px);",
      trigger: "item",
      formatter: function (params) {
        var tooltipContent = `${params.name} ${params.value} ${params.data.proportion}`; // 自定义tooltip内容
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
            width: 84,
            height: 84,
          },
          left: "center",
          top: "center",
          keyframeAnimation: [
            {
              // 动画时长，单位 ms
              duration: 20000,
              // 设置旋转动画是否循环
              loop: true,
              // 动画的关键帧
              keyframes: [
                {
                  // percent为关键帧的位置,0为第一个,1为最后一个
                  percent: 0,
                  easing: "linear",
                  rotation: 0,
                  transition: ["rotation"],
                },
                {
                  percent: 1,
                  easing: "linear",
                  // 旋转角度采用弧度值
                  rotation: -Math.PI * 2,
                  transition: ["rotation"],
                },
              ],
            },
          ],
          // 旋转的中心点
          origin: [42, 42],
        },
        {
          type: "image",
          style: {
            image: border,
            width: 170,
            height: 170,
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
        radius: ["55%", "65%"],
        label: {
          show: true, // 显示标签
          position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
          formatter: (params) => {
            return `{b|${params.name}}  {a${params.dataIndex}|${params.value}人  ${params.data.proportion}}`;
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
          fontSize: 12, // 标签字体大小
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
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  init();
  window.addEventListener('resize', () => init())
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
});



onUnmounted(() => {
  window.addEventListener('resize', () => null)
})

</script>
    
<style lang="scss" scoped>
.rightTopChart {
  width: 420px;
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
    