<template>
     <div class="top">
        <navTitle title="平台用户行为" />
    </div>
    <div ref="chart" style="width: 93%; height: 290px;" class="chart_bottom"></div>
    <applicationTable title="平台用户行为" :tableColumns="columns" :tableData="data" :showModel="showModel" @close-dialog="closeDialog"></applicationTable>
  </template>
  
  <script>
  import { onMounted, reactive, ref } from 'vue';
  import applicationTable from "../../../components/applicationPlatform/applicationTable.vue"
  import * as echarts from 'echarts';
  
//   export default {
//     setup() {
//       const chart = ref(null);
//       onMounted(() => {
//         const myChart = echarts.init(chart.value);
//         myChart.setOption(getChartOption());
//       });
  
//       return {
//         chart
//       };
//     }
//   };

export default { 
    setup() {
    const showModel = ref(false);
    const chart = ref(null);
    const columns = [
      { label: '用户名', prop: 'name' },
      { label: '系统名称', prop: 'age' },
      { label: '用户行为', prop: 'time' },
    ];
    const data = [
      { name: 'John Doe', age: 30, time: '' },
      { name: 'Jane Doe', age: 25, time: '' },
    ];
    onMounted(() => { 
        const myChart = echarts.init(chart.value); 
        myChart.setOption(getChartOption()); 
            // 添加点击事件监听 
          // 添加坐标轴点击事件监听
          // myChart.getZr().on('click', ({ offsetX, offsetY }) => {
          // console.log('Clicked on axis at:', { offsetX, offsetY });
          // showModel.value = true;
          // // 在这里处理坐标轴的点击事件，你可以根据需要进行相应的操作 
          // }); 
        myChart.on('click', ({ componentType, dataIndex }) => { 
        if (componentType === 'series') { // 点击雷达图上的数据点时触发 
        // const clickedData = myChart.getOption().series[0].data[dataIndex];
        //  console.log('Clicked Data:', clickedData); 
        // const radarData = myChart.getOption().series[0].data[dataIndex]; 
        // const clickedDataName = radarData.name;
        // console.log(clickedDataName,'--clickedDataName');
        showModel.value =true ;
            // 在这里处理点击事件，你可以根据需要进行相应的操作
        }
        }); 
        
        });
        
        const closeDialog = () => {
         showModel.value = false;
        };
        return { 
        chart,
        columns,
        data,
        showModel,
        closeDialog, 
    }; 
        }, 
    
};
  

function getChartOption() {
  return {
    // backgroundColor: '#091a34',
    title: {
      text: ''
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255,.1)",
      textStyle: {
        color: "#fff", // 设置文本颜色，可根据需要调整
      },
      borderColor: "transparent",
    },
    radar: {
      indicator: [
        { name: '添加新的数据', max: 100, id: 1 },
        { name: '修改已有监管数据', max: 100, id: 2 },
        { name: '查询监管数据', max: 100, id: 3 },
        { name: '删除监管数据', max: 100, id: 4 },
      ],
      name: {
        textStyle: {
          fontSize: 16,
          color: '#fff',
        }
      },
      splitLine: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(238, 197, 102, 0.1)' },
              { offset: 0.2, color: 'rgba(238, 197, 102, 0.3)' },
              { offset: 0.4, color: 'rgba(238, 197, 102, 0.5)' },
              { offset: 0.6, color: 'rgba(238, 197, 102, 0.7)' },
              { offset: 0.8, color: 'rgba(238, 197, 102, 0.9)' },
              { offset: 1, color: 'rgba(238, 197, 102, 1)' },
            ]
          }
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [{
      type: 'radar',
      data: [
        {
          name: '数据1',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#da070d' },
                { offset: 1, color: 'rgba(238, 197, 102, 1)' },
              ]
            }
          },
          value: [80, 90, 70, 80, 60],
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
              {
                color: 'rgba(255, 145, 124, 0.1)',
                offset: 0
              },
              {
                color: 'rgba(255, 145, 124, 0.9)',
                offset: 1
              }
            ])
          }
        },
      ]
    }]
  };
}
  </script>
  <style scoped lang="scss">
  .top{
      // margin-top: 20px;
  }
  .chart_bottom{
      background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
      background-size: 100% 100%;
      padding: 10px 10px;
      box-sizing: border-box;
  }

  </style>

