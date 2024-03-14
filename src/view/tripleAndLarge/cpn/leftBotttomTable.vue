<template>
    <div class="leftBottomChart">
        <ScrollTable :tableData="state.tableData" :options="state.options"
            :colorList="state.options.map(item => item.prop).slice(1)" :height="140" @rowClick="rowClick"></ScrollTable>
        <!-- 异常信息列表 -->
        <errorInfoListDialog :showModel="state.showModel" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import ScrollTable from "@/components/ScrollTable/index.vue";
import errorInfoListDialog from "../popup/errorInfoListDialog.vue";
import emitBus from "@utils/bus";
const state = reactive({
    options: [
        { prop: "sequence", label: "序列", width: "80" },
        { prop: "companytName", label: "企业名称", width: "200" },
        { prop: "legalReviewError", label: "法律审核异常", width: "150" },
        { prop: "conferenceError", label: "会议召开异常", width: "150" },
        { prop: "partyCommittee", label: "党委会未前置", width: "150" },
        { prop: "decisionSequenceError", label: "决策顺序异常", width: "150" },
        { prop: "issueVotingError", label: "议题表决异常", width: "150" },
    ],
    tableData: [
        {
            sequence: "1",
            companytName: "甘肃省公路航空旅游投资集I",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
        {
            sequence: "2",
            companytName: "甘肃省建设投资（控股）集I",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
        {
            sequence: "3",
            companytName: "金川集团股份有限公司",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
        {
            sequence: "4",
            companytName: "酒泉钢铁（集团）有限责任",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
        {
            sequence: "5",
            companytName: "酒泉钢铁（集团）有限责任",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
        {
            sequence: "6",
            companytName: "酒泉钢铁（集团）有限责任",
            legalReviewError: 1,
            conferenceError: 2,
            partyCommittee: 3,
            decisionSequenceError: 8,
            issueVotingError: 7
        },
    ],
    showModel: false
});
const rowClick = () => {
    state.showModel = true
}

onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
})
</script>
    
<style lang="scss" scoped>
.leftBottomChart {
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    width: 888px;
    height: 183px;
    box-sizing: border-box;
    margin-bottom: 50px;
}
</style>
