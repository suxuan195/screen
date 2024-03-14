<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="数据库内存、磁盘使用情况" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="360px" :tableHeader="state.tableHeader"
                :hasIndex="true"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
const showModel = ref(false);
const state = reactive({
    tableHeader: [
        {
            label: "服务器名称",
            prop: "name",
            width: 200
        },
        {
            label: "CPU(占用)",
            prop: "cpu",
        },
        {
            label: "内存（占用）",
            prop: "memory",
        },
        {
            label: "磁盘1（已使用）",
            prop: "disk1",
        },
        {
            label: "磁盘2（已使用）",
            prop: "disk2",
        },
        {
            label: "磁盘3（已使用）",
            prop: "disk3",
        },
        {
            label: "磁盘4（已使用）",
            prop: "disk4",
        },
        {
            label: "操作系统",
            prop: "system",
        }
    ],
    tableData: [
        {
            name: "数据库服务器01",
            cpu: "10%",
            memory: "54%",
            disk1: "40%",
            disk2: "30%",
            disk3: "0%",
            disk4: "0%",
            system: "银河麒麟V10"
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