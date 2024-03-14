<template>
    <div class="leftTopChart">
       <navTitle title="平台在线用户数量" />
        <div class="chart">
            <div class="date">
                <p :class="active === 0 ? 'active' : ''" @click="tabClick(0)">日</p>
                <p :class="active === 1 ? 'active' : ''" @click="tabClick(1)" class="marginLeft10">月</p>
            </div>
        <my-chart :width="1050" :height="230" :option="state.option" :click="true" :params="_params" 
         @clickCallBack="clickACallBack" ></my-chart>
         <applicationTable title="平台在线用户数量" :tableColumns="state.columns" :tableData="state.data" :showModel="showModel" @close-dialog="closeDialog"></applicationTable>
        </div>
    </div>
</template>
<script setup>
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
    xData: ['2023/5/13','2023/6/13','2023/7/13','2023/8/13', '2023/9/13', '2023/10/13', '2023/11/13', ],
    columns: [
        { label: '用户名', prop: 'name' },
        { label: '登录时间', prop: 'age' },
        { label: '登出时间', prop: 'time' },
      ],
      data: [
        { name: 'John Doe', age: 30,time:'' },
        { name: 'Jane Doe', age: 25 ,time:''},
      ],
      arr:[400, 320, 110, 640, 500, 300, 500],
});
onMounted(() => {
    init();
});
const showModel = ref(false);
// 关闭弹框
function closeDialog(){
    showModel.value=false;
 }
//点击柱状图线段
const clickACallBack = (params) => {
  // console.log(params,'--params');
  showModel.value =true ;
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
// const init = () => {
//     state.option = {
//         grid: {
//             left: "40",
//             right: "45",
//             top: "40",
//             bottom: "40",
//         },
//         tooltip: {
//             backgroundColor: "rgba(255,255,255,.1)",
//             textStyle: {
//                 color: "#fff", // 设置文本颜色，可根据需要调整
//             },
//             borderColor: "transparent",
//             extraCssText: "backdrop-filter: blur(8px);",
//             trigger: "axis",
//             axisPointer: {
//                 type: "cross",
//                 crossStyle: {
//                     color: "#999",
//                 },
//             },
//         },
//         legend: {
//             data: legendData(),
//             textStyle: {
//                 color: "#fff",
//                 fontSize: 12,
//             },
//             left: "center",
//             top: "20",
//             itemWidth: 12, // 图例标记的宽度
//             itemHeight: 6, // 图例标记的高度
//         },
//         toolbox: {
//             show: false,
//             feature: {
//                 dataView: { show: true, readOnly: false },
//                 magicType: { show: true, type: ["line", "bar"] },
//                 restore: { show: true },
//                 saveAsImage: { show: true },
//             },
//         },
//         xAxis: [
//             {
//                 type: "category",
//                 data: state.xData,
//                 axisTick: {
//                     alignWithLabel: true,
//                 },
//                 axisPointer: {
//                     type: "shadow",
//                 },
//                 axisLabel: {
//                     color: "#fff",
//                     fontSize: 12,
//                     interval: 0,
//                 },
//                 axisLine: {
//                     // 设置x轴的颜色
//                     lineStyle: {
//                         color: "#4CB3F3",
//                     },
//                 },
//             },
//         ],
//         yAxis: [
//             {
//                 type: "value",
//                 name: "单位(吨)",
//                 min: 0,
//                 max: 1200,
//                 interval: 300,
//                 splitLine: {
//                     show: true,
//                     lineStyle: {
//                         type: "dashed",
//                         width: 1,
//                         opacity: 0.3,
//                         color: ["#4CB3F3"],
//                     },
//                 },
//                 axisLabel: {
//                     color: "#fff",
//                     fontSize: 12,
//                 },
//                 nameTextStyle: {
//                     color: "#fff",
//                     fontSize: 12,
//                 },
//             },
//         ],
//         series: [
//             {
//                 name: "",
//                 type: "bar",
//                 barWidth: 6,
//                 itemStyle: {
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                         { offset: 0, color: '#FAEDD0' },   // 渐变色的起始颜色
//                         { offset: 0.5, color: '#EBAC23' }, // 渐变色的中间颜色
//                         { offset: 1, color: 'rgba(235,172,35,0.00)' },   // 渐变色的结束颜色
//                     ]),
//                     borderRadius: [3, 3, 0, 0],
//                 },
//                 barGap: "60%", label: {
//                     show: true,
//                     formatter: "",
//                     backgroundColor: "#fff",
//                     width: 8,
//                     height: 8,
//                     position: "top",
//                     offset: [0, 7],
//                     borderWidth: 4,
//                     borderColor: "rgba(255,255,255,0.2)",
//                     borderRadius: 4,
//                     shadowColor: "#fff",
//                     shadowBlur: 16,
//                 },
//             },
//         ],
//         dataZoom: {
//             show: true, // 为true 滚动条出现
//             realtime: true,
//             type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
//             start: 0, // 表示默认展示20%～80%这一段。
//             end: 60,
//             zoomOnMouseWheel: false,
//         },
//     };
//     state.option.series.forEach((item) => {
//         item.data = [];
//         for (let i = 0; i < 7; i++) {
//             let randomNum = Math.floor(Math.random() * 1201);
//             item.data.push(randomNum);
//         }
//     });
// };



const init = () => {
  state.option = {
    grid: {
      left: "60",
      right: "30",
      top: "30",
      bottom: "30",
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
        name: "",
        min: 0,
        max: 1000,
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

.leftTopChart {
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