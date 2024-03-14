<template>
  <div class="rightTopChart">
    <navTitle title="煤炭生产情况" :isShow='false'/>
    <div class="chart">
      <div class="date">
        <p :class="active === 0 ? 'active' : ''" @click="tabClick(0)">日</p>
        <p :class="active === 1 ? 'active' : ''" @click="tabClick(1)" class="marginLeft10">月</p>
      </div>
      <my-chart :width="420" :height="218" :option="state.option" :click-a="true" @clickACallBack="clickCallBack"></my-chart>
    </div>
    <coalListPopUp :title="popTitle" :coal-list="coalListData" :show-model="state.showModel"/>
  </div>
</template>

<script setup>
import navTitle from '@components/navTitle/navTitle.vue';
import {reactive, onMounted, ref, onBeforeMount, onUnmounted} from "vue";
import * as echarts from "echarts";
import {useIndex} from "../hooks/index";
import coalListPopUp from "@components/popup/IntelligentEnergyManagement/coalListPopUp.vue"
import emitBus from "@utils/bus.js";

const {getResult2} = useIndex();
const totals = ref({});
let transformedDate = reactive({})
let transformedMonth = reactive({})
let coalListData = reactive([])
let coalListByDate = reactive([])
let coalListByMonth = reactive([])

let yAxisMaxDate = ref(0)
let yAxisMaxMonth = ref(0)
let yAxisMax = ref(0)

let popTitle = ref('煤炭生产情况-日')

const active = ref(0)
const state = reactive({
  option: {},
  xData: [],
  title: [""],
  colorList: ["#AAFDFD"],
  showModel: false
});
const clickCallBack = async () => {
  state.showModel = true
}
const tabClick = (val) => {
  if (val === 0) {
    state.xData = transformedDate.year
    yAxisMax.value = yAxisMaxDate.value
    popTitle.value = '煤炭生产情况-日'
    coalListData = coalListByDate
    totalsArray.value = dateTotalsArray.value
  } else {
    state.xData = transformedMonth.year
    yAxisMax.value = yAxisMaxMonth.value
    popTitle.value = '煤炭生产情况-月'
    coalListData = coalListByMonth
    totalsArray.value = monthTotalsArray.value
  }

  active.value = val
  init()
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
      left: "40",
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
        max: yAxisMax.value ,
        interval: 100,
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
        name: "原煤",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: '',
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
        stack: 'Ad',
        data: totalsArray.value[0]
      },
      {
        name: "烟煤",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: '',
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
        stack: 'Ad',
        data: totalsArray.value[1]
      },
      {
        name: "商品煤",
        type: "bar",
        barWidth: 6,
        itemStyle: {
          color: '',
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
        stack: 'Ad',
        data: totalsArray.value[2]
      },
    ],
    dataZoom: {
      show: true, // 为true 滚动条出现
      realtime: true,
      type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      start: 0, // 表示默认展示20%～80%这一段。
      end: 200,
      zoomOnMouseWheel: false,
    },
  };
};
// 格式化Excel时间
const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  return new Date(utc_value * 1000);
}
const formatDate = (date, dateType) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份是从0开始的
  const d = date.getDate();
  if (dateType === '日期') {
    return `${year}年${month.toString().padStart(2, '0')}月${d}日`;
  } else {
    return `${year}年${month.toString().padStart(2, '0')}月`;
  }
}
const transformData = (list, dateType) => {
  const result = {
    year: [],
    list: {}
  };

  list.forEach((item) => {
    // 将Excel日期序列号转换为JS日期对象
    const jsDate = excelDateToJSDate(item[dateType]);
    // 格式化月份为 xxxx年xx月
    const formattedMonth = formatDate(jsDate);
    // 提取 日期\月份
    let monthDate = '';
    if (dateType === '日期') {
      monthDate = `${jsDate.getMonth() + 1}/${jsDate.getDate()}`
    } else {
      monthDate = (jsDate.getMonth() + 1).toString()
    }

    // 更新月份字段
    item[dateType] = formattedMonth;

    // 如果年份数组中还没有这个年份，就添加进去
    if (!result.year.includes(monthDate)) {
      result.year.push(monthDate);
      // 初始化总数对象
      totals.value[monthDate] = {
        原煤: 0,
        烟煤: 0,
        商品煤: 0
      };
    }
    // 为这个年份创建一个新数组，用于存放相应的数据，如果尚未创建
    if (!result.list[monthDate]) {
      result.list[monthDate] = [];
    }
    // 将当前项目添加到对应年份的数组中
    result.list[monthDate].push(item);

    // 累加发电量总数
    totals.value[monthDate].原煤 += parseFloat(item['原煤']);
    totals.value[monthDate].烟煤 += parseFloat(item['烟煤']);
    totals.value[monthDate].商品煤 += parseFloat(item['商品煤']);
  });

  // 对年份数组进行排序
  result.year.sort((a, b) => a - b);

  // 返回处理后的数据结构
  return result;
}
const totalsArray = ref([]); //总数
const dateTotalsArray = ref([]); //日总数
const monthTotalsArray = ref([]); //月总数

