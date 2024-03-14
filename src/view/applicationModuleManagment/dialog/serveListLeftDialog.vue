<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="数据库" @close="close">
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
        },
        {
            label: "CPU(核心）",
            prop: "cpu",
        },
        {
            label: "内存（G）",
            prop: "memory",
        },
        {
            label: "磁盘1（G）",
            prop: "disk1",
        },
        {
            label: "磁盘2（G）",
            prop: "disk2",
        },
        {
            label: "磁盘3（G）",
            prop: "disk3",
        },
        {
            label: "磁盘4（G）",
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
            cpu: "32",
            memory: "64",
            disk1: "100",
            disk2: "2048",
            disk3: "2048",
            disk4: "2048",
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