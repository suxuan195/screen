<template>
    <div class="leftBottomChart">
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options" :otherColorList="['proportion']"
                :colorList="['companytName']">
            </ScrollTable>
        </div>
    </div>
</template>
    

<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "sequence", label: "序列", width: "80" },
        { prop: "companytName", label: "企业名称", width: "200" },
        { prop: "proportion", label: "占比", width: "80" },
    ],
    tableData: [
        {
            sequence: "1",
            companytName: "甘肃省公路航空旅游投资集I",
            proportion: "95.90 ",
        },
        {
            sequence: "2",
            companytName: "甘肃省建设投资（控股）集I",
            proportion: "95.90",
        },
        {
            sequence: "3",
            companytName: "金川集团股份有限公司",
            proportion: "95.90",
        },
        {
            sequence: "4",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "5",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "6",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
    ],
});
</script>
    
<style lang="scss" scoped>
.leftBottomChart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 206px;
    box-sizing: border-box;
    margin-bottom: 50px;
}
</style>