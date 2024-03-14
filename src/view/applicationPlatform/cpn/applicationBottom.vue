<template>
    <div class="top">
        <navTitle title="平台应用系统访问量" :isShow="true" @showModelClick="handleClick" />
    </div>
    <div class="centerLeftBottomTop5">
        <!-- <topTitle title="平台应用系统访问量" :is-other-text="false" :is-date-show="false" /> -->

        <div class="tableBox" style="position: relative;">
            <ScrollTable :tableData="state.tableData" :options="state.options"
                :colorList="state.options.map(item => item.prop).slice(2)" :IndexColorList="state.IndexColorList"
                :hasIndex="true" hasIndexTitle="排名" :height="500">
            </ScrollTable>
        </div>
    </div>

    <applicationPlatformList title="平台应用系统访问量" :showModel="showModel" :tableData="state.tableDatas"
        :options="state.optionss" @close-dialog="closeDialog"></applicationPlatformList>
</template>
    
<script setup>
import applicationPlatformList from "./applicationPlatformList.vue"
import ScrollTable from "@/components/ScrollTable/index.vue";
import navTitle from "@components/navTitle/navTitle.vue";
import { reactive, ref } from "vue";
const state = reactive({
    options: [
        { prop: "name", label: "名称", width: 300 },
        { prop: "number", label: "" },
    ],
    tableData: [
        {
            name: "国资数据资源中心",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
            number: '563',


        },
        {
            name: "国企改革在线监督",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
            number: '563'
        },
        {
            name: "大额资金动态监控",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
            number: '563'
        },
        {
            name: "财务监督管理",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
            number: '563'
        },
        {
            name: "“三重一大”决策和运行监管系统",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
            number: '563'
        },
    ],
    IndexColorList: [
        {
            color: '#E47200',
            background: 'linear-gradient(180deg, #FFEDA8 0%, #FED035 56%, #FFCD2C 100%)'
        },
        {
            color: '#4A74B0',
            background: 'linear-gradient(180deg, #E2EEFA 0%, #ADC7E8 56%, #95AFCA 100%)'
        },
        {
            color: ' #924C06',
            background: 'linear-gradient(180deg, #FBEDE4 0%, #D8BBAB 56%, #AF7B65 100%)'
        }
    ],
    optionss: [
        { prop: "department", label: "系统名称", },
        { prop: "totalUsage", label: "使用总量", },
    ],
    tableDatas: [
        {
            "department": "企业基本信息管理系统",
            "totalUsage": "3654"
        },
        {
            "department": "国资数据资源中心",
            "totalUsage": "1207"
        },
        {
            "department": "国企改革在线监督",
            "totalUsage": "5621"
        },
        {
            "department": "大额资金动态监控",
            "totalUsage": "4115"
        },
        {
            "department": "财务监督管理",
            "totalUsage": "3215"
        },
        {
            "department": "“三重一大”决策和运行监管系统",
            "totalUsage": "3356"
        },
        {
            "department": "企业经济运行分析系统",
            "totalUsage": "2365"
        },
        {
            "department": "产权综合管理系统",
            "totalUsage": "3214"
        },
        {
            "department": "对外经济合作管理系统",
            "totalUsage": "1987"
        },
        {
            "department": "党建管理系统",
            "totalUsage": "1006"
        },
        {
            "department": "监管信息报送平台",
            "totalUsage": "3621"
        },
        {
            "department": "能源企业生产数据管理系统",
            "totalUsage": "3856"
        },
        {
            "department": "企业领导人员管理系统、",
            "totalUsage": "956"
        },
        {
            "department": "企业监督稽查管理系统、",
            "totalUsage": "877"
        },
        {
            "department": "资本运营与收益管理系统、",
            "totalUsage": "3125"
        },
        {
            "department": "企业业绩考核评价系统、",
            "totalUsage": "1123"
        },
        {
            "department": "监督追责管理系统、",
            "totalUsage": "899"
        },
        {
            "department": "领导辅助决策系统、",
            "totalUsage": "566"
        },
        {
            "department": "境外项目信息监测系统、",
            "totalUsage": "769"
        },
        {
            "department": "协同办公系统",
            "totalUsage": "3547"
        },
        {
            "department": "合同管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "机关后勤服务管理系统",
            "totalUsage": "569"
        },
        {
            "department": "宣传工作管理系统",
            "totalUsage": "369"
        },
        {
            "department": "企业综合管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "企业群工管理系统",
            "totalUsage": "663"
        },
        {
            "department": "企业信访信息管理系统",
            "totalUsage": "213"
        }
    ],
});

const showModel = ref(false);
// 关闭弹框事件
function closeDialog() {
    showModel.value = false;
}
//   打开弹框
const handleClick = () => {
    showModel.value = true;
}
</script>
    
<style lang="scss" scoped>
.top {
    margin-top: 20px;
}

.centerLeftBottomTop5 {
    padding: 16px;
    box-sizing: border-box;
    // width: 432px;
    // height: 240px;
    width: 93%;
    height: 290px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;


}

:deep(th) {
    padding: 0;

    .cell {
        font-size: 18px !important;
        line-height: 34px;
        color: #32d6f9;
        background: transparent !important;
    }
}

:deep(td) {
    padding: 0;

    .cell {
        font-size: 16px !important;
        line-height: 34px;
        color: #DBF9FF;
    }
}

::v-deep .mainTitle {
    width: 93%;
    background: url("@images/title.png") 0% 0% / 420px 100% no-repeat;
}
</style>
