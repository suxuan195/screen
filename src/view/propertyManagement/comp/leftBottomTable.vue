<template>
  <div class="leftCenterTable">
    <div class="mainTitle ttf">
<!--      <p>评估备案信息</p>-->
      <p>产权交易公告</p>
    </div>
    <div class="tableBox">
      <ScrollTable
        :tableData="state.tableData"
        :options="state.options"
      ></ScrollTable>
    </div>
  </div>
</template>

<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import {table} from "../temp/propertyRightsTransactionsData.js"
import { reactive } from "vue";
const state = reactive({
  options: [
    { prop: "code", label: "项目编号", width: "150" },
    { prop: "title", label: "标题 ", width: "450" },
    { prop: "date", label: "发布时间", width: "150" }
  ],
  tableData: table,
});
</script>

<style lang="scss" scoped>
.leftCenterTable {
  width: 420px;
  height: 292px;
  .tableBox {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%
      no-repeat;
    height: 210px;
    width: 420px;
  }
  .text {
    font-size: 14px;
    line-height: 24px;
    color: #dbf9ff;
    margin-bottom: 4px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .total {
      margin-left: 8px;
      font-size: 18px;
      color: #00ccff;
    }
    .unit {
      margin-left: 4px;
      font-size: 12px;
      color: #dbf9ff;
    }
  }
}
</style>
