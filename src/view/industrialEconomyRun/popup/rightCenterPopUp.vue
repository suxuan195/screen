<template>
    <div>
        <popup :width="1450" :height="500" title="价格走势" :showModel="props.showModel" :isButtonShow="true"
            :month="props.currentIndex">
            <customTable :tableHeader="state.tableHeader" :tableData="props.tableData" maxHeight="400px" class="tableX">
            </customTable>
        </popup>
    </div>
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
        defaut() {
            return []
        }
    },
    currentIndex: {
        type: Number,
        default: 0
    }
})
const state = reactive({
    tableHeader: [
        {
            label: "企业名称",
            width: "100",
            prop: "name",
        },
        {
            label: "主要产品",
            width: "100",
            prop: "mainProducts",
        },
        {
            label: "产品销售价格（不含税，元/吨）",
            width: "100",
            prop: "no_name",
            children: [
                {
                    label: "本月平均价格",
                    width: "100",
                    prop: "no_bAveragePrice",
                },
                {
                    label: "上月平均价格",
                    width: "100",
                    prop: "no_sAveragePrice",
                },
                {
                    label: "环比%",
                    width: "100",
                    prop: "no_QOQ",
                },
                {
                    label: "本年累计平均价格",
                    width: "100",
                    prop: "no_yearAveragePrice",
                },
                {
                    label: "上年累计平均价格",
                    width: "100",
                    prop: "no_lastYearAveragePrice",
                },
                {
                    label: "同比%",
                    width: "100",
                    prop: "no_YOY",
                }
            ]
        },
        {
            label: "产品销售价格（含税，元/吨）",
            width: "100",
            prop: "contain_name",
            children: [
                {
                    label: "本月平均价格",
                    width: "100",
                    prop: "contain_bAveragePrice",
                },
                {
                    label: "上月平均价格",
                    width: "100",
                    prop: "contain_sAveragePrice",
                },
                {
                    label: "环比%",
                    width: "100",
                    prop: "contain_QOQ",
                },
                {
                    label: "本年累计平均价格",
                    width: "100",
                    prop: "contain_yearAveragePrice",
                },
                {
                    label: "上年累计平均价格",
                    width: "100",
                    prop: "contain_lastYearAveragePrice",
                },
                {
                    label: "同比%",
                    width: "100",
                    prop: "contain_YOY",
                }
            ]
        },
    ],
})
</script>
    
<style lang="scss" scoped>
.tableX {
    padding: 30px;
}

.custom-table {
    .el-table__inner-wrapper::before {
        background: transparent;
    }

    .el-table__header {
        th {
            background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
            border-color: #0c223a;
            color: #ffffff;
            font-size: 14px;
            font-weight: normal;
            line-height: normal;
            text-align: center;
            letter-spacing: 0em;
        }
    }

    /* 这里可以根据需要调整边框线的样式 */
}
</style>