<template>
  <div class="mainTitle ttf">
    <p>企业国有资产交易成交信息统计</p>
  </div>
  <div class="leftBottomChart">
    <div class="goOut" v-show="showBotton" @click="moreClick">返回</div>
    <div class="chart">
      <my-chart
        :width="850"
        :height="233"
        :option="state.option"
        :click="true"
        @clickCallBack="clickACallBack"
        :params="_params"
      ></my-chart>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const isBack = ref(false)
const _params = ref(null)
let showBotton = false
const counterChange = (val) => {
  state.counter = val
  init()
}
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 24, shape.y]
    const c1 = [shape.x - 38, shape.y - 10]
    const c2 = [xAxisPoint[0] - 38, xAxisPoint[1] - 9]
    const c3 = [xAxisPoint[0] - 24, xAxisPoint[1]]
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 24, shape.y]
    const c2 = [xAxisPoint[0] - 24, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 10, xAxisPoint[1] - 9]
    const c4 = [shape.x - 10, shape.y - 9]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x - 24, shape.y + 1] //下
    const c2 = [shape.x - 38, shape.y - 10] //左
    const c3 = [shape.x - 24, shape.y - 18] //上
    const c4 = [shape.x - 9, shape.y - 9] //右
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft)
echarts.graphic.registerShape('CubeRight', CubeRight)
echarts.graphic.registerShape('CubeTop', CubeTop)

