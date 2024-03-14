<template>
    <div>
        <popup :width="1860" :height="596" title="会议列表-总数" :showModel="props.showModel">
            <search class="marginBox" :formList="state.formList" :isClose="true" />
            <ulList :ul-list="state.ulList" class="ulListBox" />
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" :hasIndex="true" maxHeight="320px" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange" />
        </popup>
    </div>
</template>
    
<script setup >
import { reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import search from "@components/search/search.vue";
import bottomPagination from '@components/pagination/bottomPagination.vue'
import ulList from './ulList.vue';
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    formList: [
        {
            placeholader: '请选择',
            value: '',
            value1: '',
            label: '会议类型',
            showType: 'select',
            optionList: [
                {
                    label: '省属企业集团'
                },
                {
                    label: "市（州）国资监管机构"
                }
            ]
        },
        {
            showType: 'input',
            label: '企业名称',
            value: '',
            placeholader: '请输入'
        },
        {
            showType: 'dateSingle',
            value: '',
            label: '会议开始时间',
        },
        {
            showType: 'dateSingle',
            value: '',
            label: '会议结束时间',
        },
        {
            showType: 'input',
            label: '会议编码',
            value: '',
            placeholader: '请输入'
        },
    ],
    ulList: [
        {
            label: "当前总数：",
            value: 524
        },
        {
            label: "有权限查看数：",
            value: 45
        },
        {
            label: "无权限查看数：",
            value: 314
        },
    ],
    tableHeader: [
        {
            label: '企业名称',
            prop: 'meeting_Name',
            sortable: true
        },
        {
            label: '会议名称',
            prop: 'mettingTypes',
            sortable: true,
            className: 'active'
        },
        {
            label: '会议类型',
            prop: 'topicName',
        },
        {
            label: '会议编码',
            prop: 'enterpriseName',
            sortable: true
        },
        {
            label: '会议时间',
            prop: "exceptionDescription",
            sortable: true
        },
        {
            label: '主持人',
            prop: "exceptionDescription",
            sortable: true
        },
        {
            label: '会议地点',
            prop: "exceptionDescription",
            sortable: true
        },
        {
            label: '会议时间',
            prop: "exceptionDescription",
            sortable: true
        },
    ],
    tableData: [
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '决策顺序异常',
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 0,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 0,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: 1,
            topicName: 0,
            enterpriseName: 1,
            exceptionDescription: 1,
            rectificationTime: 1
        }
    ]
})
const handleSizeChange = (size) => {
    console.log(size);
}
const handleCurrentChange = (page) => {
    console.log(page);
}
</script>
    
<style lang="scss" scoped>
.marginBox {
    margin-top: 42px;
    margin-bottom: 25px;
}

.ulListBox {
    margin-bottom: 10px;
}
</style>