<template>
  <Popup :width="896" :height="375" :showModel="showModel" title="人数趋势" class="popup1">
    <div>
      <div class="title">行业人数趋势TOP10</div>
      <div class="main">
        <div class="chart" v-for="(item, index) in state.option" :key="index">
          <my-chart :option="item" :width="400" :height="223"></my-chart>
        </div>
      </div>
    </div>
  </Popup>
</template>
    
<script setup>
import Popup from "@/components/popup/pop.vue";
import { reactive } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  option: [],
  xData: [
    ["1、制造业", "2、建筑业", "3、金融业", "4、批发零售", "5、医疗卫生"],
    ["6、住宿旅游", "7、房地产", "8、交通", "9、教育", "10、畜牧业"],
  ],
  mainColor: "#EBAC23",
});

const init = () => {
  let arr = [4320, 3290, 1302, 1292, 1237, 1507, 645, 678, 532, 432];
  // for (let i = 0; i < 10; i++) {
  //   let randomNum = Math.floor(Math.random() * 100);
  //   arr.push(randomNum);
  // }
  arr.sort((a, b) => b - a);
  arr = [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
  state.xData.forEach((item, index) => {
    state.option[index] = {
      grid: {
        left: "20",
        right: "20",
        top: "0",
        bottom: "0",
      },
      tooltip: {
        backgroundColor: "rgba(255,255,255,.1)",
        textStyle: {
          color: "#fff", // 设置文本颜色，可根据需要调整
        },
        borderColor: "transparent",
        extraCssText: "backdrop-filter: blur(8px);",
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          splitLine: {
            show: false,
          },
          type: "value",
          show: false,
          axisPointer: {
            show: false, // 隐藏十字指示器
            type: "line", // 设置指示器样式
          },
        },
      ],
      yAxis: [
        {
          inside: true,
          splitLine: {
            show: false,
          },
          axisLine: {
            //y轴
            show: false,
          },
          type: "category",
          axisTick: {
            show: false,
          },
          offset: -10,
          inverse: true,
          data: item,
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            show: true,
            verticalAlign: "top",
            align: "left",
            padding: [-22, 0, 0, 0],
          },
        },
        {
          type: "category",
          inverse: true,
          axisTick: "none",
          axisLine: "none",
          show: true,
          offset: -30,
          axisLabel: {
            formatter: "{value} {a|人}",
            rich: {
              a: {
                color: "#fff",
              },
            },
            color: state.mainColor,
            fontSize: "14",
            verticalAlign: "top",
            align: "right",
            padding: [-22, 0, 0, 0],
          },
          data: arr[index],
        },
      ],
      series: [
        {
          name: "行业人数趋势",
          type: "bar",
          barWidth: 4,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: state.mainColor }, // 渐变起始颜色
              { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
            ]),
            borderRadius: [3, 3, 0, 0],
          },
          barGap: "60%",
          label: {
            show: true,
            formatter: "",
            backgroundColor: "#fff",
            width: 4,
            height: 4,
            position: "right",
            offset: [-7, 0],
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.2)",
            borderRadius: 2,
            shadowColor: "#fff",
            shadowBlur: 6,
          },
          data: arr[index],
        },
        {
          type: "bar",
          barWidth: 4,
          itemStyle: {
            color: "rgba(60,151,241,.1)",
          },
          data: [100, 100, 100, 100, 100, 100, 100, 100],
          barGap: "-100%",
          tooltip: {
            show: false,
          },
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
.title {
  font-size: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #36b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 24px;
}

.main {
  display: flex;
  justify-content: space-between;

  .chart {}
}
</style>