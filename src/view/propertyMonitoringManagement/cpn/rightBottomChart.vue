<template>
  <div class="mainTitle ttf">
    <p>企业国有产权转让信息统计</p>
  </div>
  <div class="leftBottomChart">
    <div class="goOut" v-show="showBotton" @click="moreClick">返回</div>
    <div class="chart">
      <my-chart
        id="chart-container"
        :width="1790"
        :height="270"
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
const state = reactive({
  counter: 0,
  option: {},
  xData: [
    '按转让方划分',
    '按受让方划分',
    '按交易方式划分',
    '按区域划分',
    '按付款方式划分',
  ],
  sData:{
    TransactionAmount:[1000, 1200, 1150, 1180, 10, 0, 1110],//成交金额
    TotalAuditedAssetsOfEnterprises:[1010, 1260, 1510, 1410, 110, 340, 710],//企业审计资产总额
    EnterpriseAuditNetAssets:[1010, 1200, 1150, 1180, 110, 1011, 1210],//企业审计净资产
    TotalAssessedAssetsOfTheEnterprise:[1500, 1500, 150, -180, 0, 0, 20],//企业评估资产总额
    NetAssetsOfEnterpriseEvaluation:[100, 200, 150, -220, 0, 0, 20],//企业评估净资产
    EvaluationValueOfTransferSubjectMatter:[100, 200, 150, -120, 0, 0, 10],//转让标的评估值
    TransactionValueIncrease:[100, 200, 150, -120, 0, 0, 10],//交易增(减)值
    TransactionAppreciationRate:[10, 13, 8, 12, 0, 3, 5, 6]//交易增(减)值率(%)
  },
  colorList: ['rgba(7, 185, 244, 0.46)','rgba(35, 244, 7, 0.46)','rgba(173, 239, 6, 0.46)',
  'rgba(32, 108, 115,  0.46)','rgba(40, 122, 101,  0.46)','rgba(177, 131, 6, 0.46)','rgba(61, 9, 183, 0.46)'],
})
const obj = [
  {
    name: '成交金额',
    type1: 'CubeLeft0',
    type2: 'CubeRight0',
    type3: 'CubeTop0',
    color1: '#00F6FF',
    color2: 'rgba(7, 185, 244, 0.46)',
    color3: 'rgba(48, 91, 251, 0.01)',
    topColor1: '#2F80ED',
    topColor2: '#56CCF2',
    data: state.sData.TransactionAmount,
  },
  {
    name: '企业审计资产总额',
    type1: 'CubeLeft01',
    type2: 'CubeRight01',
    type3: 'CubeTop01',
    color1: '#019228',
    color2: 'rgba(35, 244, 7, 0.46)',
    color3: 'rgba(151, 248, 138, 0.01)',
    topColor1: '#04380e',
    topColor2: '#068b20',
    data: state.sData.TotalAuditedAssetsOfEnterprises,
  },
  {
    name: '企业审计净资产',
    type1: 'CubeLeft2',
    type2: 'CubeRight2',
    type3: 'CubeTop2',
    color1: '#476b05',
    color2: 'rgba(173, 239, 6, 0.46)',
    color3: 'rgba(196, 234, 101, 0.01)',
    topColor1: '#476b05',
    topColor2: '#83c803',
    data: state.sData.EnterpriseAuditNetAssets,
  },
  {
    name: '企业评估资产总额',
    type1: 'CubeLeft3',
    type2: 'CubeRight3',
    type3: 'CubeTop3',
    color1: '#035454',
    color2: 'rgba(32, 108, 115,  0.46)',
    color3: 'rgba(83, 219, 232, 0.01)',
    topColor1: '#044848',
    topColor2: '#039393',
    data: state.sData.TotalAssessedAssetsOfTheEnterprise,
  },
  {
    name: '企业评估净资产',
    type1: 'CubeLeft4',
    type2: 'CubeRight4',
    type3: 'CubeTop4',
    color1: '#034d3b',
    color2: 'rgba(40, 122, 101,  0.46)',
    color3: 'rgba(16, 218, 168, 0.01)',
    topColor1: '#034d3b',
    topColor2: '#037558',
    data: state.sData.NetAssetsOfEnterpriseEvaluation,
  },
  {
    name: '转让标的评估值',
    type1: 'CubeLeft5',
    type2: 'CubeRight5',
    type3: 'CubeTop5',
    color1: '#502d04',
    color2: 'rgba(177, 131, 6, 0.46)',
    color3: 'rgba(224, 182, 66, 0.01)',
    topColor1: '#502d04',
    topColor2: '#754d1f',
    data: state.sData.EvaluationValueOfTransferSubjectMatter,
  },
  {
    name: '交易增(减)值',
    type1: 'CubeLeft6',
    type2: 'CubeRight6',
    type3: 'CubeTop6',
    color1: '#4e0eb5',
    color2: 'rgba(61, 9, 183, 0.46)',
    color3: 'rgba(164, 139, 221, 0.01)',
    topColor1: '#2d066c',
    topColor2: '#5804df',
    data: state.sData.TransactionValueIncrease,
  },
]
function generateChartObject(obj) {
  return obj.map((item) => {
    const {
      name,
      type1,
      type2,
      type3,
      color1,
      color2,
      color3,
      topColor1,
      topColor2,
      data,
    } = item

    return {
      name: name,
      type: 'custom',
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        return {
          type: 'group',
          children: [
            {
              type: type1,
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
                    color: color1,
                  },
                  {
                    offset: 0.5,
                    color: color2,
                  },
                  {
                    offset: 1,
                    color: color3,
                  },
                ]),
              },
            },
            {
              type: type2,
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
                    color: color1,
                  },
                  {
                    offset: 0.5,
                    color: color2,
                  },
                  {
                    offset: 1,
                    color: color3,
                  },
                ]),
              },
            },
            {
              type: type3,
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
                    color: topColor1,
                  },
                  {
                    offset: 1,
                    color: topColor2,
                  },
                ]),
              },
            },
          ],
        }
      },
      data: data,
    }
  })
}

