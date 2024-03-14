<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="服务器I/O情况" @close="close">
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
            label: "MB_read/s(MB)",
            prop: "reads",
        },
        {
            label: "MB_wrtn/s(MB)",
            prop: "wrtns",
        },
        {
            label: "MB_read(MB)",
            prop: "read",
        },
        {
            label: "MB_wrtn(MB)",
            prop: "wrtn",
        },
    ],
    tableData: [
        {
            "name": "资源中心服务器01",
            "reads": "0.09",
            "wrtns": "0.11",
            "read": "666639",
            "wrtn": "736608"
        },
        {
            "name": "资源中心服务器02",
            "reads": "0.08",
            "wrtns": "0.25",
            "read": "43687",
            "wrtn": "53687"
        },
        {
            "name": "资源中心服务器03",
            "reads": "0.16",
            "wrtns": "0.26",
            "read": "35661",
            "wrtn": "42661"
        },
        {
            "name": "资源中心服务器04",
            "reads": "0.09",
            "wrtns": "0.38",
            "read": "768561",
            "wrtn": "778561"
        },
        {
            "name": "资源中心服务器05",
            "reads": "0.11",
            "wrtns": "0.66",
            "read": "365541",
            "wrtn": "372141"
        },
        {
            "name": "资源中心服务器06",
            "reads": "0.13",
            "wrtns": "0.87",
            "read": "23699",
            "wrtn": "25639"
        },
        {
            "name": "资源中心服务器07",
            "reads": "0.16",
            "wrtns": "0.22",
            "read": "38556",
            "wrtn": "39256"
        },
        {
            "name": "资源中心服务器08",
            "reads": "0.28",
            "wrtns": "0.33",
            "read": "221555",
            "wrtn": "229555"
        },
        {
            "name": "资源中心服务器09",
            "reads": "0.12",
            "wrtns": "0.15",
            "read": "361889",
            "wrtn": "371889"
        },
        {
            "name": "资源中心服务器10",
            "reads": "0.09",
            "wrtns": "0.36",
            "read": "985112",
            "wrtn": "995112"
        },
        {
            "name": "资源中心服务器11",
            "reads": "0.11",
            "wrtns": "0.32",
            "read": "22111",
            "wrtn": "22711"
        },
        {
            "name": "资源中心服务器12",
            "reads": "0.13",
            "wrtns": "0.17",
            "read": "366521",
            "wrtn": "376521"
        },
        {
            "name": "资源中心服务器13",
            "reads": "0.23",
            "wrtns": "0.19",
            "read": "32684",
            "wrtn": "33902"
        },
        {
            "name": "资源中心服务器14",
            "reads": "0.29",
            "wrtns": "0.36",
            "read": "66639",
            "wrtn": "67609"
        },
        {
            "name": "资源中心服务器15",
            "reads": "0.19",
            "wrtns": "0.11",
            "read": "36698",
            "wrtn": "38698"
        },
        {
            "name": "资源中心服务器16",
            "reads": "0.19",
            "wrtns": "0.28",
            "read": "745611",
            "wrtn": "735611"
        },
        {
            "name": "资源中心服务器17",
            "reads": "0.19",
            "wrtns": "0.26",
            "read": "346188",
            "wrtn": "356119"
        },
        {
            "name": "资源中心服务器18",
            "reads": "0.09",
            "wrtns": "0.33",
            "read": "986511",
            "wrtn": "99006"
        },
        {
            "name": "资源中心服务器19",
            "reads": "0.19",
            "wrtns": "0.23",
            "read": "36699",
            "wrtn": "38279"
        },
        {
            "name": "业务应用服务器01",
            "reads": "0.09",
            "wrtns": "0.21",
            "read": "666639",
            "wrtn": "736608"
        },
        {
            "name": "业务应用服务器02",
            "reads": "0.06",
            "wrtns": "0.36",
            "read": "632257",
            "wrtn": "795123"
        },
        {
            "name": "业务应用服务器03",
            "reads": "0.08",
            "wrtns": "0.11",
            "read": "456332",
            "wrtn": "532614"
        },
        {
            "name": "业务应用服务器04",
            "reads": "0.07",
            "wrtns": "0.15",
            "read": "135692",
            "wrtn": "231657"
        },
        {
            "name": "业务应用服务器05",
            "reads": "0.11",
            "wrtns": "0.22",
            "read": "298866",
            "wrtn": "300152"
        },
        {
            "name": "业务应用服务器06",
            "reads": "0.12",
            "wrtns": "0.18",
            "read": "316489",
            "wrtn": "320038"
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