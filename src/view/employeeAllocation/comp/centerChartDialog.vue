<template>
  <Popup :width="798" :height="510" :showModel="showModel" title="养老保险缴纳" class="popup1">
    <div>
      <div class="top">
        <div class="list">
          <ul>
            <li class="item" v-for="(item, index) in state.tList" :key="index">
              <p class="value">{{ item.value }}</p>
              <p class="text">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="buttom">
        <div class="chart" v-for="(item, index) in state.option" :key="index">
          <div class="title">{{ state.chartTitle[index] }}</div>
          <my-chart :option="item" :width="367" :height="208"></my-chart>
        </div>
      </div>
    </div>
  </Popup>
</template>
  
<script setup>
import Popup from "@/components/popup/pop.vue";
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  chartTitle: ["企业缴费比例", "企业缴费比例"],
  tList: [
    {
      value: 13365,
      text: "2023年企业总缴费(人)",
    },
    {
      value: 3200,
      text: "2023年个人总缴费(万)",
    },
    {
      value: 5300,
      text: "2023年参保总人数(人)",
    },
  ],
  option: [],
  list: [
    [
      {
        name: "10%",
        value: 25,
      },
      {
        name: "10%-12%",
        value: 10,
      },
      {
        name: "12%-15%",
        value: 10,
      },
      {
        name: "15%-17%",
        value: 25,
      },
      {
        name: "18%-20%",
        value: 25,
      },
    ],
    [
      {
        name: "未参保",
        value: 25,
      },
      {
        name: "已参保",
        value: 75,
      },
    ],
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

onMounted(() => {
  // init();
  window.addEventListener('resize', () => init())
});

onUnmounted(() => {
  window.addEventListener('resize', () => null)
})
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
    const color = colorlist[i % 5];
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
  state.list.forEach((obj, index) => {
    const dataTotal = obj.reduce((prev, curr) => prev + curr.value, 0);
    obj.forEach((item, idx) => {
      item.percent = item.value / dataTotal;
      item.angle = item.percent * Math.PI * 2; // 弧度制的角度
      if (idx == 0) {
        item.startAngle = 0;
        item.endAngle = item.angle;
      } else {
        item.startAngle = obj[idx - 1].startAngle + obj[idx - 1].angle;
        item.endAngle = item.startAngle + item.angle;
      }
    });

    state.option[index] = {
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
          const color = state.colorEnum[params.dataIndex % 5];
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
            top: "72",
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
            formatter: "{b}  {c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
            fontSize: 12, // 标签字体大小
            color: "#fff",
          },
          data: setGradientColorInItemSyle(obj, state.colorEnum),
        },
      ],
    };
  });
};

defineExpose({
  init,
});
</script>
  
<style lang="scss" scoped>
.buttom {
  padding: 0 32px;
  display: flex;
  justify-content: space-between;

  .chart {
    .title {
      font-size: 18px;
      background: linear-gradient(180deg, #ffffff 0%, #36b1ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.top {
  .list {
    width: 100%;
    color: #fff;
    font-size: 12px;
    padding: 30px 80px;
    box-sizing: border-box;

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      li.item {
        background: url("@images/payrollManagement/base.png") 0% 0% / 100% 100% no-repeat;
        list-style: none;
        width: 186px;
        height: 142px;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.44px;
        color: #ffffff;

        p {
          margin: 0;
        }

        .value {
          font-size: 32px;
          font-weight: normal;
          line-height: 40px;
          color: #00ccff;
          letter-spacing: 0;
          margin-bottom: 8px;
        }

        .text {
          margin-bottom: 61px;
        }
      }
    }
  }
}
</style>