// legend的data
const newObjArray = obj.map((item) => {
  return {
    name: item.name,
    itemStyle: {
      color: item.color1,
    },
    textStyle: {
      color: '#A9C0FF',
    },
  }
})
// series的data
const chartObjects = generateChartObject(obj)

// 绘制左侧面
const CubeLeft0 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 193, shape.y]
    const c1 = [shape.x - 109, shape.y - 10]
    const c2 = [xAxisPoint[0] - 109, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 193, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 96, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 96, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight0 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 193, shape.y]
    const c2 = [xAxisPoint[0] - 193, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 86, xAxisPoint[1]]
    const c4 = [shape.x - 86, shape.y - 9]
    ctx
      .moveTo(c1[0] + 96, c1[1])
      .lineTo(c2[0] + 96, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop0 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x - 97, shape.y]
    const c2 = [shape.x - 109, shape.y - 10]
    const c3 = [shape.x - 97, shape.y - 18]
    const c4 = [shape.x - 85, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 5注册三个面图形
echarts.graphic.registerShape('CubeLeft0', CubeLeft0)
echarts.graphic.registerShape('CubeRight0', CubeRight0)
echarts.graphic.registerShape('CubeTop0', CubeTop0)

// 绘制左侧面
const CubeLeft01 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 164, shape.y]
    const c1 = [shape.x - 80, shape.y - 10]
    const c2 = [xAxisPoint[0] - 80, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 164, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 96, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 96, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight01 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 164, shape.y]
    const c2 = [xAxisPoint[0] - 164, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 56, xAxisPoint[1]]
    const c4 = [shape.x - 56, shape.y - 9]
    ctx
      .moveTo(c1[0] + 96, c1[1])
      .lineTo(c2[0] + 96, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop01 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x -68, shape.y]
    const c2 = [shape.x - 81, shape.y - 9]
    const c3 = [shape.x -68, shape.y - 18]
    const c4 = [shape.x - 55, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft01', CubeLeft01)
echarts.graphic.registerShape('CubeRight01', CubeRight01)
echarts.graphic.registerShape('CubeTop01', CubeTop01)

const CubeLeft2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 37, shape.y]
    const c1 = [shape.x - 50, shape.y - 10]
    const c2 = [xAxisPoint[0] - 50, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 37, xAxisPoint[1]]
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 37, shape.y]
    const c2 = [xAxisPoint[0] - 37, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 26, xAxisPoint[1]]
    const c4 = [shape.x - 26, shape.y - 9]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x - 38, shape.y + 1] //下
    const c2 = [shape.x - 50, shape.y - 10] //左
    const c3 = [shape.x - 38, shape.y - 18] //上
    const c4 = [shape.x - 26, shape.y - 9] //右
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft2', CubeLeft2)
echarts.graphic.registerShape('CubeRight2', CubeRight2)
echarts.graphic.registerShape('CubeTop2', CubeTop2)

