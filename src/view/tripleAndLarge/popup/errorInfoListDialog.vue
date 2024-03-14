<template>
    <div>
        <popup :width="1270" :height="604" title="异常信息列表" :showModel="props.showModel">
            <div class="search_top">
                <search class="marginBox" :formList="state.formList" />
                <div class="explan" @click="explan">{{ state.explanShow ? '收起' : '展开' }}
                    <el-icon v-show="!state.explanShow">
                        <ArrowDown />
                    </el-icon>
                    <el-icon v-show="state.explanShow">
                        <ArrowUp />
                    </el-icon>
                </div>
            </div>
            <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" :hasIndex="true" maxHeight="350px"
                :colorList="['meeting_Name', 'topicName']" v-show="state.explanShow" />
            <bottomPagination :total="100" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
                v-show="state.explanShow" />
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
        {
            placeholader: '请输入会议名称',
            value: '',
            label: '会议名称',
            showType: 'input'
        }
    ],
    explanShow: true,
    tableHeader: [
        {
            label: '异常类型',
            prop: 'exception'
        },
        {
            label: '会议名称',
            prop: 'meeting_Name',
            className: 'active'
        },
        {
            label: '会议类型',
            prop: 'mettingTypes',

        },
        {
            label: '议题名称',
            prop: 'topicName',
            className: 'active'
        },
        {
            label: '企业名称',
            prop: 'enterpriseName'
        },
        {
            label: '异常描述',
            prop: "exceptionDescription"
        },
        {
            label: '整改时间',
            prop: 'rectificationTime',
            sortable: true
        }
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
    }
})
const explan = () => {
    state.explanShow = !state.explanShow
}
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