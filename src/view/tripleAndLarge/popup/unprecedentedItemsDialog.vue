<template>
    <popup :width="1332" :height="508" title="事项清单党委会未前置事项列表" :showModel="props.showModel">
        <div style="margin-top: 36px;">
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="305px" :hasIndex="true" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange" />
        </div>
    </popup>
</template>
    
<script setup>
import { reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from "@components/customTable/customTable.vue";
import bottomPagination from '@components/pagination/bottomPagination.vue'
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    tableHeader: [
        {
            label: '企业名称',
            prop: 'exception'
        },
        {
            label: '事项清单名称',
            prop: 'meeting_Name',
        },
        {
            label: '事项名称',
            prop: 'mettingTypes',

        },
        {
            label: '事项决策顺序',
            prop: 'topicName',
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
const handleSizeChange = (size) => {
    console.log(size);
}
const handleCurrentChange = (page) => {
    console.log(page);
}
</script>
    
<style lang="scss" scoped></style>