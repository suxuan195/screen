<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="服务器内存、磁盘使用情况" @close="close">
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
            width: 200
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
            "cpu": "9%",
            "memory": "27%",
            "disk1": "40%",
            "disk2": "18%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器02",
            "cpu": "10%",
            "memory": "25%",
            "disk1": "42%",
            "disk2": "16%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器03",
            "cpu": "11%",
            "memory": "22%",
            "disk1": "41%",
            "disk2": "21%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器04",
            "cpu": "12%",
            "memory": "25%",
            "disk1": "45%",
            "disk2": "22%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器05",
            "cpu": "13%",
            "memory": "26%",
            "disk1": "41%",
            "disk2": "18%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器06",
            "cpu": "14%",
            "memory": "29%",
            "disk1": "45%",
            "disk2": "19%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器07",
            "cpu": "15%",
            "memory": "27%",
            "disk1": "39%",
            "disk2": "26%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器08",
            "cpu": "16%",
            "memory": "25%",
            "disk1": "40%",
            "disk2": "16%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器09",
            "cpu": "17%",
            "memory": "22%",
            "disk1": "42%",
            "disk2": "18%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器10",
            "cpu": "18%",
            "memory": "25%",
            "disk1": "39%",
            "disk2": "20%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器11",
            "cpu": "19%",
            "memory": "26%",
            "disk1": "40%",
            "disk2": "27%",
            "disk3": "10%",
            "disk4": "0%",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器12",
            "cpu": "12%",
            "memory": "29%",
            "disk1": "42%",
            "disk2": "22%",
            "disk3": "0%",
            "disk4": "0%",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器13",
            "cpu": "13%",
            "memory": "27%",
            "disk1": "39%",
            "disk2": "19%",
            "disk3": "0%",
            "disk4": "0%",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器14",
            "cpu": "14%",
            "memory": "25%",
            "disk1": "40%",
            "disk2": "31%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器15",
            "cpu": "15%",
            "memory": "22%",
            "disk1": "41%",
            "disk2": "44%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器16",
            "cpu": "16%",
            "memory": "25%",
            "disk1": "39%",
            "disk2": "36%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器17",
            "cpu": "17%",
            "memory": "26%",
            "disk1": "44%",
            "disk2": "12%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器18",
            "cpu": "12%",
            "memory": "29%",
            "disk1": "36%",
            "disk2": "26%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "资源中心服务器19",
            "cpu": "13%",
            "memory": "27%",
            "disk1": "38%",
            "disk2": "16%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器01",
            "cpu": "14%",
            "memory": "25%",
            "disk1": "41%",
            "disk2": "18%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器02",
            "cpu": "15%",
            "memory": "22%",
            "disk1": "44%",
            "disk2": "20%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器03",
            "cpu": "16%",
            "memory": "25%",
            "disk1": "36%",
            "disk2": "22%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器04",
            "cpu": "17%",
            "memory": "26%",
            "disk1": "41%",
            "disk2": "15%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器05",
            "cpu": "16%",
            "memory": "29%",
            "disk1": "39%",
            "disk2": "10%",
            "disk3": "",
            "disk4": "",
            "system": "麒麟V10"
        },
        {
            "name": "业务应用服务器06",
            "cpu": "17%",
            "memory": "25%",
            "disk1": "37%",
            "disk2": "20%",
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