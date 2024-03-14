<template>
    <div class="decisionMakingDialog">
        <popup :width="1388" :height="596" title="十九大以来事项清单汇总-重大决策" :showModel="props.showModel">
            <search class="marginBox" :formList="state.formList" :is-close="true" />
            <ulList :ul-list="state.ulList" class="ulListBox" />
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" :hasIndex="true" maxHeight="320px" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange" />
        </popup>
    </div>
</template>
    
<script setup>
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
            placeholader: '请输入',
            value: '',
            label: '事项名称',
            showType: 'input',
        },
        {
            placeholader: '请输入',
            value: '',
            label: '事项编码',
            showType: 'input',
        },
        {
            placeholader: '请输入',
            value: '',
            label: '企业名称',
            showType: 'input',
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
            label: '事项名称',
            prop: 'exception',
            sortable: true
        },
        {
            label: '企业名称',
            prop: 'meeting_Name',
            sortable: true
        },
        {
            label: '事项编码',
            prop: 'mettingTypes',
            sortable: true
        },
        {
            label: '需经法律审核',
            prop: 'topicName',
        },
        {
            label: '生效时间',
            prop: 'enterpriseName',
            sortable: true
        },
        {
            label: '失效时间',
            prop: "exceptionDescription",
            sortable: true
        },
    ],
    tableData: [
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
.decisionMakingDialog {
    h2 {
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        margin-top: 36px;
        margin-bottom: 26px;
    }

    .ulListBox {
        margin-top: 17px;
        margin-bottom: 10px;
    }

    .marginBox {
        margin-top: 36px;
    }
}
</style>