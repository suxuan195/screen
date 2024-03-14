<template>
    <div class="leftBottomChart">
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options"
                :colorList="state.options.map(item => item.prop).slice(1)" :height="210">
            </ScrollTable>
        </div>
    </div>
</template>
    

<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "sequence", label: "行业名称", width: "120" },
        { prop: "companytName", label: "项目数", width: "100" },
        { prop: "proportion", label: "投资总额", width: "120" },
        { prop: "proportion", label: "年度计划投资", width: "120" },
    ],
    tableData: [
        {
            sequence: "投资类",
            companytName: "甘肃省公路航空旅游投资集I",
            proportion: "95.90 ",
        },
        {
            sequence: "投资类",
            companytName: "甘肃省建设投资（控股）集I",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "金川集团股份有限公司",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
    ],
});
</script>
    
<style lang="scss" scoped>
.leftBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 230px;
    box-sizing: border-box;
    margin-bottom: 50px;
}
</style>