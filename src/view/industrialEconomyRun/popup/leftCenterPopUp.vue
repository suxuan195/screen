<template>
    <popup :width="1250" :height="500" title="企业产值信息" :showModel="props.showModel">
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
            label: "企业名称",
            prop: "enterpriseName",
            width: '200'
        },
        {
            label: "本年累计产值(亿元)",
            prop: "yearTotal",
            width: '150'
        }, {
            label: "上年同期产值(亿元)",
            prop: "ConteProduction",
            width: '150'
        },
        {
            label: "本年目标产值(亿元)",
            prop: "targetOutPutValue",
            width: '150'
        },
        {
            label: "同比%",
            prop: "YOY",
            width: '120'
        },
        {
            label: "本月产值(亿元)",
            prop: "monthValue",
            width: '150'
        },
        {
            label: "上月产值(亿元)",
            prop: "lastMonthValue",
            width: '150'
        },
        {
            label: "环比%",
            prop: "QOQ",
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