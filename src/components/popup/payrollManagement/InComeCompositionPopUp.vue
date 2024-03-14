<template>
  <popup :width="960" :height="378" title="负责人收入组成（正、副职）" class="popup1" :showModel="props.showModel">
    <div class="box">
      <div class="left">
        <h2 style="margin-bottom: 40px">负责人年收入组成（正职）</h2>
        <CommonChart :option="state.option" :canvasWidth="392" :canvasHeight="180" :highlight="true" />
      </div>
      <div class="right">
        <h2 style="margin-bottom: 40px">负责人年收入组成（副职）</h2>
        <CommonChart :option="state.option" :canvasWidth="392" :canvasHeight="180" :highlight="true" />
      </div>
    </div>
  </popup>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from "vue";
import popup from "@components/popup/pop.vue";
import CommonChart from "@components/Chart/ComonChart.vue";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import border from "@images/payrollManagement/border-1.svg";
import border1 from "@images/payrollManagement/border-2.svg";
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
      name: "基本薪资",
      value: 50,
    },
    {
      name: "绩效薪资",
      value: 30,
    },
    {
      name: "任期激励收入",
      value: 20,
    },
  ],
  colorEnum: [
    {
      r: 24,
      g: 102,
      b: 229,
    },
    {
      r: 8,
      g: 188,
      b: 255,
    },
    {
      r: 246,
      g: 187,
      b: 59,
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
          left: "58",
          top: "64",
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
          origin: [32, 32],
        },
        {
          type: "image",
          style: {
            image: border,
            width: 170,
            height: 170,
          },
          left: "5",
          top: "10",
        },
      ],
    },
    xAxis: {
      type: "value",

      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      max: 100,
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      {
        type: "category",
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          inside: true,
          formatter: function (value, index) {
            let textStyle = index % 3 === 0 ? "b" : index % 3 === 1 ? "c" : "d";
            return `{${textStyle}|${value}}{a|%}`;
          },
          rich: {
            a: {
              fontSize: 14, // 数值的字体大小
              padding: [8, 0, 0, 5],
            },
            b: {
              color: "rgba(24,102,229,.8)",
              fontSize: 32,
              fontWeight: 600,
            },
            c: {
              color: "rgba(8,188,255,.8)",
              fontSize: 32,
              fontWeight: 600,
            },
            d: {
              color: "rgba(246,187,59,.8)",
              fontSize: 32,
              fontWeight: 600,
            },
          },
          verticalAlign: "bottom",
          // 位置 上右下左
          padding: [0, 0, 5, -40],
          lineHeight: "36",
          color: "#fff",
        },
        // 统计的总量 用纵坐标模拟
        data: state.list,
      },
    ],
    grid: {
      top: 35,
      left: "55%",
      right: "0%",
      bottom: 0,
      containLabel: true,
    },
    title: [
      {
        text: "{marker|●}基本薪资",
        textStyle: {
          color: "#fff",
          fontSize: 12,
          rich: {
            marker: {
              color: "rgb(24,102,229)",
              fontSize: 8,
              padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
            },
          },
        },
        top: "32",
        right: "110",
      },
      {
        text: "{marker|●}绩效薪资",
        textStyle: {
          color: "#fff",
          fontSize: 12,
          rich: {
            marker: {
              color: "rgb(8,188,255)",
              fontSize: 8,
              padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
            },
          },
        },
        top: "80",
        right: "110",
      },
      {
        text: "{marker|●}任期激励收入",
        textStyle: {
          color: "#fff",
          fontSize: 12,
          rich: {
            marker: {
              color: "rgb(246,187,59)",
              fontSize: 8,
              padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
            },
          },
        },
        top: "128",
        right: "86",
      },
    ],
    series: [
      {
        type: "bar",
        itemStyle: {
          color: "#37ffea",
          opacity: 0.7,
        },
        label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "right",
          offset: [-7, 0],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        showBackground: true,
        silent: true,
        barWidth: 4,
        barGap: "-100%", // Make series be overlap
        data: state.list,
      },
      {
        type: "pie",
        emphasis: {
          // 禁用鼠标移入放大效果
          scale: false,
        },
        select: false,
        center: ["89", "96"],
        radius: ["50%", "75%"],
        label: {
          show: true, // 显示标签
          position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
          formatter: "{c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
          fontSize: 12, // 标签字体大小
          color: "#fff",
          backgroundColor: {
            image: border1, // 设置背景图的 URL
          },
          width: 37,
          height: 16, // 设置背景图的高度
        },
        data: setGradientColorInItemSyle(state.list, state.colorEnum),
        labelLine: false,
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
