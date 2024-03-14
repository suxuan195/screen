<template>
  <div class="rightTopChart">
    <navTitle title="月度发电完成情况" :isShow='false'/>
    <ul class="bottomCard">
      <my-chart :width="430" :height="240" :option="state.option" :click-a="true" @clickACallBack="showModelClick"></my-chart>
    </ul>
    <energySecurePopUp :showModel="state.showModel" :list="originalList"/>
  </div>
</template>

<script setup>
import myChart from "@/components/Chart/myChart.vue";
import {reactive, onBeforeUnmount, onMounted, ref, onUnmounted} from 'vue'
import emitBus from '@utils/bus'
import energySecurePopUp from "@components/popup/IntelligentEnergyManagement/energySecurePopUp.vue";
import * as echarts from "echarts";
import {hexToRgb} from "@/utils";
import {useIndex} from "../hooks/index";
const {getResult2} = useIndex();

const enterpriseList = ref([])
let transformedData = reactive({})
let originalList = reactive([])
const totals = ref({});
const yAxisMax = ref(0)

const state = reactive({
  colorList: ["#F1606C", "#F6BB3B", "#1866E5"],
  showModel: false,
  option: {},
  title: ['计划发电量','实际发电量', '上网电量'],
  xData: []
})
const showModelClick = () => {
  // console.log(111)
  state.showModel = true
}

