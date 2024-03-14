<template>
    <popup :width="1400" :height="500" title="企业主要工业产品产量分布信息" :showModel="props.showModel">
        <customTable :tableHeader="state.tableHeader" :tableData="props.tableData" maxHeight="400px" class="tableX">
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
    },
    tableData: {
        type: Array,
        default() {
            return [
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "1",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "2",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "3",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "4",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "5",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "6",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "7",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "8",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "9",
                },
                {
                    date: "2016-05",
                    name: "中国石油化工股份有限公司",
                    address: "10",
                },
            ]
        }
    }
})
const state = reactive({
    tableHeader: [
        {
            label: "月份",
            width: "120",
            prop: "month",
        },
        {
            label: "企业名称",
            prop: "enterpriseName",
            width: '312'
        },
        {
            label: "产品名称",
            prop: "productName",
            width: '240'
        },
        {
            label: "产品单位",
            prop: "productuUnit",
            width: '120'
        },
        {
            label: "本月产量",
            prop: "productionThisMonth",
            width: '120'
        },
        {
            label: "上月产量",
            prop: "lastMonth",
            width: '120'
        },
        {
            label: "本年累计产量",
            prop: "yearTotal",
            width: '120'
        }, {
            label: "上年同期产量",
            prop: "ConteProduction",
            width: '120'
        }, {
            label: "同比%",
            prop: "YOY",
            width: '120'
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