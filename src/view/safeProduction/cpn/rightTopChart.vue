<template>
    <div class="rightTopChart">
        <ScrollTable :tableData="state.tableData" :options="state.tableHeader"
            :colorList="state.tableHeader.map(item => item.prop).slice(1)" :height="380">
        </ScrollTable>
    </div>
</template>
<script setup>
import ScrollTable from '@components/ScrollTable/index.vue'
import { reactive } from 'vue'
const state = reactive({
    tableData: [
        {
            sequence: "金川集团股份有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省国际物流集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省公路航空旅游投资集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "酒泉钢铁（集团）有限责任公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省民航机场集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省城乡发展投资集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "白银有色集团股份有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "兰州兰石集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省农垦集团有限责任公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省电力投资集团有限责任公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃省铁路投资建设集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃能化股份有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
        {
            sequence: "甘肃能源化工投资集团有限公司",
            companytName: 24,
            legalReviewError: 14,
            conferenceError: 20,
        },
    ],
    tableHeader: [
        { prop: "sequence", label: "企业名称", width: "120" },
        { prop: "companytName", label: "总数量", width: "100" },
        { prop: "legalReviewError", label: "伤亡人数", width: "80" },
        { prop: "conferenceError", label: "死亡人数", width: "80" },
    ],
})
</script>
    
<style lang="scss" scoped>
.rightTopChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 408px;
}
</style>