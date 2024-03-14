<template>
  <div class="rightBottomChart">
    <ul class="menu">
      <li @click="tabClick(1)" :class="state.active === 1 ? 'active' : ''">
        产权转让按行业分布情况
      </li>
      <li style="margin-left: 8px" @click="tabClick(2)" :class="state.active === 2 ? 'active' : ''">
        产权转让按企业分布情况
      </li>
    </ul>
    <div class="tableX">
      <el-table :data="state.tableData" style="width: 100%" max-height="150px" :cell-style="cellStyle"
        class="custom-table" :header-cell-style="headerCellStyle" show-summary :summary-method="getSummaries">
        <template v-for="(item, index) in state.tableHeader" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" align="center"
            show-overflow-tooltip />
        </template>
      </el-table>
    </div>
    <div class="bottom_chart">
      <div class="left">
        <h2 class="ttf">成交宗数统计TOP5</h2>
        <CommonChart :option="state.option" :canvasWidth="334" :canvasHeight="130" :highlight="true" />
      </div>
      <div class="right">
        <h2 class="ttf">成交宗数统计TOP5</h2>
        <CommonChart :option="state.option" :canvasWidth="334" :canvasHeight="130" :highlight="true" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import CommonChart from "@components/Chart/ComonChart.vue";
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
const cellStyle = {
  background: 'rgba(18,50,86)',
  color: 'white',
  border: '2px solid #193362',
  padding: '4px 0'
}
const headerCellStyle = {
  borderTop: '2px solid #11518C',
  borderBottom: '2px solid #1D80CF', borderLeft: '2px solid',
  borderRight: '2px solid',
  borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */
}
const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = ''
    }
  })

  return sums
}

const state = reactive({
  active: 1,
  tableData: [
    {
      date: "2016-05",
      name: "中国石油化工股份有限公司",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "中国石油化工股份有限公司",
      address: "No. 189",
    },
  ],
  tableHeader: [
    {
      label: "成交宗数",
      width: "108",
      prop: "date",
    },
    {
      label: "宗数占比(%)",
      width: "120",
      prop: "address",
    },
    {
      label: "融资金额(万元)",
      width: "150",
      prop: "name3",
    },
    {
      label: "金额占比",
      width: "138",
      prop: "name4",
    },
    {
      label: "成溢价率",
      width: "140",
      prop: "name5",
    },
  ],
  option: {},
  list: [
    {
      name: "交通运输、仓储和邮政业",
      value: 20,
    },
    {
      name: "批发和零售业",
      value: 20,
    },
    {
      name: "采矿业",
      value: 20,
    },
    {
      name: "制造业",
      value: 20,
    },
    {
      name: "建筑业",
      value: 20,
    },
  ],
  colorEnum: [
    {
      r: 241,
      g: 96,
      b: 108,
    },
    {
      r: 38,
      g: 194,
      b: 150,
    },
    {
      r: 24,
      g: 102,
      b: 229,
    },
    {
      r: 246,
      g: 187,
      b: 59,
    },
    {
      r: 72,
      g: 214,
      b: 255,
    },
  ],
});
const getLocation = (dx, dy) => {
  const tanV = dx / dy;
  // 这里是在计算按照横向渐变还是按照纵向渐变。
  const directSign = Math.abs(tanV) < 1;
  const t = directSign ? tanV : 1 / tanV;

  const sign1 = t > 0 ? 1 : -1;
  const sign2 = dx > 0 ? 1 : -1;
  const sign = directSign ? sign1 * sign2 : sign2;

  // 把整个圆形的坐标映射到了[0-1]之间0.5，0.5即为圆心坐标。
  const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
  // 这里给纵向渐变还是横向渐变赋值、即group中的第三项和第四项的值
  const group2 = sign > 0 ? [0, 1] : [1, 0];
  const group = [...group1, ...group2];
  const keys = directSign ? ["x", "x2", "y", "y2"] : ["y", "y2", "x", "x2"];

  const res = {};
  keys.forEach((k, idx) => {
    res[k] = group[idx];
  });
  return res;
};
const getCoordinates = (startArc, endArc) => {
  // 这里计算扇形最外层的x,y坐标
  const position = [
    Math.sin(startArc),
    -Math.cos(startArc),
    Math.sin(endArc),
    -Math.cos(endArc),
  ];
  // 这里求得了最外层两个顶点坐标的差值。
  const dx = position[2] - position[0];
  const dy = position[3] - position[1];

  // 这里在根据两点坐标的差值计算x,y,x2,y2
  return getLocation(dx, dy);
};

