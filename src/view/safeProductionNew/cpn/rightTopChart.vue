<template>
  <div class="rightTopChart">
    <ScrollTable :height="380" :tableData="state.tableData">
    </ScrollTable>
  </div>
</template>
<script setup>
import ScrollTable from './safeScorllTable.vue'
import {reactive} from 'vue'

const state = reactive({
  tableData: [
    {
      sequence: "金川集团股份有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省国际物流集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "酒泉钢铁（集团）有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "白银有色集团股份有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "兰州兰石集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省农垦集团有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省民航机场集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省国有资产投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省建设投资（控股）集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省电力投资集团有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省公路航空旅游投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省城乡发展投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃能源化工投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃能化股份有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省铁路投资建设集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃工程咨询集团股份有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃电气装备集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省公路交通建设集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃科技投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "丝绸之路信息港股份有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃药业投资集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃文旅产业集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省水务发展集团有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃新盛国资管理运营有限公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省新业资产经营有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "白银有色产业集团有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "甘肃省长城建设集团有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    },
    {
      sequence: "丝绸之路国际知识产权港有限责任公司",
      mainLegalReviewError: 14,
      mainConferenceError: 20,
      regulatoryLegalReviewError: 14,
      regulatoryConferenceError: 20,
    }
  ],
  // tableHeader: [
  //     { prop: "sequence", label: "企业名称", width: "120" },
  //     {
  //       prop:"mainResponsibilities",label:"主要责任",width: "160",children:[
  //         { prop: "legalReviewError", label: "伤亡人数", width: "80" },
  //         { prop: "conferenceError", label: "死亡人数", width: "80" },
  //       ]
  //     },
  //     {
  //       prop:"regulatoryResponsibilities",label:"监管责任",width: "160",children:[
  //         { prop: "legalReviewError", label: "伤亡人数", width: "80" },
  //         { prop: "conferenceError", label: "死亡人数", width: "80" },
  //     ]
  //   }
  // ],
})
</script>

<style lang="scss" scoped>
.rightTopChart {
  background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  width: 432px;
  height: 408px;
}
</style>