const calculateTotals = (data, dateType) => {
  const planTotals = [];
  const actualTotals = [];
  const onGridTotals = [];

  data.year.forEach((year) => {
    let yearPlanTotal = 0;
    let yearActualTotal = 0;
    let yearOnGridTotal = 0;

    data.list[year].forEach((item) => {
      yearPlanTotal += parseFloat(item['原煤']);
      yearActualTotal += parseFloat(item['烟煤']);
      yearOnGridTotal += parseFloat(item['商品煤']);
    });

    // 使用 toFixed(4) 保留四位小数，并用 parseFloat 转换回数字
    planTotals.push(parseFloat(yearPlanTotal.toFixed(4)));
    actualTotals.push(parseFloat(yearActualTotal.toFixed(4)));
    onGridTotals.push(parseFloat(yearOnGridTotal.toFixed(4)));
  });
  if (dateType === '日期') {
    dateTotalsArray.value = [planTotals, actualTotals, onGridTotals];
  } else {
    monthTotalsArray.value = [planTotals, actualTotals, onGridTotals];
  }
};
const getMaxY = (arr) =>{
  let max = 0;
  // 假设所有内层数组长度相同，获取列数
  let columnCount = arr[0].length;

  // 遍历每一列
  for (let col = 0; col < columnCount; col++) {
    let columnSum = 0;
    // 遍历每一行来累加当前列的值的整数部分
    for (let row = 0; row < arr.length; row++) {
      columnSum += Math.floor(arr[row][col]);
    }
    // 更新最大和
    max = Math.max(max, columnSum);
  }

  if (max < 100) {
    return 100;
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
onMounted(async () => {
  // 获取 日和月的数据
  coalListByDate = await getResult2(2)
  coalListByMonth = await getResult2(3)
  // console.log(coalListByDate, coalListByMonth, 'coalList')

  // 获取 日期和月份的格式化数据
  transformedDate = transformData(coalListByDate, '日期');
  // console.log(transformedDate, 'transformedDate')
  transformedMonth = transformData(coalListByMonth, '月份');
  // console.log(transformedMonth, 'transformedMonth')

  // 获取各自的总数
  calculateTotals(transformedDate,'日期');
  calculateTotals(transformedMonth,'月份');
  console.log(monthTotalsArray.value,dateTotalsArray.value,'monthTotalsArray')
  // 初始化日期的数据
  totalsArray.value = dateTotalsArray.value
  // console.log(totalsArray.value,'totalsArray')

  // 获取最大值
  yAxisMaxDate.value = getMaxY(dateTotalsArray.value)
  yAxisMaxMonth.value = getMaxY(monthTotalsArray.value)
  // console.log(yAxisMaxDate.value,yAxisMaxMonth.value)
  // 初始化日期的参考线
  yAxisMax.value = yAxisMaxDate.value
  init();
  tabClick(0)

  window.addEventListener('resize', () => init())
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
  onUnmounted(() => {
    window.addEventListener('resize', () => null)
  })
});
</script>

<style lang="scss" scoped>
.rightTopChart {
  .chart {
    width: 420px;
    height: 257px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    padding: 20px 10px;
    box-sizing: border-box;

    .date {
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0em;
      color: #FFFFFF;
      display: flex;
      justify-content: flex-end;

      .marginLeft10 {
        margin-left: 10px;
      }

      p {
        width: 30px;
        height: 18px;
        cursor: pointer;
      }

      .active {
        border-radius: 15px;
        opacity: 1;
        background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
        border-image: linear-gradient(360deg, #166CFF -3%, rgba(209, 226, 255, 0.87) 9%, rgba(129, 206, 255, 0.76) 99%) 1;
      }
    }
  }
}
</style>
