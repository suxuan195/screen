<template>
  <div class="rightTopChart">
    <div class="mainTitle ttf">
      <p>贯彻落实领导重要指示批示明细</p>
    </div>
    <div class="chart">
      <ScrollTable :hasIndex="true" :tableData="state.tableData" :options="state.options" :height="488"></ScrollTable>
    </div>
  </div>
</template>
  
<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
  options: [
    { prop: "name", label: "企业名称", width: "140" },
    { prop: "count", label: "涉及会议数", width: "0" },
    { prop: "num", label: "涉及议题数", width: "0" },
  ],
  tableData: [
    {
      name: "金川集团股份有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省国际物流集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "酒泉钢铁（集团）有限责任公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "白银有色集团股份有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "兰州兰石集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省农垦集团有限责任公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省民航机场集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省国有资产投资集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省建设投资（控股）集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省电力投资集团有限责任公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省公路航空旅游投资集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省城乡发展投资集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃能源化工投资集团有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃能化股份有限公司",
      count: 7676,
      num: 5222,
    },
    {
      name: "甘肃省铁路投资建设集团有限公司",
      count: 7676,
      num: 5222,
    }, {
      name: "甘肃工程咨询集团股份有限公司",
      count: 7676,
      num: 5222,
    },
  ],
});
</script>
  
<style lang="scss" scoped>
.rightTopChart {
  margin-bottom: 50px;

  .chart {
    width: 420px;
    height: 516px;
    padding: 2px;
    box-sizing: border-box;
    background: url("@images/indicate/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
  }
}
</style>
  