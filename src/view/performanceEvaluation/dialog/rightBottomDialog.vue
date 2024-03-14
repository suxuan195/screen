<template>
    <div class="rightBottomDialog">
        <Dialog :width="1332" :height="400" :showModel="showModel" title="统计情况" @close="close">
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="450px"
                :tableHeader="state.tableHeader"></custom-table>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import customTable from '@components/customTable/customTable.vue'
import { ref, defineExpose, reactive } from 'vue'
const showModel = ref(false)
const state = reactive({
    tableHeader: [
        {
            prop: 'title',
            width: 150
        },
        {
            label: "1月",
            prop: "month1",
        },
        {
            label: "2月",
            prop: "month2",
        },
        {
            label: "3月",
            prop: "month3",
        },
        {
            label: "4月",
            prop: "month4",
        },
        {
            label: "5月",
            prop: "month5",
        },
        {
            label: "6月",
            prop: "month6",
        },
        {
            label: "7月",
            prop: "month7",
        },
        {
            label: "8月",
            prop: "month8",
        },
        {
            label: "9月",
            prop: "month9",
        },
        {
            label: "10月",
            prop: "month10",
        },
        {
            label: "11月",
            prop: "month11",
        },
        {
            label: "12月",
            prop: "month12",
        },
    ],
    tableData: [
        {
            title: '净资产收益率',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '总资产报酬率',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '营业利润率',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '盈余现金保障倍数',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '成本费用利用率',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        },
        {
            title: '资本收益率',
            month1: '22%',
            month2: '21%',
            month3: '2%',
            month4: '12%',
            month5: '16%',
            month6: '33%',
            month7: '55%',
            month8: '66%',
            month9: '45%',
            month10: '12%',
            month11: '3%',
            month12: '8%'
        }
    ],
})
const close = () => {
    showModel.value = false
}
defineExpose({
    showModel
})
</script>
    
<style lang="scss" scoped>
.rightBottomDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