// 绘制左侧面
const CubeLeft3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 54, shape.y]
    const c1 = [shape.x - 20, shape.y - 10]
    const c2 = [xAxisPoint[0] - 20, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 54, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 48, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 48, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 54, shape.y]
    const c2 = [xAxisPoint[0] - 54, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 4, xAxisPoint[1]]
    const c4 = [shape.x + 4, shape.y - 9]
    ctx
      .moveTo(c1[0] + 48, c1[1])
      .lineTo(c2[0] + 48, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x -7, shape.y]
    const c2 = [shape.x + 4, shape.y - 9]
    const c3 = [shape.x - 7, shape.y - 18]
    const c4 = [shape.x - 20, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft3', CubeLeft3)
echarts.graphic.registerShape('CubeRight3', CubeRight3)
echarts.graphic.registerShape('CubeTop3', CubeTop3)

// 绘制左侧面
const CubeLeft4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 76, shape.y]
    const c1 = [shape.x + 8, shape.y - 8]
    const c2 = [xAxisPoint[0] + 10, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 76, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 96, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 96, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 76, shape.y]
    const c2 = [xAxisPoint[0] - 76, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 33, xAxisPoint[1]]
    const c4 = [shape.x + 33, shape.y - 9]
    ctx
      .moveTo(c1[0] + 96, c1[1])
      .lineTo(c2[0] + 96, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 20, shape.y]
    const c2 = [shape.x + 33, shape.y - 9]
    const c3 = [shape.x + 20, shape.y - 18]
    const c4 = [shape.x + 8, shape.y - 9]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft4', CubeLeft4)
echarts.graphic.registerShape('CubeRight4', CubeRight4)
echarts.graphic.registerShape('CubeTop4', CubeTop4)

