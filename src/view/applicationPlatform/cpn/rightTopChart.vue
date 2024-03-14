<template>
    <div class="rightTopChart">
       <navTitle title="平台数据总量" />
        <div class="chart">
            <div class="date">
                <p :class="active === 0 ? 'active' : ''" @click="tabClick(0)">日</p>
                <p :class="active === 1 ? 'active' : ''" @click="tabClick(1)" class="marginLeft10">月</p>
            </div>
            <my-chart :width="1050" :height="230" :option="state.option" :click="true" :params="_params" 
         @clickCallBack="clickACallBack" ></my-chart>
         <!-- <applicationTable :tableColumns="state.columns" :tableData="state.data" :showModel="showModel" @close-dialog="closeDialog"></applicationTable> -->
         <applicationPlatformList  title="平台数据总量" :showModel="showModel"  :tableData="state.tableData" :options="state.options" @close-dialog="closeDialog"></applicationPlatformList>
        
        </div>
    </div>
</template>
<script setup>
import applicationPlatformList from "./applicationPlatformList.vue"
import myChart from "@/components/Chart/myChart.vue";
import { hexToRgb } from "@/utils";
import navTitle from "@components/navTitle/navTitle.vue";
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
const active = ref(0)
const _params = ref(null);
const state = reactive({
    option: {},
    title: [""],
    colorList: ["#1866E5"],
    // xData: ['1日','3日', '5日', '7日', '13日','15日', ],
    xData: ['2023/5/13','2023/6/13','2023/7/13','2023/8/13', '2023/9/13', '2023/10/13', '2023/11/13', ],
    // columns: [
    //     { label: '用户名', prop: 'name' },
    //     { label: '登录时间', prop: 'age' },
    //     { label: '登出时间', prop: 'time' },
    //   ],
    //   data: [
    //     { name: 'John Doe', age: 30,time:'' },
    //     { name: 'Jane Doe', age: 25 ,time:''},    
    // ],
    options: [
        { prop: "department", label: "系统名称", },
        { prop: "totalUsage", label: "数据量", },
    ],
    tableData: [
        {
            "department": "企业基本信息管理系统",
            "totalUsage": "3654"
        },
        {
            "department": "国资数据资源中心",
            "totalUsage": "1207"
        },
        {
            "department": "国企改革在线监督",
            "totalUsage": "5621"
        },
        {
            "department": "大额资金动态监控",
            "totalUsage": "4115"
        },
        {
            "department": "财务监督管理",
            "totalUsage": "3215"
        },
        {
            "department": "“三重一大”决策和运行监管系统",
            "totalUsage": "3356"
        },
        {
            "department": "企业经济运行分析系统",
            "totalUsage": "2365"
        },
        {
            "department": "产权综合管理系统",
            "totalUsage": "3214"
        },
        {
            "department": "对外经济合作管理系统",
            "totalUsage": "1987"
        },
        {
            "department": "党建管理系统",
            "totalUsage": "1006"
        },
        {
            "department": "监管信息报送平台",
            "totalUsage": "3621"
        },
        {
            "department": "能源企业生产数据管理系统",
            "totalUsage": "3856"
        },
        {
            "department": "企业领导人员管理系统、",
            "totalUsage": "956"
        },
        {
            "department": "企业监督稽查管理系统、",
            "totalUsage": "877"
        },
        {
            "department": "资本运营与收益管理系统、",
            "totalUsage": "3125"
        },
        {
            "department": "企业业绩考核评价系统、",
            "totalUsage": "1123"
        },
        {
            "department": "监督追责管理系统、",
            "totalUsage": "899"
        },
        {
            "department": "领导辅助决策系统、",
            "totalUsage": "566"
        },
        {
            "department": "境外项目信息监测系统、",
            "totalUsage": "769"
        },
        {
            "department": "协同办公系统",
            "totalUsage": "3547"
        },
        {
            "department": "合同管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "机关后勤服务管理系统",
            "totalUsage": "569"
        },
        {
            "department": "宣传工作管理系统",
            "totalUsage": "369"
        },
        {
            "department": "企业综合管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "企业群工管理系统",
            "totalUsage": "663"
        },
        {
            "department": "企业信访信息管理系统",
            "totalUsage": "213"
        }
    ],
    arr:[400, 320, 110, 640, 500, 300, 500],
});
onMounted(() => {
    init();
});

onMounted(() => {

  })
const showModel = ref(false);

function closeDialog(){
    showModel.value=false;
 }


//点击柱状图线段
const clickACallBack = (params) => {
  // console.log(params,'--params');
  showModel.value =true ;
//   state.month=params.axisValue
//   showModels.value=true
};



const tabClick = (val) => {
    active.value = val
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 1201);
            item.data.push(randomNum);
        }
    });
    if(val==0){
        state.xData= ['2023/5/13','2023/6/13','2023/7/13','2023/8/13', '2023/9/13', '2023/10/13', '2023/11/13', ]
        state.arr=[400, 320, 110, 640, 500, 300, 500]
    };
    if(val==1){
        state.xData=['2023/5','2023/6','2023/7','2023/8', '2023/9', '2023/10', '2023/11', ]
        state.arr=[100, 200,300, 420,220, 300, 500]
    };
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
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList[item.seriesIndex ]
            };margin-right:6px;display:inline-block;"></span>${item.data
            } (万)</div>`;
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
        name: "Byte",
        min: 0,
        max: 700,
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
    series: [],
  };
  state.option.series = [];
  // var arr=[]
  state.title.forEach((item, index) => {

      // arr = [400, 320, 110, 640, 500, 300, 500]

     
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
      data: state.arr,
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
</script>
<style scoped lang="scss">

.rightTopChart {
    margin-top: 20px;
    .chart {
        // width: 420px;
        // height: 257px;
        // background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
        background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
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