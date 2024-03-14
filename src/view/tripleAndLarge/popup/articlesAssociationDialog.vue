<template>
    <div>
        <popup :width="1564" :height="596" title="制度列表-公司章程" :showModel="props.showModel">
            <div class="search_top">
                <search class="marginBox" :formList="state.formList" :isClose="true" />
            </div>
            <ulList :ulList="state.ulList" />
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" :hasIndex="true" maxHeight="320px" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange" />
        </popup>
    </div>
</template>
    
<script setup>
import popup from "@components/popup/pop.vue";
import search from "@components/search/search.vue";
import customTable from "@components/customTable/customTable.vue";
import bottomPagination from '@components/pagination/bottomPagination.vue'
import ulList from "./ulList.vue";
import { reactive } from 'vue'
const state = reactive({
    formList: [
        {
            placeholader: '请选择',
            value: '',
            label: '制度类型',
            showType: 'select',
            explanShow: false,
            optionList: [
                {
                    label: '公司章程',
                    value: 1
                }
            ]
        },
        {
            placeholader: '请输入',
            value: '',
            label: '制度名称',
            showType: 'input',
        },
        {
            placeholader: '请输入',
            value: '',
            label: '企业名称',
            showType: 'input',
        },
        {
            placeholader: '请选择',
            value: '',
            label: '在用状态',
            showType: 'select',
            explanShow: false,
            optionList: [
                {
                    label: '正在使用',
                    value: 1
                },
            ]
        },
    ],
    tableHeader: [
        {
            label: '制度名称',
            prop: 'exception',
            sortable: true
        },
        {
            label: '企业名称',
            prop: 'meeting_Name',
            sortable: true
        },
        {
            label: '制度类型',
            prop: 'mettingTypes',

        },
        {
            label: '审批日期',
            prop: 'topicName',
        },
        {
            label: '生效日期',
            prop: 'enterpriseName'
        },
    ],
    tableData: [
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '2022-10-09',
            enterpriseName: '2023-10-23',
        },
    ],
    ulList: [
        {
            label: "制度总数：",
            value: 524
        },
        {
            label: "有权限查看数：",
            value: '0'
        },
        {
            label: "无权限查看数：",
            value: '0'
        }
    ]
})
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
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
    margin-top: 36px;
    margin-bottom: 24px;
}

.search_top {
    position: relative;

    .explan {
        cursor: pointer;
        position: absolute;
        right: 270px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: rgba(96, 188, 255, 0.8);

    }
}
</style>