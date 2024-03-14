<template>
  <div class="leftTopChart">
    <navTitle title="年度发电完成情况"/>
    <div class="chart">
      <my-chart :width="420" :height="257" :option="state.option" :highlight="true" :length="5"
                :click-a="true"  @clickACallBack="clickCallBack"></my-chart>
    </div>
  </div>
  <monthGenerationPopUp :showModel="state.showModel" :enterpriseList="enterpriseList"/>
</template>

<script setup>
import navTitle from '@components/navTitle/navTitle.vue';
import {reactive, onMounted, onBeforeMount, onUnmounted, ref, computed} from "vue";
import * as echarts from "echarts";
import { useIndex } from "../hooks/index";
import MonthGenerationPopUp from "@components/popup/IntelligentEnergyManagement/monthGenerationPopUp.vue";
import emitBus from "@utils/bus.js";
const { getResult2 } = useIndex();
const totals = ref({});
const yAxisMax = ref(0)
const state = reactive({
  option: {},
  xData:[],
  title: [""],
  colorList: ["#AAFDFD"],
  showModel:false
});
const enterpriseList = ref([])
const clickCallBack = async (p) => {
  // console.log(p)
  state.showModel = true
  enterpriseList.value =  transformedData.list[p.name]
}
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
      left: "90",
      right: "45",
      top: "40",
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
    },
    legend: {
      data: legendData(),
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      left: "center",
      top: "20",
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
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
        type: "category",
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisPointer: {
          type: "shadow",
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
        name: "单位(吨)",
        min: 0,
        max:  yAxisMax.value,
        interval: 1000000,
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
    series: [
      {
        name: "计划发电量",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#FAEDD0'},   // 渐变色的起始颜色
            {offset: 0.5, color: '#EBAC23'}, // 渐变色的中间颜色
            {offset: 1, color: 'rgba(235,172,35,0.00)'},   // 渐变色的结束颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%", label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "top",
          offset: [0, 7],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        data:totalsArray.value[0]
      },
      {
        name: "实际发电量",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#d9ecff'},   // 渐变色的起始颜色
            {offset: 0.5, color: '#79bbff'}, // 渐变色的中间颜色
            {offset: 1, color: 'rgba(235,172,35,0.00)'},   // 渐变色的结束颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%", label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "top",
          offset: [0, 7],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        data:totalsArray.value[1]
      },
      {
        name: "上网电量",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#e1f3d8'},   // 渐变色的起始颜色
            {offset: 0.5, color: '#67c23a'}, // 渐变色的中间颜色
            {offset: 1, color: 'rgba(235,172,35,0.00)'},   // 渐变色的结束颜色
          ]),
          borderRadius: [3, 3, 0, 0],
        },
        barGap: "60%", label: {
          show: true,
          formatter: "",
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          position: "top",
          offset: [0, 7],
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 4,
          shadowColor: "#fff",
          shadowBlur: 16,
        },
        data:totalsArray.value[2]
      },
    ],
  };
  // state.option.series.forEach((item) => {
  //   item.data = [];
  //   for (let i = 0; i < 7; i++) {
  //     let randomNum = Math.floor(Math.random() * 1201);
  //     item.data.push(randomNum);
  //   }
  // });
  // 确保x轴标签都显示
  state.option.xAxis[0].axisLabel.interval = 0;
  // console.log(state.option.series,'state.option.series')
};
// 格式化Excel时间
const excelDateToJSDate = (serial)  => {
  const utc_days  = Math.floor(serial - 25569);
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
    const year = jsDate.getFullYear().toString();

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
  result.year.sort((a, b) => a - b);

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
const getMaxY = (arr) =>{
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
onBeforeMount(() => {
  emitBus.off('closeModel')
})
let transformedData =reactive({})
onMounted(async () => {
  const originalList = await getResult2(4)
  transformedData = transformData(originalList);
  // x轴
  state.xData = transformedData.year
  // 年总量
  calculateTotals(transformedData);
  // console.log(totalsArray.value);
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
.chart {
  width: 420px;
  height: 257px;
  background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
  background-size: 100% 100%;
}
</style>