const _params = ref(null);
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
const init = () => {
  state.option = {
    grid: {
      left: "60",
      right: "30",
      top: "50",
      bottom: "40",
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
        // console.log(p,'--p');
        for (let i in p) {
          let item = p[i];
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex]
          };margin-right:6px;display:inline-block;"></span>${item.data
          } (万千瓦时)</div>`;
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
      },
    },
    legend: {
      data: legendData(),
      // data: ['实际发电量', '计划发电量', '上网电量'],
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      // right: "center",
      top: "10",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    xAxis: [
      {
        type: "category",
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
          interval: 0,
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
        name: "Wkwh",
        min: 0,
        max: yAxisMax.value,
        interval: 150000,
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
  var arr = []
  state.title.forEach((item, index) => {
    if (index == 0) {
      arr = totalsArray.value[0]
    } else if (index == 1) {
      arr = totalsArray.value[1]
    } else if (index == 2) {
      arr = totalsArray.value[2]
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

// 格式化Excel时间
const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  return new Date(utc_value * 1000);
}
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份是从0开始的
  return `${year}年${month.toString().padStart(2, '0')}月`;
}
const transformData = (list) => {
  const result = {
    year: [],
    list: {}
  };

  list.forEach((item) => {
    // 将Excel日期序列号转换为JS日期对象
    const jsDate = excelDateToJSDate(item['月份']);
    // 格式化月份为 xxxx年xx月
    const formattedMonth = formatDate(jsDate);
    // 提取年份
    const year = `${jsDate.getFullYear().toString()}/${(jsDate.getMonth()+1).toString()}`

    // 更新月份字段
    item['月份'] = formattedMonth;

    // 如果年份数组中还没有这个年份，就添加进去
    if (!result.year.includes(year)) {
      result.year.push(year);
      // 初始化总数对象
      totals.value[year] = {
        计划发电量: 0,
        实际发电量: 0,
        上网电量: 0
      };
    }
    // 为这个年份创建一个新数组，用于存放相应的数据，如果尚未创建
    if (!result.list[year]) {
      result.list[year] = [];
    }
    // 将当前项目添加到对应年份的数组中
    result.list[year].push(item);

    // 累加发电量总数
    totals.value[year].计划发电量 += parseFloat(item['计划发电量']);
    totals.value[year].实际发电量 += parseFloat(item['实际发电量']);
    totals.value[year].上网电量 += parseFloat(item['上网电量']);
  });

  // 对年份数组进行排序
  // result.year.sort((a, b) => a - b);
  // 返回处理后的数据结构
  return result;
}

const totalsArray = ref([]);
const calculateTotals = (data) => {
  const planTotals = [];
  const actualTotals = [];
  const onGridTotals = [];

  data.year.forEach((year) => {
    let yearPlanTotal = 0;
    let yearActualTotal = 0;
    let yearOnGridTotal = 0;
    data.list[year].forEach((item) => {
      yearPlanTotal += parseFloat(item['计划发电量']);
      yearActualTotal += parseFloat(item['实际发电量']);
      yearOnGridTotal += parseFloat(item['上网电量']);
    });

    // 使用 toFixed(4) 保留四位小数，并用 parseFloat 转换回数字
    planTotals.push(parseFloat(yearPlanTotal.toFixed(4)));
    actualTotals.push(parseFloat(yearActualTotal.toFixed(4)));
    onGridTotals.push(parseFloat(yearOnGridTotal.toFixed(4)));
  });

  totalsArray.value = [planTotals, actualTotals, onGridTotals];
};
const getMaxY = (arr) => {
  let max = 0;
  for (let row of arr) {
    for (let value of row) {
      if (typeof value === 'number' && value > max) {
        max = value;
      }
    }
  }

  if (max < 1000) {
    return 1000;
  } else {
    let valueStr = max.toString().split('.')[0]; // 只处理整数部分
    let firstDigit = valueStr[0];
    let secondDigit = parseInt(valueStr[1] || '0') + 1; // 如果没有第二位，默认为0
    if (secondDigit === 10) { // 如果第二位加1等于10，则需要进位
      firstDigit = parseInt(firstDigit) + 1;
      secondDigit = 0;
    }
    let newValueStr = firstDigit.toString() + secondDigit.toString() + '0'.repeat(valueStr.length - 2);
    return parseInt(newValueStr);
  }
}

onBeforeUnmount(() => {
  emitBus.off('closeModel')
})
onMounted(async () => {
  originalList = await getResult2(5)
  transformedData = transformData(originalList);
  // x轴
  state.xData = transformedData.year
  // 年总量
  calculateTotals(transformedData);
  // console.log(totalsArray.value,'totalsArray');
  yAxisMax.value = getMaxY(totalsArray.value)
  // console.log(transformedData,'transformedData')
  // console.log(yAxisMax.value,'yAxisMax')

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
  margin-top: 51px;

  .bottomCard {
    // padding: 45px 18px;
    padding: 20px 0px;
    width: 420px;
    height: 257px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;

      .bg {
        width: 72px;
        height: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        background: radial-gradient(107% 86% at 112% 0%, rgba(1, 181, 229, 0.50) 0%, rgba(0, 120, 227, 0.00) 100%);
        box-sizing: border-box;
        border: 1px solid rgba(0, 204, 255, 0.8);
        box-shadow: inset 0px 0px 10px 0px rgba(0, 204, 255, 0.5);
        margin-right: 10px;

        span {
          display: block;
          width: 40px;
          height: 40px;
          background-size: 100% 100%;
        }
      }

      .content {
        width: 105px;
        height: 72px;
        opacity: 1;
        background-image: url('@images/IntelligentEnergyManagement/能源安全事故文字背景.png');
        background-size: 100% 100%;
        box-sizing: border-box;

        .flex {
          display: flex;
          align-items: flex-end;
          padding: 10px 14px;
          cursor: pointer;
        }

        h2 {
          font-size: 28px;
          font-weight: normal;
          line-height: 28px;
          letter-spacing: 0px;
          color: #00CCFF;
        }

        .unit {
          font-size: 14px;
          font-weight: normal;
          line-height: 14px;
          text-align: center;
          letter-spacing: 0.2em;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
          padding-left: 4px;

        }

        .desc {
          margin-top: 12px;
          font-size: 14px;
          font-weight: normal;
          line-height: 14px;
          letter-spacing: 0px;
          color: #FFFFFF;
          padding-left: 18px;
          overflow: hidden;

        }
      }
    }

    li:nth-child(odd) {
      margin-right: 10px;
    }
  }
}
</style>
