<template>
    <Dialog :width="1000" :height="500" :showModel="showModel" title="职工养老保险缴纳统计情况" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="400px" :tableHeader="state.tableHeader"
                :has-Index="true"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { centerDialogData } from '../data/analogData';

const showModel = ref(false);
const state = reactive({
    tableData: centerDialogData,
    tableHeader: [
        {
            label: '企业名称',
            prop: 'enterpriseName'
        },
        {
            label: '基本养老保险',
            children: [
                {
                    label: '个人缴费',
                    prop: 'thatPerson'
                },
                {
                    label: '企业缴费',
                    prop: 'enterprise'
                }
            ]
        }
    ]
})
const close = () => {
    showModel.value = false;
};
defineExpose({
    showModel,
});
</script>
    
<style></style>