<template>
    <div class="centerBottomTable">
        <navTitle title='省列重点项目' />
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options" :height="190">
            </ScrollTable>
        </div>
    </div>
</template>
    

<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "sequence", label: "企业名称", width: "120" },
        { prop: "companytName", label: "行业类型", width: "100" },
        { prop: "proportion", label: "项目名称", width: "200" },
        { prop: "proportion", label: "当年计划投资", width: "150" },
        { prop: "proportion", label: "当年已完成投资", width: "150" },
        { prop: "proportion", label: "完成比例", width: "120" },
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
.centerBottomTable {

    margin-bottom: 50px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 36px;

    .tableBox {
        background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
        width: 864px;
        height: 210px;
        box-sizing: border-box;
    }
}
</style>