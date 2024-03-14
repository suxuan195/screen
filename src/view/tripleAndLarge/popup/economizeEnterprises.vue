<template>
    <div class="economizeEnterprises">
        <popup :width="1332" :height="560" :title="props.title" :showModel="props.showModel">
            <search class="marginBox" :formList="state.formList" />
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" :hasIndex="true" maxHeight="320px"
                :colorList="['meeting_Name', 'topicName']" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange" />
        </popup>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import search from "@components/search/search.vue";
import customTable from "@components/customTable/customTable.vue";
import bottomPagination from '@components/pagination/bottomPagination.vue'
const state = reactive({
    formList: [
        {
            placeholader: '请输入企业名称',
            value: '',
            label: '企业名称',
            showType: 'input'
        },
    ],
    tableHeader: [
        {
            label: '企业名称',
            prop: 'exception',
            sortable: true
        },
        {
            label: '会议数',
            prop: 'meeting_Name',
            sortable: true
        },
        {
            label: '最近会议时间',
            prop: 'mettingTypes',
            sortable: true

        },
    ],
    tableData: [
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        }
    ]
})
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '省属下级全级次企业'
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