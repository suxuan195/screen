<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>交易信息播报</p>
    </div>
    <div class="tableX">
      <el-table :data="state.tableData" style="width: 100%" max-height="250px" :cell-style="{
        background: '#12325F',
        color: 'white',
        border: '2px solid #193362',
        padding: '4px 0'
      }" class="custom-table" :header-cell-style="{
  borderTop: '2px solid #11518C',
  borderBottom: '2px solid #1D80CF', borderLeft: '2px solid',
  borderRight: '2px solid',
  borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */

}">
        <template v-for="(item, index) in state.tableHeader" :key="index">
          <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label" :width="item.width"
            align="center" />
        </template>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
  tableData: [
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
    {
      date: "2016-05",
      name: "Tom",
      address: "No. 189",
    },
  ],
  tableHeader: [
    {
      label: "项目名称",
      width: "225",
      prop: "name",
    },
    {
      label: "标的名称",
      width: "110",
      prop: "date",
    },
    {
      label: "转让方名称",
      width: "120",
      prop: "address",
    },
    {
      label: "转让方类型",
      width: "120",
      prop: "name3",
    },
    {
      label: "评估值（万元）",
      width: "130",
      prop: "name4",
    },
    {
      label: "成交金额（万元）",
      width: "143",
      prop: "name5",
    },
  ],
});
</script>

<style lang="scss" scoped>
.leftTopChart {
  .mainTitle {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 419px;
    height: 70px;
    padding-left: 75px;

    p {
      font-size: 24px;
      font-weight: normal;
      line-height: 40px;
      letter-spacing: 0.2em;
      background: linear-gradient(180deg,
          #ffffff 0%,
          #ffffff 52%,
          #90d1ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
  }

  .tableX {
    padding: 16px 20px;
    width: 888px;
    height: 280px;
    border-radius: 8px;
    background: url("@images/propertyMonitoringManagement/1.png");
    background-size: 100% 100%;
    box-sizing: border-box;

    :deep(.custom-table) {
      .el-table__header {
        th {
          background: linear-gradient(to bottom, rgba(12, 66, 111) 50%, rgba(15, 38, 70, 1) 100%);
          border-color: #0c223a;
          color: #ffffff;
          font-size: 14px;
          font-weight: normal;
          line-height: normal;
          text-align: center;
          letter-spacing: 0em;
          padding: 4px 0;
        }
      }

      /* 这里可以根据需要调整边框线的样式 */
    }
  }
}

:deep(.el-table__inner-wrapper::before) {
  display: none !important;
}
</style>

