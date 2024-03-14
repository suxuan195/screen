<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="应用服务器" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="400px" :tableHeader="state.tableHeader"
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
            "name": "资源中心服务器01",
            "cpu": "2",
            "memory": "4",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器02",
            "cpu": "2",
            "memory": "4",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器03",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器04",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器05",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器06",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "800",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器07",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "800",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器08",
            "cpu": "16",
            "memory": "32",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器09",
            "cpu": "16",
            "memory": "32",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器10",
            "cpu": "16",
            "memory": "48",
            "disk1": "100",
            "disk2": "1024",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器11",
            "cpu": "16",
            "memory": "64",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "2048",
            "disk4": "2048",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器12",
            "cpu": "16",
            "memory": "64",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "2048",
            "disk4": "2048",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器13",
            "cpu": "16",
            "memory": "64",
            "disk1": "100",
            "disk2": "2048",
            "disk3": "2048",
            "disk4": "2048",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器14",
            "cpu": "8",
            "memory": "32",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器15",
            "cpu": "8",
            "memory": "32",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器16",
            "cpu": "8",
            "memory": "32",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器17",
            "cpu": "8",
            "memory": "16",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器18",
            "cpu": "8",
            "memory": "16",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器19",
            "cpu": "8",
            "memory": "16",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器01",
            "cpu": "4",
            "memory": "8",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器02",
            "cpu": "4",
            "memory": "16",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器03",
            "cpu": "4",
            "memory": "16",
            "disk1": "100",
            "disk2": "300",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器04",
            "cpu": "8",
            "memory": "48",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器05",
            "cpu": "8",
            "memory": "48",
            "disk1": "100",
            "disk2": "500",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器06",
            "cpu": "8",
            "memory": "32",
            "disk1": "100",
            "disk2": "1024",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
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