// 绘制左侧面
const CubeLeft1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 28, shape.y]
    const c1 = [shape.x + 6, shape.y - 10]
    const c2 = [xAxisPoint[0] + 6, xAxisPoint[1] - 9]
    const c3 = [xAxisPoint[0] - 28, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 48, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 48, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 28, shape.y]
    const c2 = [xAxisPoint[0] - 28, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 34, xAxisPoint[1] - 9]
    const c4 = [shape.x + 34, shape.y - 9]
    ctx
      .moveTo(c1[0] + 48, c1[1])
      .lineTo(c2[0] + 48, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 20, shape.y]
    const c2 = [shape.x + 34, shape.y - 9]
    const c3 = [shape.x + 20, shape.y - 18]
    const c4 = [shape.x + 6, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft1', CubeLeft1)
echarts.graphic.registerShape('CubeRight1', CubeRight1)
echarts.graphic.registerShape('CubeTop1', CubeTop1)
const state = reactive({
  counter: 0,
  option: {},
  xData: ['按融资方划分', '按融资方企业类型划分', '按投资方划分', '按区域划分'],
  title: ['融资总额', '净资产评估值', '溢价率(%)'],
  sData: {
    TotalFinancingAmount: [100, 290, 200, 10], //融资总额
    NetAssetEvaluationValue: [100, 300, 200, 10], //净资产评估值
    PremiumRate: [10, 13, 8, 12], //溢价率
  },
  colorList: ['rgba(7, 185, 244, 0.46)', 'rgba(35, 244, 7, 0.46)', '#d9af19'],
})
onMounted(() => {
  init()
})
// legenData处理
const legendData = () => {
  return state.title.map((item, index) => {
    return {
      name: item,
    }
  })
}
const setColor = () => {
  if (state.counter === 1) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#EBAC23' }, // 渐变起始颜色
      { offset: 1, color: 'rgba(235,172,35,0.00)' }, // 渐变终止颜色
    ])
  } else {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#46E7E7' }, // 渐变起始颜色
      { offset: 1, color: 'rgba(11,230,230,0.00)' }, // 渐变终止颜色
    ])
  }
}
const init = () => {
  state.option = {
    grid: {
      left: '50',
      right: '45',
      top: '40',
      bottom: '40',
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,.1)',
      textStyle: {
        color: '#fff', // 设置文本颜色，可根据需要调整
      },
      borderColor: 'transparent',
      extraCssText: 'backdrop-filter: blur(8px);',
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
      formatter: function (p) {
        _params.value = p
        let str = ''
        for (let i in p) {
          let item = p[i]
          str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${
            state.colorList[item.seriesIndex % 3]
          };margin-right:6px;display:inline-block;"></span>${item.data} </div>`
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p >${str}</div>`
      },
    },
    legend: {
      data: [
        {
          name: '融资总额',
          // icon: 'rect',
          itemStyle: {
            color: '#02E4FF',
          },
          textStyle: {
            color: '#A9C0FF',
          },
        },
        {
          name: '净资产评估值',
          // icon: 'rect',
          itemStyle: {
            color: '#039428',
          },
          textStyle: {
            color: '#A9C0FF',
          },
        },
        {
          name: '溢价率(%)',
          // icon: 'rect',
          itemStyle: {
            color: '#d9af19',
          },
          textStyle: {
            color: '#A9C0FF',
          },
        },
      ],
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
      top: '0',
      x: '180',
      itemWidth: 12, // 图例标记的宽度
      itemHeight: 6, // 图例标记的高度
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: state.xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          interval: 0,
        },
        axisLine: {
          // 设置x轴的颜色
          lineStyle: {
            color: '#4CB3F3',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位:万元',
        min: 0,
        max: 1500,
        interval: 300,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            width: 1,
            opacity: 0.3,
            color: ['#4CB3F3'],
          },
        },
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          interval: 0, // 设置刻度标签的显示间隔为0，表示显示所有的刻度标签
        },
        nameTextStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      {
        type: 'value',
        name: '单位:%',
        min: 0,
        max: 100,
        interval: 20,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            width: 1,
            opacity: 0.3,
            color: ['#4CB3F3'],
          },
        },
        axisTick: {
          show: true, // 隐藏刻度线
        },
        nameTextStyle: {
          color: '#fff',
          fontSize: 12,
        },
        axisLabel: {
          show: true, // 隐藏刻度标签
          color: '#fff',
          fontSize: 12,
          formatter: function (value, index) {
            return `${value}${index == 0 ? '' : '%'}`
          },
        },
      },
    ],
    series: [
      {
        name: '融资总额',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#00F6FF',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(7, 185, 244, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(48, 91, 251, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#00F6FF',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(7, 185, 244, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(48, 91, 251, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#2F80ED',
                    },
                    {
                      offset: 1,
                      color: '#56CCF2',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.TotalFinancingAmount,
      },
      {
        name: '净资产评估值',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft1',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#019228',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(35, 244, 7, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(151, 248, 138, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight1',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#019228',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(35, 244, 7, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(151, 248, 138, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop1',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#04380e',
                    },
                    {
                      offset: 1,
                      color: '#068b20',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.NetAssetEvaluationValue,
      },
      {
        name: '溢价率(%)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        lineStyle: {
          color: '#d9af19',
          width: 5, // 设置折线宽度为2
        },
        symbol: 'circle', // 圆点的形状
        symbolSize: 6, // 圆点的大小
        itemStyle: {
          color: '#ffffff', // 圆点的颜色
          shadowColor: '#fff', // 阴影颜色
          shadowBlur: 4, // 阴影模糊程度
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff', // 圆点边框颜色
            borderWidth: 2, // 圆点边框宽度
          },
        },
        data: [10, 13, 8, 12],
      },
    ],
    // dataZoom: {
    //   show: true, // 为true 滚动条出现
    //   realtime: true,
    //   type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
    //   start: 0, // 表示默认展示20%～80%这一段。
    //   end: 30,
    //   zoomOnMouseWheel: false,
    // },
  }
  // state.option.series.forEach((item, index) => {
  //   item.data = [];
  //   let coord = []
  //   for (let i = 0; i < 12; i++) {
  //     let randomNum = Math.floor(Math.random() * 1300);
  //     item.data.push(randomNum);
  //     coord.push({ coord: [i, randomNum], value: randomNum })
  //   }
  //   if (index === 0) {
  //     item.markPoint = {
  //       symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png',
  //       symbolSize: [40, 20],
  //       symbolOffset: [0, 5],
  //       data: [
  //         { type: 'max', name: 'Max' },
  //         { type: 'min', name: 'Min' },
  //         { type: 'average', name: '平均值' }, // 标记平均值
  //         ...coord.map(item => item)
  //       ],
  //       itemStyle: {
  //         color: 'white'
  //       },
  //       label: {
  //         color: '#ffffff',
  //         fontSize: '12px',
  //         verticalAlign: 'middle'
  //       }
  //     }
  //   }
  // });
}
const clickACallBack = (p) => {
  showBotton = true
  console.log(p.axisValue, 'p')
  switch (p.axisValue) {
    case '按融资方划分':
      state.xData = [
        '国有独资企业/全资企业',
        '国有控股企业',
        '国有实际控制企业',
        '国有事业单位/社团',
      ]
      ;(state.sData = {
        TotalFinancingAmount: [400, 100, 250, 110], //融资总额
        NetAssetEvaluationValue: [200, 300, 200, 110], //净资产评估值
        PremiumRate: [4, 1, 8, 2], //溢价率
      }),
        init()
      break
    case '按融资方企业类型划分':
      state.xData = ['全民所有制企业', '有限责任公司', '股份有限公司', '其他']
      ;(state.sData = {
        TotalFinancingAmount: [160, 210, 510, 610], //融资总额
        NetAssetEvaluationValue: [320, 300, 700, 680], //净资产评估值
        PremiumRate: [5, 13, 8, 12], //溢价率
      }),
        init()
      break
    case '按投资方划分':
      state.xData = [
        '国有独资企业\n/全资企业',
        '国有控股\n企业',
        '国有实际\n控制企业',
        '国有事业单\n位/社团等',
        '国有参股\n企业',
        '非国有企业',
        '外贸企业',
        '其他',
        '自然人',
      ]
      ;(state.sData = {
        TotalFinancingAmount: [360, 239, 432, 532, 589, 569, 210, 250, 210], //融资总额
        NetAssetEvaluationValue: [20, 300, 632, 589, 269, 210, 250, 200, 410], //净资产评估值
        PremiumRate: [5, 13, 8, 4, 5, 6, 2, 6, 12], //溢价率
      }),
        init()
      // 执行其他逻辑
      break
    case '按区域划分':
      state.xData = ['跨区域交易', '省内交易', '自然人受让']
      ;(state.sData = {
        TotalFinancingAmount: [160, 239, 210], //融资总额
        NetAssetEvaluationValue: [120, 300, 410], //净资产评估值
        PremiumRate: [5, 13, 12], //溢价率
      }),
        init()
      // 执行其他逻辑
      break
    case '按付款方式划分':
      state.xData = ['一次性付款', '分期付款']
      ;(state.sData = {
        TotalFinancingAmount: [160, 210], //融资总额
        NetAssetEvaluationValue: [120, 410], //净资产评估值
        PremiumRate: [5, 12], //溢价率
      }),
        init()
      // 执行其他逻辑
      break
    default:
      init()
      // 默认情况下的逻辑
      break
  }
}
const moreClick = () => {
  showBotton = false
  ;(state.xData = [
    '按融资方划分',
    '按融资方企业类型划分',
    '按投资方划分',
    '按区域划分',
  ]),
    (state.sData = {
      TotalFinancingAmount: [100, 290, 200, 10], //融资总额
      NetAssetEvaluationValue: [100, 300, 200, 10], //净资产评估值
      PremiumRate: [10, 13, 8, 12], //溢价率
    }),
    init()
}
</script>

<style lang="scss" scoped>
.mainTitle {
  box-sizing: border-box;
  background: url('@images/title.png') 0% 0% / 100% 100% no-repeat;
  width: 519px;
  height: 70px;
  padding-left: 75px;

  p {
    font-size: 24px;
    font-weight: normal;
    line-height: 40px;
    letter-spacing: 0.2em;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
  }
}
.leftBottomChart {
  // margin-top: 24px;
  background: url('@images/propertyMonitoringManagement/4.png');
  background-size: 100% 100%;
  width: 888px;
  height: 270px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .goOut {
    position: absolute;
    cursor: pointer;
    color: #fff;
    height: 32px;
    padding: 0 30px 0 14px;
    line-height: 32px;
    background: url('/src/components/Header/bg.png') center/100% 100% no-repeat;
    border-radius: 16px;
    position: absolute;
    right: 4px;
    top: 5px;
  }
  .tab-bar {
    position: absolute;
    right: 15px;
    top: 20px;
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0em;
    display: flex;
    color: #ffffff;

    div {
      cursor: pointer;
      padding: 2px 5px;
    }

    .active {
      background: radial-gradient(
        68% 67% at 50% 50%,
        rgba(0, 22, 52, 0.15) 0%,
        #1766a1 100%
      );
      border-radius: 15px;
      border-image: linear-gradient(
          358deg,
          #166cff 7%,
          rgba(209, 226, 255, 0.87) 17%,
          rgba(129, 206, 255, 0.76) 90%
        )
        1;
    }
  }

  .chart {
    margin-top: 20px;
  }
}
</style>
