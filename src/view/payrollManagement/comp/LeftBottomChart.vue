<template>
  <Chart :title="title" :option="state.option" :more="true" :tag="`leftBottomChart`" @moreClick="moreClick" :click="true" :params="_params" 
  @clickCallBack="clickACallBack" ></Chart>
  <SalaryStatusPopUp :showModel="showModel" />
  <LeftBottomDialog :tableColumns="state.tableColumns" :tableData="state.tableData"   :showModel="showModels" :month="state.month"/>
</template>

<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import emitBus from "@utils/bus";
import Chart from "@/components/Chart/Chart.vue";
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import SalaryStatusPopUp from "@components/popup/payrollManagement/SalaryStatusPopUp.vue";
import LeftBottomDialog from "@/components/popup/payrollManagement/LeftBottomDialog.vue";
const title = ref("经济运行质量效益评分情况趋势");
const _params = ref(null);
const state = reactive({
  month:'',
  option: {},
  colorList: ["#3C97F1", "#EBAC23", "#0BE6E6"],
  title: ["经济效益评价", "成本管理评价", "稳增长目标完成评价"],
  xData: ["一月", "四月", "七月", "十月"],
});

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
const showModels=ref(false)
//点击柱状图线段
const clickACallBack = (params) => {
  // console.log(params.axisValue);
  state.month=params.axisValue
  showModels.value=true
};


const init = () => {
  state.option = {
    grid: {
      left: "40",
      right: "180",
      top: "41",
      bottom: "20",
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
        _params.value = p;
        let str = "";
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex % 1]
            };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      
      },
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      orient: "vertical",
      right: "0",
      bottom: "center",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    xAxis: [
      {
        type: "category",
        data: state.xData,
        boundaryGap: false,
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
        axisLine: {
          // 设置x轴的颜色
          lineStyle: {
            color: "#4CB3F3",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 20,
        interval: 5,
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
          color: "#fff",
          fontSize: 12,
        },
        nameTextStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
    ],
    series: [],
  };
  state.option.series = [];
  state.title.forEach((item, index) => {
    var arr = [];
    // for (let i = 0; i < 4; i++) {
    //   let randomNum = Math.floor(Math.random() * 21);
    //   arr.push(randomNum);
    // }
    if(index==0){
      arr=["6","7","7","8"]
    }
    else if(index==1){
      arr=["1","2","1","2"]
    }else if(index==2){
      arr=["1","1","2","1"]
    }
    state.option.series.push({
      name: item,
      type: "line",
      smooth: true,
      lineStyle: {
        color: state.colorList[index],
      },
      symbol: "circle", // 圆点的形状
      symbolSize: 6, // 圆点的大小
      itemStyle: {
        color: state.colorList[index], // 圆点的颜色
        shadowColor: "#fff", // 阴影颜色
        shadowBlur: 4, // 阴影模糊程度
      },
      emphasis: {
        itemStyle: {
          borderColor: "#fff", // 圆点边框颜色
          borderWidth: 2, // 圆点边框宽度
        },
      },
      data: arr,
      areaStyle: {
        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: hexToRgb(state.colorList[index], 0.3),
            },
            {
              offset: 1,
              color: hexToRgb(state.colorList[index], 0),
            },
          ],
          false
        ),
        shadowColor: hexToRgb(state.colorList[index], 0.9), //阴影颜色
        shadowBlur: 20,
      },
    });
  });
};
const showModel = ref(false);
//点击更多事件
const moreClick = () => {
  showModel.value = true;
};
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  init();
  emitBus.on("closeModel", () => {
    showModel.value = false;
    showModels.value=false
  });
});
</script>
<style lang="scss" scoped></style>
