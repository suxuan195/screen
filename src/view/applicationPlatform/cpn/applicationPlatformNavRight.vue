<template>
    <div class="applicationSystemNav">
        <p></p>
        <div>
            <span @click="handleClick">{{ props.total }}</span>
        </div>
    </div>
    <applicationPlatformList :showModel="showModel" :tableData="state.tableData" :options="state.options"
        @close-dialog="closeDialog"></applicationPlatformList>
</template>
    
<script setup>
import applicationPlatformList from "./applicationPlatformList.vue"
import { onMounted, defineProps, reactive, ref } from 'vue';
const props = defineProps({

    imageUrl: {
        type: String,
    },
    total: {
        type: String
    }

});
const showModel = ref(false);
const state = reactive({
    options: [
        { prop: "department", label: "系统名称", },
        { prop: "totalUsage", label: "使用总量", },
    ],
    tableData: [
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
    ]
})
onMounted(() => {
    // console.log(props.imageUrl,'--imageUrl');
})


function closeDialog() {
    showModel.value = false;
}

const handleClick = () => {
    console.log(11);
    showModel.value = true;
}

</script>
    
<style lang="scss" scoped>
.applicationSystemNav {
    width: 520px;
    height: 150px;
    // background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(40, 44, 79,0.7);
    background-image: url("@images/IntelligentEnergyManagement/top1.png");

    p {
        width: 72px;
        height: 72px;
        background-image: url('../../../images/enterpriseServiceManagment/用户活跃率.png');
        // background-image: url('@images/enterpriseServiceManagment/活跃用户.png"');
        background-size: 100% 100%;
        margin-right: 32px;
        margin-left: 30px;
    }


    div {
        span {
            font-size: 40px;
            font-weight: normal;
            line-height: 40px;
            text-align: center;
            letter-spacing: 0.1em;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            z-index: 0;

        }

        i {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            text-align: right;
            letter-spacing: 0px;
            color: #FFFFFF;
            z-index: 1;
        }
    }
}
</style>