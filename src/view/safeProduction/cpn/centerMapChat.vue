<template>
  <div class="centerMap">
    <!-- <div class="rightTable">
      <h2 class="ttf">酒泉集团</h2>
      <div class="content">
        <p>最大危险源<i class="colorR">19</i></p>
        <p>危险性类别<i class="colorB">5</i></p>
      </div>
      <ScrollTable :tableData="state.tableData" :options="state.options"
        :colorList="state.options.map(item => item.prop).slice(1)" :height="80" style="padding: 0;margin-top: 14px;">
      </ScrollTable>
    </div> -->
    <div ref="container" class="map" style="width: 1300px; height: 700px"></div>
    <!-- <div class="leftTable">
      <div class="title">
        <h2 class="ttf">酒泉集团</h2>
        <p>年度安全责任评分<i>70</i></p>
      </div>
      <ScrollTable :tableData="state.tableData1" :options="state.tableHeader1"
        :colorList="state.options.map(item => item.prop).slice(1)" :height="80" style="padding: 0;margin-top: 14px;">
      </ScrollTable>
      <ScrollTable :tableData="state.tableData2" :options="state.tableHeader2"
        :colorList="state.options.map(item => item.prop).slice(1)" :height="80" style="padding: 0;margin-top: 14px;">
      </ScrollTable>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import ScrollTable from "@/components/ScrollTable/index.vue";
import china from "@/echarts/gansu.json";
import mapImg from "@/images/IntelligentEnergyManagement/gansu.png";
const container = ref(null);
const state = reactive({
  option: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: mapImg,
            width: "800",
            height: "690",
          },
          left: "center",
          top: "58",
        },
      ],
    },
    series: [
      {
        // markPoint: {
        //   symbol: 'image://https://z1.ax1x.com/2023/10/20/piFJM0s.png',
        //   symbolSize: [30, 30], // 小红旗的大小
        //   data: [
        //     { name: '酒泉集团', coord: [97.661218, 41.190593] } // 标记酒泉市的位置坐标
        //   ],
        //   label: {
        //     show: true,
        //     color: "#fff",
        //     fontSize: 18,
        //     positon: 'right',
        //     offset: [60, 0],
        //     formatter: function (params) {
        //       return params.name
        //     }
        //   },
        // },
        type: "map",
        center: [101.82, 38.05], // 初始地图中心位置的经纬度
        zoom: 2.6,
        tooltip: {
          backgroundColor: "rgba(0,0,0,.6)",
          textStyle: {
            color: "#fff", // 设置文本颜色，可根据需要调整
          },
          borderColor: "transparent",
          extraCssText: "backdrop-filter: blur(8px);",
          trigger: "item",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var count = params.value ? params.value : 0;
            res = `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                             <div style='color:#fff; font-size: 14px;'>${name}</div>
                             <div style="display: flex; align-items: center;padding-top: 6px;">
                              <div style="height: 6px; width: 6px; border-radius: 50%; background:#fff; margin-right: 10px;"></div> <span style='color:#fff;font-size: 12px;margin-right: 20px;'>人数</span><span style="font-size: 12px;color:#fff;">${count}</span>
                             </div>
                          </div>`;
            return res;
          },
        },
        map: "china",
        label: {
          show: true,
          color: "#fff",
        },
        left: "365",
        top: "67",
        aspectScale: 0.75,
        roam: false,
        itemStyle: {
          borderColor: "rgba(92,219,250,0)",
          borderWidth: 2,
          areaColor: "rgba(255,0,0,0)",
        },
        emphasis: {
          itemStyle: {
            areaColor: {
              type: "linear-gradient",
              x: 1000,
              y: 600,
              x2: 1000,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(48,132,178,.3)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(96,228,250,.3)", // 50% 处的颜色
                },
              ],
            },
          },
          label: {
            color: "#fff",
          },
        },
        select: {
          itemStyle: {
            areaColor: {
              type: "linear-gradient",
              x: 1000,
              y: 600,
              x2: 1000,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(48,132,178,.1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(96,228,250,.6)", // 50% 处的颜色
                },
              ],
            },
          },
          label: {
            color: "#fff",
          },
        },
        zlevel: 1,
        data: [
          { name: "天津省", value: 4075 },
          { name: "湖北省", value: 500 },
          { name: "湖南省", value: 3212 },
          { name: "江西省", value: 5000 },
          { name: "甘肃省", value: 550 },
          { name: "浙江省", value: 1233 },
        ],
      },
    ],
  },
  options: [
    { prop: "sequence", label: "危险等级", width: "80" },
    { prop: "companytName", label: "一级", width: "55" },
    { prop: "legalReviewError", label: "二级", width: "55" },
    { prop: "conferenceError", label: "三级", width: "55" },
    { prop: "partyCommittee", label: "四级", width: "55" },
  ],
  tableData: [
    {
      sequence: "合计",
      companytName: "2",
      legalReviewError: 1,
      conferenceError: 2,
      partyCommittee: 3,
    },
  ],
  tableHeader1: [
    { prop: "sequence", label: "季度", width: "60" },
    { prop: "companytName", label: "第一季度", width: "80" },
    { prop: "legalReviewError", label: "第二季度", width: "80" },
    { prop: "conferenceError", label: "上半年", width: "80" },
  ],
  tableData1: [
    {
      sequence: "安全生产责任评分",
      companytName: 90,
      legalReviewError: 60,
      conferenceError: 80,
    },
  ],
  tableHeader2: [
    { prop: "sequence", label: "季度", width: "60" },
    { prop: "companytName", label: "第三季度", width: "80" },
    { prop: "legalReviewError", label: "第四季度", width: "80" },
    { prop: "conferenceError", label: "下半年", width: "80" },
  ],
  tableData2: [
    {
      sequence: "安全生产责任评分",
      companytName: 90,
      legalReviewError: 60,
      conferenceError: 80,
    },
  ]
});
let myChart;
const init = () => {
  myChart = echarts.init(container.value);
  echarts.registerMap("china", china);
  myChart.setOption(state.option);
}
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.centerMap {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;

  .rightTable {
    background-image: url('@images/safeProduction/底1.png');
    background-size: 100% 100%;
    width: 280px;
    height: 154px;
    position: absolute;
    right: 350px;
    top: 30px;
    padding: 16px;
    box-sizing: border-box;


    h2 {
      font-size: 18px;
      font-weight: normal;
      line-height: 18px;
      letter-spacing: 0px;
      background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      z-index: 0;
    }

    .content {
      font-size: 14px;
      font-weight: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #FFFFFF;
      z-index: 0;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      i {
        padding-left: 8px;
      }

      .colorB {
        font-size: 14px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #6BDAFF;
        z-index: 1;
      }

      .colorR {
        font-size: 14px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #F1606C;
        z-index: 1;
      }
    }
  }

  .leftTable {
    background-image: url('@images/safeProduction/底2.png');
    background-size: 100% 100%;
    width: 280px;
    height: 238px;
    position: absolute;
    left: 300px;
    bottom: 70px;
    padding: 16px;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }

      p {
        font-size: 14px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #FFFFFF;
        z-index: 0;

        i {
          font-size: 14px;
          font-weight: normal;
          line-height: 18px;
          letter-spacing: 0px;
          color: #6BDAFF;
          z-index: 1;
          margin-left: 8px;

        }
      }
    }
  }
}
</style>