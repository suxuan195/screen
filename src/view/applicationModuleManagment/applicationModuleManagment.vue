<template>
  <div class="screen">
    <Header title="应用平台监测"></Header>
    <div class="checkRouter">
      <span @click="rourerClick"></span>
    </div>
    <div class="menu">
      <div class="left marginRight24">
        <navTitle title="数据库服务器" />
        <serverListVue :navList="state.navList1" typeText="database" @tabClick="tabClick" />
        <physicalUsage1 class="marginTop8" />
        <commonChartNumberTotal class="marginTop8" title="平台I/O情况" :dataList="dataList1" type="left"
          :colorList="['#3C97F1', '#EBAC23']" :titleList="['MB_read', 'MB_wrtn']" />
        <leftBottomTop5 class="marginTop8" />
      </div>
      <div class="centerLeft marginRight48">
        <navTitle title="应用服务器" />
        <serverListVue :navList="state.navList2" @tabClick="tabClick" />
        <physicalUsage2 class="marginTop8" />
        <commonChartNumberTotal class="marginTop8" title="数据总量" :dataList="dataList2" type="centerLeft"
          :colorList="['#3C97F1']" :titleList="['MB_read']" />
        <centerLeftBottomTop5 class="marginTop8" />
      </div>
      <div class="centerRight marginRight24">
        <navTitle title="应用系统总数量" />
        <applicationSystemNav />
        <commonChartNumberTotal class="marginTop8" title="用户活跃度" :dataList="dataList3" :colorList="['#0BE6E6']"
          :titleList="['MB_read']" :isDateShow="false" :yNameShow="false" />
        <applicationList class="marginTop8" />
      </div>
      <div class="right">
        <navTitle title="平台用户总量" />
        <platformUsersNav />
        <applicationSystems class="marginTop8" />
      </div>
    </div>
    <serveListLeftDialog ref="serverListDialogRef" />
    <serveListRightDialog ref="serveListRightDialogRef" />
    <Menu></Menu>
  </div>
</template>
  
<script setup>
import { reactive, ref } from "vue";
import serveListLeftDialog from './dialog/serveListLeftDialog.vue';
import serveListRightDialog from './dialog/serveListRightDialog.vue';
import Menu from "@components/Menu/index.vue";
import Header from "@components/Header/index.vue";
import leftBottomTop5 from "./cpn/leftBottomTop5.vue";
import applicationList from "./cpn/applicationList.vue";
import platformUsersNav from "./cpn/platformUsersNav.vue";
import navTitle from "@components/navTitle/navTitle.vue";
import applicationSystems from "./cpn/applicationSystems.vue";
import applicationSystemNav from "./cpn/applicationSystemNav.vue";
import centerLeftBottomTop5 from "./cpn/centerLeftBottomTop5.vue";
import serverListVue from "@components/applicationModuleManagment/serverList.vue";
import physicalUsage1 from "@components/applicationModuleManagment/physicalUsage1.vue";
import physicalUsage2 from "@components/applicationModuleManagment/physicalUsage2.vue";
import commonChartNumberTotal from "@components/applicationModuleManagment/commonChartNumberTotal.vue";
const serverListDialogRef = ref(null);
const serveListRightDialogRef = ref(null);
const dataList1 = [
  [
    [
      8656
    ],
    [
      8329
    ]
  ],
  [
    [2602, 2988, 3108, 3357, 3561, 3766, 3921, 4366, 4456, 6604, 8656],
    [2038, 2214, 3155, 3297, 3321, 3921, 4236, 4761, 4987, 6331, 8329]

  ],
  [
    [6674, 6877, 6981, 7021, 7433, 7521, 7698, 7721, 7844, 7932, 8009, 8174, 8216, 8325, 8656],
    [6325, 6678, 6788, 6932, 7231, 7381, 7655, 7731, 7899, 7981, 8031, 8102, 8177, 8236, 8329]
  ],
]
const dataList2 = [
  [
    [
      640.2
    ]
  ],
  [
    [
      572.2,
      581.7,
      587.4,
      592.6,
      599.3,
      605.4,
      611.9,
      619.3,
      625.7,
      633.1,
      640.2
    ]
  ],
  [
    [634.9, 635.2, 635.7, 636.2, 636.5, 637.3, 637.5, 637.9, 638.2, 638.6, 638.8, 639.1, 639.2, 639.8, 640.2]
  ],
]
const dataList3 = [
  [
    [53569]
  ],
  [
    [30578, 32417, 34897, 36337, 39546, 41967, 43207, 46021, 49019, 50037, 53569]
  ],
  [
    [50742, 50873, 50901, 50973, 50987, 51007, 51221, 51436, 51874, 52007, 52125, 52338, 53109, 53269, 53569]
  ]
]
const state = reactive({
  navList1: [
    {
      name: "服务器数量",
      value: 1,
      unit: "台",
    },
    {
      name: "CPU数量",
      value: 32,
      unit: "个",
    },
    {
      name: "内存总量",
      value: 64,
      unit: "G",
    },
    {
      name: "存储总量",
      value: 4,
      unit: "TB",
    },
  ],
  navList2: [
    {
      name: "服务器数量",
      value: 25,
      unit: "台",
    },
    {
      name: "CPU数量",
      value: 664,
      unit: "个",
    },
    {
      name: "内存总量",
      value: 992,
      unit: "G",
    },
    {
      name: "存储总量",
      value: 38.3,
      unit: "TB",
    },
  ],
});
const tabClick = (typeText) => {
  console.log(typeText);
  if (typeText == 'database') {
    serverListDialogRef.value.showModel = true
  } else {
    serveListRightDialogRef.value.showModel = true
  }
}
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "applicationPlatform"
  })
}
</script>
  
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;


  .marginTop8 {
    margin-top: 8px;
  }

  .menu {
    padding: 20px 47px 22px 47px;
    display: flex;

    .marginRight24 {
      margin-right: 24px;
    }

    .marginRight48 {
      margin-right: 48px;
    }
  }
}


.checkRouter {
  position: fixed;
  right: 180px;
  top: 100px;
  display: flex;
  gap: 6px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .4);

    &:hover {
      background-color: rgba(255, 255, 255, .8);
    }
  }
}
</style>
  