const setGradientColorInItemSyle = (
  data,
  colorlist,
  startOpacity = 0,
  endOpacity = 1
) => {
  for (let i = 0; i < data.length; i++) {
    const color = colorlist[i];
    const startAngle = data[i].startAngle;
    const endAngle = data[i].endAngle;
    // 这里计算了 线性渐变的起止方向
    // @ts-ignore
    const coordinates = getCoordinates(startAngle, endAngle);
    data[i].itemStyle = {
      color: {
        ...coordinates,
        type: "linear",
        global: false,
        colorStops: [
          {
            offset: 0,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`,
          },
          {
            offset: 1,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`,
          },
        ],
      },
    };
  }
  return data;
};

const init = () => {
  const dataTotal = state.list.reduce((prev, curr) => prev + curr.value, 0);
  state.list.forEach((item, idx) => {
    item.percent = item.value / dataTotal;
    item.angle = item.percent * Math.PI * 2; // 弧度制的角度
    if (idx == 0) {
      item.startAngle = 0;
      item.endAngle = item.angle;
    } else {
      item.startAngle =
        state.list[idx - 1].startAngle + state.list[idx - 1].angle;
      item.endAngle = item.startAngle + item.angle;
    }
  });
  state.option = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
        const color = state.colorEnum[params.dataIndex];
        return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: centerImg,
            width: 64,
            height: 64,
          },
          left: "center",
          top: "40",
        },
      ],
    },
    series: [
      {
        type: "pie",
        selectedMode: "single",
        center: ["50%", "55%"],
        radius: ["65%", "75%"],
        label: {
          show: true, // 显示标签
          position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
          formatter: "{b}  {c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
          fontSize: 12, // 标签字体大小
          color: "#fff",
        },
        data: setGradientColorInItemSyle(state.list, state.colorEnum),
      },
    ],
  };
};
const tabClick = (val) => {
  state.active = val;
  setTableHeader();
};
const setTableHeader = () => {
  if (state.active === 1) {
    state.tableHeader = [
      {
        label: "所属行业",
        width: "200",
        prop: "name",
      },
      {
        label: "成交宗数",
        width: "108",
        prop: "date",
      },
      {
        label: "宗数占比(%)",
        width: "120",
        prop: "address",
      },
      {
        label: "融资金额(万元)",
        width: "150",
        prop: "name3",
      },
      {
        label: "金额占比",
        width: "138",
        prop: "name4",
      },
      {
        label: "成溢价率",
        width: "140",
        prop: "name5",
      },
    ];
  } else {
    state.tableHeader = [
      {
        label: "所属企业",
        width: "200",
        prop: "name",
      },
      {
        label: "成交宗数",
        width: "108",
        prop: "date",
      },
      {
        label: "宗数占比(%)",
        width: "120",
        prop: "address",
      },
      {
        label: "融资金额(万元)",
        width: "150",
        prop: "name3",
      },
      {
        label: "金额占比",
        width: "138",
        prop: "name4",
      },
      {
        label: "成溢价率",
        width: "140",
        prop: "name5",
      },
    ];
  }
};
onMounted(() => {
  init();
  window.addEventListener('resize', () => init())
  setTableHeader();
});



onUnmounted(() => {
  window.addEventListener('resize', () => null)
})
</script>
  
<style lang="scss" scoped>
.rightBottomChart {
  margin-top: 24px;
  padding: 21px 16px 10px;
  width: 888px;
  height: 332x;
  border-radius: 8px;
  background: url("@images/propertyMonitoringManagement/3.png");
  background-size: 100% 100%;
  box-sizing: border-box;

  .menu {
    display: flex;

    li {
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      letter-spacing: 0em;
      color: #ffffff;
      padding: 2px 5px;
      border-radius: 15px;
      cursor: pointer;
    }

    .active {
      border-radius: 15px;
      background: radial-gradient(68% 67% at 50% 50%,
          rgba(0, 22, 52, 0.15) 0%,
          #1766a1 100%);
      border-image: linear-gradient(358deg,
          #166cff 7%,
          rgba(209, 226, 255, 0.87) 17%,
          rgba(129, 206, 255, 0.76) 90%) 1;
    }
  }

  .tableX {
    margin-top: 18px;
    height: 150px;

    :deep(.custom-table) {
      .el-table__inner-wrapper::before {
        background: transparent;
      }

      .el-table__footer {
        tr>td:first-child {
          color: #00CCFF;
          font-size: 14px;
        }

        td {
          padding: 4px 0;
          background: rgba(18, 50, 86);
          color: white;
          border: 2px solid #193362;
        }
      }

      .el-table__header {
        th {
          padding: 4px 0;
          background: rgb(18, 50, 86);
          border: 2px solid rgb(25, 51, 98);
          color: #ffffff;
          font-size: 14px;
          font-weight: normal;
          line-height: normal;
          text-align: center;
          letter-spacing: 0em;
        }
      }

      /* 这里可以根据需要调整边框线的样式 */
    }
  }

  .bottom_chart {
    display: flex;
    justify-content: space-between;
    margin: 10px 40px 0;

    .left,
    .right {
      h2 {
        text-align: center;
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
  }
}
</style>>
  
  