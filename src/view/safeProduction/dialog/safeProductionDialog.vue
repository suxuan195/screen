<template>
    <div class="safeProductionDialog">
        <Dialog :width="1332" :height="560" :showModel="showModel" title="异常情况" @close="close">
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="450px" :tableHeader="state.tableHeader"
                :hasIndex="true"></custom-table>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import customTable from '@components/customTable/customTable.vue'
import { ref, defineExpose, reactive } from 'vue'
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
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "事故领域",
            prop: "name",
            sortable: true,
            className: 'active',
            width: 120,
        },
        {
            label: "事件名称",
            prop: "date",
            sortable: true,
            width: 120,
        },
        {
            label: "事件类型",
            prop: "name",
            sortable: true,
            className: 'active',
            width: 120,
        },
        {
            label: "事件等级",
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "事件发生时间",
            prop: "name",
            width: 150,
            sortable: true
        },
        {
            label: "事件大类",
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "事件小类",
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "伤亡人数",
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "死亡人数",
            prop: "name",
            sortable: true,
            width: 120,
        },
        {
            label: "责任划分",
            prop: "name",
            sortable: true,
            width: 120,
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
.safeProductionDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
