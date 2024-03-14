<template>
    <Dialog :width="1540" :height="518" :showModel="showModel" title="企业基本信息" @close="close">
        <div class="content">
            <leftNavList height="380px" maxHeight="380px" :list="state.list" />
            <div class="rightBox">
                <custom-table :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="405px" />
            </div>
        </div>
    </Dialog>
</template>
    
<script setup>
import { ref, reactive, onMounted } from "vue";
import Dialog from "@components/Dialog/index.vue";
import customTable from "@components/customTable/customTable.vue";
import leftNavList from "@components/leftNavList/leftNavList.vue";
const showModel = ref(false)
const state = reactive({
    list: [],
    tableHeader: [
        {
            label: '公司名称',
            prop: 'name1'
        },
        {
            label: '社会信用代码',
            prop: 'name2',
            width: 150
        },
        {
            label: '法人',
            prop: 'name3'
        },
        {
            label: '注册资本',
            prop: 'name1'
        },
        {
            label: '经营状态',
            prop: 'name2'
        },
        {
            label: '成立日期',
            prop: 'name3'
        },
        {
            label: '所属行政区',
            prop: 'name1',
            width: 150
        },
        {
            label: '企业类型',
            prop: 'name2'
        },
        {
            label: '所属行业',
            prop: 'name3'
        },
        {
            label: '登记机关',
            prop: 'name1'
        },
        {
            label: '注册地址',
            prop: 'name2'
        },
        {
            label: '其他',
            prop: 'name3'
        }
    ],
    tableData: []
})
const close = () => {
    showModel.value = false
}
onMounted(() => {
    for (let index = 0; index < 12; index++) {
        state.list.push({
            title: '我是企业名称我是企业名称' + index
        })
        state.tableData.push({
            name1: '白银有色集团股份有限公司',
            name2: '9162040066004 34445',
            name3: '甘肃省白银市白 银区'
        })
    }
})
defineExpose({
    showModel
});
</script>
    
<style lang="scss" scoped>
.content {
    padding: 34px 24px;
    display: flex;
    box-sizing: border-box;

    .rightBox {
        padding-left: 34px;
        width: calc(100% - 48px - 140px)
    }
}
</style>