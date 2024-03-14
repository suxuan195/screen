<template>
  <div class="leftBottomChart">
    <navTitle title="各厂站发电量排名" @showModelClick="showModelClick" :isShow="true"/>
    <div class="chart">
      <my-chart :width="400" :height="240" :option="state.option"></my-chart>
    </div>
    <everyFactoryStationPopUp :showModel="state.showModel" :list="state.list"/>
  </div>
</template>

<script setup>
import navTitle from '@components/navTitle/navTitle.vue';
import {reactive, onMounted, onBeforeMount} from 'vue'
import everyFactoryStationPopUp from '@components/popup/IntelligentEnergyManagement/everyFactoryStationPopUp.vue'
import * as echarts from "echarts";
import {hexToRgb} from "@/utils";
import emitBus from "@utils/bus";
import {useIndex} from "../hooks/index";

const {getResult2} = useIndex();
const state = reactive({
  showModel: false,
  option: {},
  list: [],
  xData: [],
  dataList: [],
  colorList1: ["#1866E5", "#6BDAFF", "#F6BB3B", "#E555F2"],
})
const showModelClick = () => {
  state.showModel = true
}
onBeforeMount(() => {
  emitBus.off('closeModel')
})
const init = () => {
  state.option = {
    grid: {
      left: "0",
      right: "0",
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
      formatter: function (p) {
        // _params.value = p;
        let str = "";
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList1[item.seriesIndex % 4]
          };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      },
    },
    toolbox: {
      show: false,
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ["line", "bar"]},
        restore: {show: true},
        saveAsImage: {show: true},
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
        data: state.xData,
        axisLabel: {
          formatter: function (value, index) {
            return `${index + 1}、${value}`;
          },
          // rich: {
          //     a0: {
          //         width: 30,
          //         color: state.colorList1[0],
          //         borderRadius: 3,
          //         backgroundColor: hexToRgb(state.colorList1[0], 0.3),
          //         padding: 2,
          //     },
          //     a1: {
          //         width: 30,
          //         color: state.colorList1[1],
          //         borderRadius: 3,
          //         backgroundColor: hexToRgb(state.colorList1[1], 0.3),
          //         padding: [2, 4],
          //     },
          //     a2: {
          //         width: 30,
          //         color: state.colorList1[2],
          //         borderRadius: 3,
          //         padding: 2,
          //         backgroundColor: hexToRgb(state.colorList1[2], 0.3),
          //     },
          //     b0: {
          //         color: state.colorList1[0],
          //     },
          //     b1: {
          //         color: state.colorList1[1],
          //     },
          //     b2: {
          //         color: state.colorList1[2],
          //     },
          // },
          color: "#fff",
          fontSize: 16,
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
        offset: -10,
        axisLabel: {
          fontSize: 16,
          verticalAlign: "top",
          align: "right",
          padding: [-22, 0, 0, 0],
          formatter: function (value, index) {
            return `{a|${value} }`;
          },
          rich: {
            a: {
              color: state.colorList1[0],
              fontSize: 16
            },
            c: {
              color: '#fff',
              fontSize: 12
            }
          },
        },
        data: state.dataList,
      },
    ],
    series: [
      {
        name: "企业户数",
        type: "bar",
        barWidth: 4,
        itemStyle: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {offset: 0, color: '#1866E5'}, // 渐变起始颜色
              {
                offset: 1,
                color: hexToRgb('#1866E5', 0),
              }, // 渐变终止颜色
            ]);
          },
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "80%",
        label: {
          show: true,
          backgroundColor: "#fff",
          width: 4,
          height: 4,
          formatter: '',
          position: "right",
          offset: [-7, 0],
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 2,
          shadowColor: "#fff",
          shadowBlur: 6,
        },
        data: state.dataList,
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
};
onMounted(async () => {
  const res = await getResult2(1)
  // console.log(res, 'res')
  state.list = res

  for (let i = 0; i <= 5; i++) {
    state.xData.push(res[i]['企业名称'])
    state.dataList.push(res[i]['发电量'])
  }
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
  init()
});
</script>

<style lang="scss" scoped>
.leftBottomChart {
  margin-top: 54px;

  .chart {
    width: 420px;
    height: 257px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    padding: 23px 10px 17px;
    box-sizing: border-box;


    ul {
      li {
        margin-bottom: 10px;

        .top {
          display: flex;
          justify-content: space-between;

          h2 {
            font-size: 12px;
            font-weight: normal;
            line-height: 16px;
            letter-spacing: 0em;
            color: #FFFFFF;
          }

          p {
            font-size: 18px;
            font-weight: normal;
            line-height: 22px;
            text-align: right;
            display: flex;
            align-items: center;
            letter-spacing: 0px;
            color: #1866E5;
          }
        }

        .progress {
          margin-top: 9px;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: 0;

          }

          .circle {
            position: relative;
            height: 6px;
            background: linear-gradient(90deg, rgba(60, 151, 241, 0.00) 0%, #3C97F1 65%, #ACCFF1 100%);

            &::before {
              content: '';
              width: 10px;
              position: absolute;
              top: -2px;
              right: 0;
              left: 100%;
              height: 10px;
              line-height: 10px;
              box-sizing: border-box;
              border: 1px solid rgba(255, 255, 255, 0.5);
              border-radius: 50%;
              box-shadow: 0px 0px 4px 0px #00D5FF;
            }

            &::after {
              content: '';
              position: absolute;
              left: 100%;
              box-sizing: border-box;
              margin: 0px 2px;
              width: 6px;
              height: 6px;
              background: #FFFFFF;
              border-radius: 50%;
            }

          }
        }
      }
    }
  }
}

/* 修改滚动条的样式 */
::-webkit-scrollbar {
  width: 0;
  /* 设置滚动条的宽度 */
}

// /* 设置滚动条的滑块样式 */
// ::-webkit-scrollbar-thumb {
//     background-color: rgba(255, 255, 255, 0.08);
//     ;
//     /* 设置滑块的背景颜色 */
//     border-radius: 4px;
//     /* 设置滑块的圆角 */
// }


// /* 设置滚动条的轨道样式 */
// ::-webkit-scrollbar-track {
//     background-color: transparent;
//     /* 设置轨道的背景颜色 */
// }
</style>
