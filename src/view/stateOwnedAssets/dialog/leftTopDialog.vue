<template>
    <div class="leftTopDialog">
        <Dialog :width="832" :height="438" :showModel="showModel" title="国有资产损失统计" @close="close">
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="350px" :tableHeader="state.tableHeader"
                :hasIndex="true"></custom-table>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import customTable from '@components/customTable/customTable.vue'
import { ref, reactive } from 'vue'
const showModel = ref(false)
const state = reactive({
    tableData: [{
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '1'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '2'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '3'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '4'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '5'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '6'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '7'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '8'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '9'
    }, {
        name: '70',
        price: '2023年9月15日党委常委会',
        date: '111'
    },],
    tableHeader: [
        {
            label: "企业名称",
            prop: "price",
            width: 150
        },
        {
            label: "违规问题类别",
            prop: "name",
            width: 150,
        },
        {
            label: "违规问题描述",
            prop: "date",
            width: 150,
        },
        {
            label: "定性时间",
            prop: "name",
            width: 120,
        },
        {
            label: "损失",
            prop: "name",
            width: 120,
        },
        {
            label: "损失风险",
            prop: "name",
            width: 150,
        },
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
.leftTopDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
