<template>
  <popup :width="960" :height="378" title="负责人收入水平（正、副职）" class="popup1" :showModel="props.showModel">
    <div class="box">
      <div class="left">
        <h2 style="margin-bottom: 40px" class="ttf">
          负责人年收入水平（正职）
        </h2>
        <CommonChart :option="state.option" :canvasWidth="392" :canvasHeight="180" :highlight="true" />
      </div>
      <div class="right">
        <h2 style="margin-bottom: 40px" class="ttf">
          负责人年收入水平（副职）
        </h2>
        <CommonChart :option="state.option" :canvasWidth="392" :canvasHeight="180" :highlight="true" />
      </div>
    </div>
  </popup>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
import CommonChart from "@components/Chart/ComonChart.vue";
import popup from "@components/popup/pop.vue";
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  option: {},
  list: [
    {
      name: "10K以下",
      value: 20,
    },
    {
      name: "10K-12K",
      value: 20,
    },
    {
      name: "15K-20K",
      value: 20,
    },
    {
      name: "25K-30K",
      value: 20,
    },
    {
      name: "30K以上",
      value: 20,
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
    const color = colorlist[i];
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
      trigger: "item",
      formatter: function (params) {
        var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
        const color = state.colorEnum[params.dataIndex];
        return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: centerImg,
            width: 64,
            height: 64,
          },
          left: "center",
          top: "66",
        },
      ],
    },
    series: [
      {
        type: "pie",
        select: false,
        center: ["50%", "55%"],
        radius: ["65%", "75%"],
        label: {
          show: true, // 显示标签
          position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
          formatter: "{b}  {c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
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
  window.addEventListener('resize', () => init())
});

onUnmounted(() => {
  window.addEventListener('resize', () => null)
})

</script>

<style lang="scss" scoped>
.popup1 {
  .box {
    display: flex;
    margin-top: 40px;

    .left,
    .right {
      padding-left: 32px;
      width: 50%;

      h2 {
        margin: 0;
        font-family: Source Han Sans CN;
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
        letter-spacing: 0em;
        background: linear-gradient(180deg, #ffffff 0%, #36b1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
  }
}
</style>