// 绘制左侧面
const CubeLeft5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 46, shape.y]
    const c1 = [shape.x + 38, shape.y - 10]
    const c2 = [xAxisPoint[0] + 38, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] - 46, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 96, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 96, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 46, shape.y]
    const c2 = [xAxisPoint[0] - 46, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 62, xAxisPoint[1]]
    const c4 = [shape.x + 62, shape.y - 9]
    ctx
      .moveTo(c1[0] + 96, c1[1])
      .lineTo(c2[0] + 96, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 50, shape.y]
    const c2 = [shape.x + 38, shape.y - 9]
    const c3 = [shape.x + 50, shape.y - 18]
    const c4 = [shape.x + 63, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 5注册三个面图形
echarts.graphic.registerShape('CubeLeft5', CubeLeft5)
echarts.graphic.registerShape('CubeRight5', CubeRight5)
echarts.graphic.registerShape('CubeTop5', CubeTop5)

// 绘制左侧面
const CubeLeft6 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x -16, shape.y]
    const c1 = [shape.x + 68, shape.y - 10]
    const c2 = [xAxisPoint[0] + 68, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] -16, xAxisPoint[1]]
    ctx
      .moveTo(c0[0] + 96, c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0] + 96, c3[1])
      .closePath()
  },
})
// 绘制右侧面
const CubeRight6 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x -16, shape.y]
    const c2 = [xAxisPoint[0] -16, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 92, xAxisPoint[1]]
    const c4 = [shape.x + 92, shape.y - 9]
    ctx
      .moveTo(c1[0] + 96, c1[1])
      .lineTo(c2[0] + 96, c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 绘制顶面
const CubeTop6 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 80, shape.y]
    const c2 = [shape.x + 68, shape.y - 10]
    const c3 = [shape.x + 80, shape.y - 18]
    const c4 = [shape.x + 92, shape.y - 10]
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath()
  },
})
// 5注册三个面图形
echarts.graphic.registerShape('CubeLeft6', CubeLeft6)
echarts.graphic.registerShape('CubeRight6', CubeRight6)
echarts.graphic.registerShape('CubeTop6', CubeTop6)


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
          state.colorList[item.seriesIndex % 7]
          };margin-right:6px;display:inline-block;"></span>${item.data} </div>`
        }
        return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p >${str}</div>`
      },
    },
    legend: {
      data: [
        ...newObjArray,
        {
          name: '交易增(减)值率(%)',
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
      width: '55%',
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
        min: -400,
        max: 1600,
        interval: 400,
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
        min: -20,
        max: 80,
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
        name: '成交金额',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft0',
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
                type: 'CubeRight0',
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
                type: 'CubeTop0',
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
        data: state.sData.TransactionAmount,
      },
      {
        name: '企业审计资产总额',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft01',
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
                type: 'CubeRight01',
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
                type: 'CubeTop01',
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
        data: state.sData.TotalAuditedAssetsOfEnterprises,
      },
      {
        name: '企业审计净资产',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft2',
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
                      color: '#476b05',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(173, 239, 6, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(196, 234, 101, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight2',
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
                      color: '#476b05',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(173, 239, 6, 0.46)',
                    },
                    {
                      offset: 1,
                      color:'rgba(196, 234, 101, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop2',
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
                      color: '#476b05',
                    },
                    {
                      offset: 1,
                      color: '#83c803',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.EnterpriseAuditNetAssets,
      },
      {
        name: '企业评估资产总额',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft3',
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
                      color: '#035454',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(32, 108, 115,  0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(83, 219, 232, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight3',
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
                      color: '#035454',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(32, 108, 115,  0.46)',
                    },
                    {
                      offset: 1,
                      color:'rgba(83, 219, 232, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop3',
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
                      color: '#044848',
                    },
                    {
                      offset: 1,
                      color: '#039393',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.TotalAssessedAssetsOfTheEnterprise,
      },
      {
        name: '企业评估净资产',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft4',
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
                      color: '#034d3b',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(40, 122, 101,  0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(16, 218, 168, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight4',
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
                      color: '#034d3b',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(40, 122, 101,  0.46)',
                    },
                    {
                      offset: 1,
                      color:'rgba(16, 218, 168, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop4',
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
                      color: '#034d3b',
                    },
                    {
                      offset: 1,
                      color: '#037558',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.NetAssetsOfEnterpriseEvaluation,
      },
      {
        name: '转让标的评估值',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft5',
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
                      color: '#502d04',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(177, 131, 6, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(224, 182, 66, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight5',
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
                      color: '#502d04',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(177, 131, 6, 0.46)',
                    },
                    {
                      offset: 1,
                      color:'rgba(224, 182, 66, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop5',
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
                      color: '#502d04',
                    },
                    {
                      offset: 1,
                      color: '#754d1f',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.EvaluationValueOfTransferSubjectMatter,
      },
      {
        name: '交易增(减)值',
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft6',
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
                      color: '#4e0eb5',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(61, 9, 183, 0.46)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(164, 139, 221, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight6',
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
                      color: '#4e0eb5',
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(61, 9, 183, 0.46)',
                    },
                    {
                      offset: 1,
                      color:'rgba(164, 139, 221, 0.01)',
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop6',
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
                      color: '#2d066c',
                    },
                    {
                      offset: 1,
                      color: '#5804df',
                    },
                  ]),
                },
              },
            ],
          }
        },
        data: state.sData.TransactionValueIncrease,
      },
      {
        name: '交易增(减)值率(%)',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
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
        data: state.sData.TransactionAppreciationRate,
      },
    ],
    // dataZoom: {
    //   show: true, // 为true 滚动条出现
    //   realtime: true,
    //   type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
    //   start: 0, // 表示默认展示20%～80%这一段。
    //   end: 50,
    //   zoomOnMouseWheel: false,
    // },
  }
}
const clickACallBack = (p) => {
  showBotton = true;
  console.log(p, 'p');
  switch (p.axisValue) {
    case '按转让方划分':
      state.xData = ['国资监管机构/政府部门', '国有独资企业/全资企业', '国有控股企业', '国有实际控制企业', '国有事业单位/社团', '其他'];
      state.sData={
        TransactionAmount:[110, 1200, 1150, 1180, 140, 0],//成交金额
        TotalAuditedAssetsOfEnterprises:[210, 1260, 1410, 110, 340, 710],//企业审计资产总额
        EnterpriseAuditNetAssets:[1200, 1150, 1180, 110, 1011, 1210],//企业审计净资产
        TotalAssessedAssetsOfTheEnterprise:[1500, 150, -180, 0, 0, 20],//企业评估资产总额
        NetAssetsOfEnterpriseEvaluation:[1010, 1200,-220, 0, 0, 20],//企业评估净资产
        EvaluationValueOfTransferSubjectMatter:[1200, 200, -120, 0, 0, 10],//转让标的评估值
        TransactionValueIncrease:[1300,1250, -120, 1230, 540, 10],//交易增(减)值
        TransactionAppreciationRate:[10, 3, 8, 0, 3, 5, 6]//交易增(减)值率(%)
      },
      init();
      break;
    case '按受让方划分':
      state.xData = ['国有及国有控股企业', '国有实际控制企业', '国有参股企业', '非国有企业', '外贸企业', '其他法人单位', '自然人'];
      state.sData={
        TransactionAmount:[1310, 1200,980 ,1150, 1180, 140, 320],//成交金额
        TotalAuditedAssetsOfEnterprises:[1010,1630, 1260, 1410, 110, 340, 710],//企业审计资产总额
        EnterpriseAuditNetAssets:[1200, 1150,908, 1180, 110, 1011, 1210],//企业审计净资产
        TotalAssessedAssetsOfTheEnterprise:[1500, 1123,150, -180, 320, 320, 210],//企业评估资产总额
        NetAssetsOfEnterpriseEvaluation:[1010,922, 1200,-220, 230, 430, 20],//企业评估净资产
        EvaluationValueOfTransferSubjectMatter:[1200,879, 200, -120, 430, 540, 310],//转让标的评估值
        TransactionValueIncrease:[1300,1250,908, -120, 1230, 540, 10],//交易增(减)值
        TransactionAppreciationRate:[10, 3, 8, 0, 2,3, 5, 6]//交易增(减)值率(%)
      },
      init();
      // 执行其他逻辑
      break;
    case '按交易方式划分':
      state.xData = ['拍卖', '招投标', '协议', '网络竞价', '其他竞价', '动态报价'];
      state.sData={
        TransactionAmount:[710, 1200, 1150, 1180, 140, 0],//成交金额
        TotalAuditedAssetsOfEnterprises:[1010, 660, 1410, 110, 340, 710],//企业审计资产总额
        EnterpriseAuditNetAssets:[1200, 750, 1180, 110, 1011, 1210],//企业审计净资产
        TotalAssessedAssetsOfTheEnterprise:[1500, 650, -180, 0, 0, 20],//企业评估资产总额
        NetAssetsOfEnterpriseEvaluation:[1010, 1200,-220, 0, 0, 620],//企业评估净资产
        EvaluationValueOfTransferSubjectMatter:[1200, 900, -120, 0, 0, 410],//转让标的评估值
        TransactionValueIncrease:[1300,1250, -120, 1230, 540, 30],//交易增(减)值
        TransactionAppreciationRate:[10, 3, 10, 0, 3, 5, 6]//交易增(减)值率(%)
      },
      init();
      // 执行其他逻辑
      break;
    case '按区域划分':
      state.xData = ['跨区域交易', '省内交易', '自然人受让'];
      state.sData={
        TransactionAmount:[710, 1200, 1150],//成交金额
        TotalAuditedAssetsOfEnterprises:[1010, 660, 1410],//企业审计资产总额
        EnterpriseAuditNetAssets:[1200, 750, 1180],//企业审计净资产
        TotalAssessedAssetsOfTheEnterprise:[1500, 650, -180],//企业评估资产总额
        NetAssetsOfEnterpriseEvaluation:[1010, 1200,-220],//企业评估净资产
        EvaluationValueOfTransferSubjectMatter:[1200, 900, -120],//转让标的评估值
        TransactionValueIncrease:[1300,1250, -120],//交易增(减)值
        TransactionAppreciationRate:[10, 3, 10]//交易增(减)值率(%)
      },
      init();
      // 执行其他逻辑
      break;
    case '按付款方式划分':
      state.xData = ['一次性付款', '分期付款'];
      state.sData={
        TransactionAmount:[710, 1200],//成交金额
        TotalAuditedAssetsOfEnterprises:[1010, 1410],//企业审计资产总额
        EnterpriseAuditNetAssets:[750, 1180],//企业审计净资产
        TotalAssessedAssetsOfTheEnterprise:[650, -180],//企业评估资产总额
        NetAssetsOfEnterpriseEvaluation:[1010,-220],//企业评估净资产
        EvaluationValueOfTransferSubjectMatter:[ 900, -120],//转让标的评估值
        TransactionValueIncrease:[1300, -120],//交易增(减)值
        TransactionAppreciationRate:[10, 10]//交易增(减)值率(%)
      },
      init();
      // 执行其他逻辑
      break;
    default:
      init();
      // 默认情况下的逻辑
      break;
  }
};
const moreClick = () => {
  showBotton = false;
  state.xData = [
    '按转让方划分',
    '按受让方划分',
    '按交易方式划分',
    '按区域划分',
    '按付款方式划分',
  ];
  state.sData = {
    TransactionAmount: [1000, 1200, 1150, 1180, 10, 0, 1110], //成交金额
    TotalAuditedAssetsOfEnterprises: [1010, 1260, 1510, 1410, 110, 340, 710], //企业审计资产总额
    EnterpriseAuditNetAssets: [1010, 1200, 1150, 1180, 110, 1011, 1210], //企业审计净资产
    TotalAssessedAssetsOfTheEnterprise: [1500, 1500, 150, -180, 0, 0, 20], //企业评估资产总额
    NetAssetsOfEnterpriseEvaluation: [100, 200, 150, -220, 0, 0, 20], //企业评估净资产
    EvaluationValueOfTransferSubjectMatter: [100, 200, 150, -120, 0, 0, 10], //转让标的评估值
    TransactionValueIncrease: [100, 200, 150, -120, 0, 0, 10], //交易增(减)值
    TransactionAppreciationRate: [20, 13, 8, 12, 0, 3, 5, 6], //交易增(减)值率(%)
  };
  // 重新赋值给图表的配置项
  init()
};

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
  width: 1827px;
  height: 305px;
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
