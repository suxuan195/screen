<template>
    <popup :width="1200" :height="500" title="企业主要工业产品超(欠)信息" :showModel="props.showModel">
        <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="400px" class="tableX">
        </customTable>
    </popup>
</template>
    
<script setup>
import { reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    tableData: [
        {
            name: "金川",
            accOutputValue: "1649.35",
            plannedOutputValue: "2472.68",
            overProductionValue: '欠823.33'
        },
        {
            name: "酒钢",
            accOutputValue: "758.43",
            plannedOutputValue: "1086.76",
            overProductionValue: '欠328.33'
        },
        {
            name: "白银",
            accOutputValue: "257.68",
            plannedOutputValue: "393.58",
            overProductionValue: '欠135.9'
        },
        {
            name: "农垦",
            accOutputValue: "14.29",
            plannedOutputValue: "23.63",
            overProductionValue: '欠9.34'
        },
        {
            name: "建投",
            accOutputValue: "18.64",
            plannedOutputValue: "32.8",
            overProductionValue: '欠14.16'
        },
        {
            name: "能化",
            accOutputValue: "10.62",
            plannedOutputValue: "17.78",
            overProductionValue: '欠7.16'
        },
        {
            name: "兰石",
            accOutputValue: "41.86",
            plannedOutputValue: "62.43",
            overProductionValue: '欠20.57'
        },
        {
            name: "电投",
            accOutputValue: "75.1",
            plannedOutputValue: "116.46",
            overProductionValue: '欠41.36'
        },
        {
            name: "国投",
            accOutputValue: "4.52",
            plannedOutputValue: "9.26",
            overProductionValue: '欠4.74'
        },
        {
            name: "电气",
            accOutputValue: "38.34",
            plannedOutputValue: "55.51",
            overProductionValue: '欠17.17'
        },
        {
            name: "科投",
            accOutputValue: "8.72",
            plannedOutputValue: "12.19",
            overProductionValue: '欠3.47'
        },
        {
            name: "药投",
            accOutputValue: "7.2",
            plannedOutputValue: "10.79",
            overProductionValue: '欠3.59'
        },
        {
            name: "能化股份",
            accOutputValue: "80.36",
            plannedOutputValue: "116.49",
            overProductionValue: '欠36.13'
        },
    ],
    tableHeader: [
        {
            label: "企业名称",
            width: "300",
            prop: "name",
        },
        {
            label: "本年累计产值(亿元)",
            prop: "accOutputValue",
            width: '300'
        },
        {
            label: "本年计划产值(亿元)",
            prop: "plannedOutputValue",
            width: '300'
        },
        {
            label: "超（欠）产值(亿元)",
            prop: "overProductionValue",
            width: '300'
        },
    ],
})
</script>
    
<style lang="scss" scoped>
.tableX {
    padding: 30px;
    box-sizing: border-box;
}
</style>