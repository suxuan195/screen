<template>
    <div class="decisionMakingDialog">
        <popup :width="1558" :height="634" title="决策制度" :showModel="props.showModel">
            <h2 class="ttf">制度分类统计</h2>
            <search class="marginBox" :formList="state.formList" />
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
            value: true,
            label: '统计数量包含下载',
            showType: 'switch',
        },
        {
            placeholader: '请输入',
            value: '',
            label: '企业名称',
            showType: 'input',
        },
        {
            label: '在用状态',
            showType: 'state',
            value: '',
            activeIndex: 0,
            optionList: [
                {
                    label: '省属企业集团'
                },
                {
                    label: '市（州）国资监管机构'
                }
            ]
        }
    ],
    ulList: [
        {
            label: "制度总数：",
            value: 524
        },
        {
            label: "公司章程：",
            value: 45
        },
        {
            label: "实施办法：",
            value: 314
        },
        {
            label: "授权管理办法：",
            value: 17
        },
        {
            label: "股东会议事规则：",
            value: 11
        },
        {
            label: "党委会议事规则：",
            value: 47
        },
        {
            label: "董事会议事规则：",
            value: 40
        },
        {
            label: "经理层办公会议事规则：",
            value: 35
        },
        {
            label: "职代会议事规则：",
            value: 3
        },
        {
            label: '其他议事规则：',
            value: 13
        }
    ],
    tableHeader: [
        {
            label: '企业名称',
            prop: 'exception'
        },
        {
            label: '制度总数',
            prop: 'meeting_Name',
        },
        {
            label: '公司章程',
            prop: 'mettingTypes',
            without: true
        },
        {
            label: '实施办法',
            prop: 'topicName',
            without: true
        },
        {
            label: '授权管理办法',
            prop: 'enterpriseName',
            without: true
        },
        {
            label: '股东会议事规则',
            prop: "exceptionDescription",
            without: true
        },
        {
            label: '党委会议事规则',
            prop: 'rectificationTime',
            without: true
        },
        {
            label: '董事会议事规则',
            prop: 'rectificationTime',
            without: true
        },
        {
            label: '经理层办公室议事规则',
            prop: 'rectificationTime',
            width: 200,
            without: true
        },
        {
            label: '职代会议事规则',
            prop: 'rectificationTime',
            without: true
        }
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
}
</style>