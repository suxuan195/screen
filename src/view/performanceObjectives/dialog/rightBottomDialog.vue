<template>
    <div class="rightBottomDialog">
        <Dialog :width="1172" :height="438" :showModel="showModel" title="连续2年评级为A的单位" @close="close">
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
.rightBottomDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
