<template>
    <Dialog :width="1540" :height="518" :showModel="showModel" title="企业基本信息" @close="close" :isBack="true"
        @goBack="goBack">
        <div class="content">
            <leftNavList height="380px" maxHeight="380px" :list="state.list" />
            <div class="rightBox">
                <custom-table :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="405px"
                    :hasIndex="true" />
            </div>
        </div>
    </Dialog>
</template>
    
<script setup>
import { ref, reactive, onMounted } from "vue";
import Dialog from '@components/Dialog/index.vue'
import customTable from "@components/customTable/customTable.vue";
import leftNavList from "@components/leftNavList/leftNavList.vue";
const showModel = ref(false)
const state = reactive({
    list: [],
    tableHeader: [
        {
            label: '姓名',
            prop: 'name'
        },
        {
            label: '性别',
            prop: 'sex',
            width: 150
        },
        {
            label: '名族',
            prop: 'familialClan'
        },
        {
            label: '出生年月',
            prop: 'dateOfBirth'
        },
        {
            label: '政治面貌',
            prop: 'politicalOutlook'
        },
        {
            label: '全日制教育',
            children: [
                {
                    label: '学历',
                    prop: 'fullTimeeducation'
                },
                {
                    label: '学位',
                    prop: 'fullTimeacademicDegree'
                },
                {
                    label: '毕业院校',
                    prop: "fullTimefraduationInstitution"
                },
                {
                    label: '专业',
                    prop: 'fullTimespeciality'
                }
            ]
        },
        {
            label: '在职教育',
            children: [
                {
                    label: '学历',
                    prop: 'onTheJobeducation'
                },
                {
                    label: '学位',
                    prop: 'onTheJobacademicDegree'
                },
                {
                    label: '毕业院校',
                    prop: "onTheJobfraduationInstitution"
                },
                {
                    label: '专业',
                    prop: 'onTheJobspeciality'
                }
            ]
        }
    ],
    tableData: [
    ]
})
const close = () => {
    showModel.value = false
}
const goBack = () => {
    console.log('返回上一步');
    // showModel.value = false
}
onMounted(() => {
    for (let index = 0; index < 12; index++) {
        state.list.push({
            title: '中国铁路二十二局' + index
        })
        state.tableData.push({
            name: '李白',
            sex: '男',
            familialClan: '汉',
            dateOfBirth: '2020-4-5',
            politicalOutlook: '中共党员',
            fullTimeeducation: '研究生',
            fullTimeacademicDegree: '博士后',
            fullTimefraduationInstitution: '中南大学',
            fullTimespeciality: '外交专业',
            onTheJobeducation: '本科',
            onTheJobacademicDegree: '学士',
            onTheJobfraduationInstitution: '上海交通大学',
            onTheJobspeciality: '临床医学'
        },)
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