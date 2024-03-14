<template>
  <popup :width="1320" :height="518" title="企业1-经济运行质量效益季度评价" :showModel="props.showModel">
    <div class="box">
      <left-nav-list :list="state.companyList" height="380px" maxHeight="380px" @itemClick="itemClick" />
      <div class="right_chart">
        <CommonChart :option="state.option" :canvasWidth="1100" :canvasHeight="400" :highlight="true" />
      </div>
    </div>
  </popup>
</template>

<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import { reactive, onMounted } from "vue";
import CommonChart from "@components/Chart/ComonChart.vue";
import popup from "@components/popup/pop.vue";
import leftNavList from '@components/leftNavList/leftNavList.vue'
const state = reactive({
  option: {},
  colorList: ["#3C97F1", "#EBAC23", "#0BE6E6"],
  title: ["经济效益评价", "成本管理评价", "稳增长目标完成评价"],
  xData: ["一月", "四月", "七月", "十月"],
  companyList: [
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    },
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
    ,
    {
      title: '中国平安保险股份有限公司'
    }
  ]
});
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
const itemClick = (index) => {
  console.log(index);
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
      right: "10",
      top: "41",
      bottom: "20",
    },
    tooltip: {
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
      x: "right",
      orient: "horizontal",
      top: "0",
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
    let arr = [];
    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * 21);
      arr.push(randomNum);
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
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  /*定义滚动条整体样式*/
  width: 2px;
  border-radius: 2px;
  opacity: 1;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  /*定义滚动条内部样式*/
  background: #d8d8d8;
  border-radius: 2px;
  /*圆角程度*/
}

.box {
  padding-top: 36px;
  padding-left: 24px;
  display: flex;

  .el-scrollbar {
    border-radius: 10px;
    border: 1px solid #4cb3f3;
    width: 140px;
    box-sizing: border-box;
    padding: 10px 0;


    li {
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #9e9e9e;
      width: 100%;
      padding-left: 12px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;

      &:hover {
        background: #008cff;
        color: #ffffff;

        &::before {
          position: absolute;
          z-index: 100;
          content: "";
          width: 3px;
          height: 32px;
          opacity: 1;
          left: 0px;
          background: linear-gradient(180deg, #ffffff 0%, #008cff 100%);
        }
      }
    }
  }

  .right_chart {
    margin-left: 24px;
  }
}
</style>
