<template>
    <popup :width="1200" :height="500" title="生产线/系统运行情况" :showModel="props.showModel" :isButtonShow="true"
        :month="state.month">
        <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="400px" class="tableX">
        </customTable>
    </popup>
</template>
    
<script setup>
import { onMounted, reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'
import emitBus from "@utils/bus";
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    tableData: [],
    tableData7: [
        {
            name: "金川集团",
            number: "GB-01R",
            plannedMaintenanceTime: '2023.7.4-2023.7.20',
            impactProduction: '100',
            actualMaintenanceTime: '',
            Output: '',
            name_phone: '',
            remark: ""
        },
    ],
    tableData8: [
        {
            name: "白银集团",
            number: "GB-03L",
            plannedMaintenanceTime: '2023.8.1-2023.8.23',
            impactProduction: '50',
            actualMaintenanceTime: '',
            Output: '',
            name_phone: '',
            remark: ""
        },
    ],
    tableData9: [
        {
            name: "金川集团",
            number: "GB-01R",
            plannedMaintenanceTime: '2023.9.26-2023.9.29',
            impactProduction: '2000',
            actualMaintenanceTime: '',
            Output: '',
            name_phone: 'xxx　xxx',
            remark: ""
        },
        {
            name: "酒钢集团",
            number: "GB-02F",
            plannedMaintenanceTime: '2023.9.29-2023.10.3',
            impactProduction: '2000',
            actualMaintenanceTime: '100',
            Output: '',
            name_phone: '',
            remark: ""
        },
    ],
    tableHeader: [
        {
            label: "企业名称",
            width: "100",
            prop: "name",
        },
        {
            label: "生产线(系统)编号",
            prop: "number",
            width: '312'
        },
        {
            label: "计划检修时间",
            prop: "plannedMaintenanceTime",
            width: '240'
        },
        {
            label: "预估影响产量",
            prop: "impactProduction",
            width: '120'
        },
        {
            label: "实际检修时间",
            prop: "actualMaintenanceTime",
            width: '120'
        },
        {
            label: "实际影响产量",
            prop: "Output",
            width: '120'
        },
        {
            label: "联系人及联系方式",
            prop: "name_phone",
            width: '200'
        }, {
            label: "备注",
            prop: "remark",
            width: '120'
        },
    ],
    month: 7
})
onMounted(() => {
    state.tableData = state.tableData7
    emitBus.on("buttonClick", (val) => {
        state.month += val
        if (state.month < 7) {
            state.month = 7
        } else if (state.month > 9) {
            state.month = 9
        }
        state.tableData = state[`tableData${state.month}`]
    });
})

</script>
    
<style lang="scss" scoped>
.tableX {
    padding: 30px;
    box-sizing: border-box;
}
</style>