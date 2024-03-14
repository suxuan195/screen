<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="职工性别分布" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="400px" :tableHeader="state.tableHeader"
                :has-Index="true"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive, onMounted } from "vue";
import { leftTopChartDialogData } from '../data/analogData'
const showModel = ref(false);
const state = reactive({
    tableHeader: [
        {
            label: "企业名称",
            prop: "corporateName",
            width: 200
        },
        {
            label: "姓名",
            prop: "name",
        },
        {
            label: "职务",
            prop: "duties",
            width: 150
        },
        {
            label: "性别",
            prop: "gender",
        },
        {
            label: "民族",
            prop: "nation",
        },
        {
            label: "出生年月",
            prop: "birthDate",
            width: 150
        },
        {
            label: "籍贯",
            prop: "nativePlace",
            width: 150
        },
        {
            label: "政治面貌",
            prop: "politicaloutlook",
            width: 150
        },
        {
            label: "全日制学历（最高学历）",
            prop: "fullTtimeEducation",
            width: 200
        },
        {
            label: "全日制学位（最高学位）",
            prop: "fullTimeDegree",
            width: 200
        },
        {
            label: "全日制学历毕业院校及专业",
            prop: " fullTimeSchool",
            width: 200
        },
        {
            label: "在职教育学历（最高学历）",
            prop: "inServiceEducation",
            width: 200
        },
        {
            label: "在职教育学位（最高学位）",
            prop: "inServiceEducationDegree",
            width: 200
        },
        {
            label: "在职教育学历毕业院校及专业",
            prop: "graduationInServiceEducation",
            width: 250
        },
        {
            label: "参加工作时间",
            prop: 'date',
            width: 150
        },
        {
            label: '工龄',
            prop: 'seniority'
        },
        {
            label: '专业技术职称',
            prop: "technicalTitle",
            width: 200
        }
    ],
    tableData: [

    ]
})
const close = () => {
    showModel.value = false;
};
onMounted(() => {
    state.tableData = leftTopChartDialogData
})
defineExpose({
    showModel,
});
</script>
    
<style></style>