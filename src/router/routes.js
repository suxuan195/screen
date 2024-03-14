const routes = [
    {
        path: "/",
        name: "index",
        redirect: {
            name: 'overview'
        },
        meta: {
            title: "领导辅助决策系统",
        },
    },
    {
        path: "/payrollManagement",
        name: "payrollManagement",
        component: () => import("@/view/payrollManagement/index.vue"),
        meta: {
            title: "负责人薪酬管理",
        },
    },
    {
        path: "/employeeAllocation",
        name: "employeeAllocation",
        component: () => import("@/view/employeeAllocation/index.vue"),
        meta: {
            title: "职工分配调控",
        },
    },
    {
        path: "/lead",
        name: "lead",
        component: () => import("@/view/lead/index.vue"),
        meta: {
            title: "一带一路",
        },
    },
    {
        path: "/partyBuildingPublicity",
        name: "partyBuildingPublicity",
        component: () => import("@/view/partyBuildingPublicity/index.vue"),
        meta: {
            title: "党建工作",
        },
    },
    {
        path: "/propertyManagement",
        name: "propertyManagement",
        component: () => import("@/view/propertyManagement/index.vue"),
        meta: {
            title: "产权管理",
        },
    },
    {
        path: "/propertyMonitoringManagement",
        name: "propertyMonitoringManagement",
        component: () => import("@/view/propertyMonitoringManagement/propertyMonitoringManagement.vue"),
        meta: {
            title: "交易监测",
        },
    },
    {
        path: "/IntelligentEnergyManagement",
        name: "IntelligentEnergyManagement",
        component: () => import("@/view/IntelligentEnergyManagement/IntelligentEnergyManagement.vue"),
        meta: {
            title: "能源安全智能化",
        },
    },
    {
        path: "/applicationModuleManagment",
        name: "applicationModuleManagment",
        component: () => import("@/view/applicationModuleManagment/applicationModuleManagment.vue"),
        meta: {
            title: "应用平台监测模块",
        },
    },
    {
        path: "/supplySideReformManagment",
        name: "supplySideReformManagment",
        component: () => import("@/view/supplySideReformManagment/supplySideReformManagment.vue"),
        meta: {
            title: "供给侧改革",
        },
    },
    {
        path: "/industrialEconomyRun",
        name: "industrialEconomyRun",
        component: () => import("@/view/industrialEconomyRun/industrialEconomyRun.vue"),
        meta: {
            title: "工业经济运行监测",
        },
    },
    {
        path: "/financialSupervision",
        name: "financialSupervision",
        component: () => import("@/view/financialSupervision/financialSupervision.vue"),
        meta: {
            title: "财务监督",
        },
    },
    {
        path: "/stateEnterpriseReform",
        name: "stateEnterpriseReform",
        component: () => import("@/view/stateEnterpriseReform/stateEnterpriseReform.vue"),
        meta: {
            title: "国企改革",
        },
    },
    {
        path: "/overview",
        name: "overview",
        component: () => import("@/view/overview/index.vue"),
        meta: {
            title: "国资总览",
        }
    },
    {
        path: "/tripleAndLarge",
        name: "tripleAndLarge",
        component: () => import("@/view/tripleAndLarge/tripleAndLarge.vue"),
        meta: {
            title: "三重一大",
        },
    },
    {
        path: "/comprehensiveAnalysis",
        name: "comprehensiveAnalysis",
        component: () => import("@/view/comprehensiveAnalysis/comprehensiveAnalysis.vue"),
        meta: {
            title: "投资项目综合分析",
        },
    },
    {
        path: "/indicate",
        name: "indicate",
        component: () => import("@/view/indicate/index.vue"),
        meta: {
            title: "领导指示批复",
        },
    },
    {
        path: "/safeProduction",
        name: "safeProduction",
        component: () => import("@/view/safeProductionNew/safeProductionNew.vue"),
        meta: {
            title: "安全生产",
        },
    },
    {
        path: "/enterpriseInfo",
        name: "enterpriseInfo",
        component: () => import("@/view/enterpriseInfo/enterpriseInfo.vue"),
        meta: {
            title: "企业信息",
        },
    },
    {
        path: "/stateOwnedAssets",
        name: "stateOwnedAssets",
        component: () => import("@/view/stateOwnedAssets/stateOwnedAssets.vue"),
        meta: {
            title: "国有资产追责",
        },
    },
    {
        path: "/enterpriseService",
        name: "enterpriseService",
        component: () => import("@/view/enterpriseServiceManagment/enterpriseService.vue"),
        meta: {
            title: "企业服务平台监测",
        },
    },
    {
        path: "/iFCombine",
        name: "iFCombine",
        component: () => import("@/view/iFCombine/iFCombine.vue"),
        meta: {
            title: "产融结合",
        },
    },
    {
        path: "/stateOwnedAssetsTotal",
        name: "stateOwnedAssetsTotal",
        component: () => import("@/view/stateOwnedAssetsTotal/stateOwnedAssetsTotal.vue"),
        meta: {
            title: "国有资产统计",
        },
    },
    {
        path: "/riskWarning",
        name: "riskWarning",
        component: () => import("@/view/riskWarning/index.vue"),
        meta: {
            title: "财务风险预警",
        },
    },
    {
        path: "/performanceEvaluation",
        name: "performanceEvaluation",
        component: () => import("@/view/performanceEvaluation/performanceEvaluation.vue"),
        meta: {
            title: "业绩考核"
        },
    },
    {
        path: "/jGEnterpriseManagement",
        name: "jGEnterpriseManagement",
        component: () => import("@/view/jGEnterpriseManagement/jGEnterpriseManagement.vue"),
        meta: {
            title: "酒钢集团企业画像",
        },
    },
    {
        path: "/headPayManagment",
        name: "headPayManagment",
        component: () => import("@/view/headPayManagment/headPayManagment.vue"),
        meta: {
            title: "负责人薪酬管理",
        },
    },

    {
        path: "/workdEmployeeDistribution",
        name: "workdEmployeeDistribution",
        component: () => import("@/view/workdEmployeeDistribution/workdEmployeeDistribution.vue"),
        meta: {
            title: "职工分配调控",
        },
    },
    {
        path: "/performanceObjectives",
        name: "performanceObjectives",
        component: () => import("@/view/performanceObjectives/performanceObjectives.vue"),
        meta: {
            title: "业绩考核",
        },
    },
    {
        path:"/applicationPlatform",
        name:"applicationPlatform",
        component: () => import("@/view/applicationPlatform/applicationPlatform.vue"),
        meta: {
            title: "应用平台监测模块",
        },
    }
]
export default routes;
