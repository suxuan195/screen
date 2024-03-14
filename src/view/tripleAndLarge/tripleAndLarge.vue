<template>
  <div class="screen">
    <Header title="三重一大决策运行监管系统"></Header>
    <div class="mainBox">
      <div class="topBox">
        <topList @tabClick="tabClick" />
      </div>
      <div class="cenerBox">
        <div>
          <navTitle title='"三重一大"近半年会议覆盖运行情况' class="marginTop50" />
          <leftCenterChart />
        </div>
        <div class="center_center_box">
          <centerBottom />
        </div>
        <div>
          <navTitle title='"三重一大"事项清单党委会未前置监管' class="marginTop50" />
          <rightCenter />
        </div>
      </div>
      <div class="rightBox">
        <div class="mt12">
          <navTitle title='"三重一大"决策运行合规监管' class="marginTop50" />
          <leftBotttomTable />
        </div>
        <div class='mt12 ml48'>
          <navTitle title='十九大以来，近三年决策事项趋势图' class="marginTop50" />
          <leftRightChart />
        </div>
      </div>
    </div>
    <!-- 制度列表-公司章程 -->
    <!-- <articlesAssociationDialog :showModel="true" /> -->
    <!-- 十九大以来事项清单汇总-重大决策 -->
    <!-- <majorDecisionsDialog :showModel="true" /> -->
    <!-- 事项列表 -->
    <!-- <listOfMattersDialog :showModel="true"  /> -->
    <!-- 决策制度 -->
    <decisionMakingDialog :showModel="showModel" v-if="currentIndex === 0 && childIndex === 0" />
    <!-- 议题 -->
    <topicsDialog :showModel="showModel" v-if="currentIndex === 3" />
    <!-- 事项清单 -->
    <inventoryListDialog :showModel="showModel" v-if="currentIndex === 1 && childIndex === 0" />
    <!-- 会议 -->
    <meetingDialog :showModel="showModel" v-if="currentIndex === 2" />
    <Menu></Menu>
    <div class="bg_bottom"></div>
  </div>
</template>
      
<script setup>
import { onMounted, ref } from 'vue';
import emitBus from "@utils/bus";
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import topList from "./cpn/topList.vue";
import leftCenterChart from './cpn/leftCenterChart.vue';
import centerBottom from './cpn/centerBottom.vue';
import rightCenter from "./cpn/rightCenter.vue";
import leftBotttomTable from "./cpn/leftBotttomTable.vue";
import leftRightChart from "./cpn/leftRightChart.vue";
// import articlesAssociationDialog from "./popup/articlesAssociationDialog.vue";
import decisionMakingDialog from "./popup/decisionMakingDialog.vue";
import topicsDialog from "./popup/topicsDialog.vue";
// import majorDecisionsDialog from "./popup/majorDecisionsDialog.vue";
import inventoryListDialog from "./popup/inventoryListDialog.vue";
import meetingDialog from "./popup/meetingDialog.vue";
const showModel = ref(false)
const currentIndex = ref(0)
const childIndex = ref(0)
const tabClick = (index, itIndex) => {
  showModel.value = true
  currentIndex.value = index
  childIndex.value = itIndex
}

onMounted(() => {
  emitBus.on("closeModel", () => {
    showModel.value = false;
    currentIndex.value = 0;
    childIndex.value = 0;
  });
});
</script>
      
<style lang="scss" scoped>
.screen {
  background: url("@images/propertyManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .mainBox {
    padding: 20px 50px;

    .marginTop50 {
      margin-top: 50px;
    }

    .cenerBox {
      display: flex;

      .center_center_box {
        margin-top: 22px;
      }
    }

    .rightBox {
      display: flex;

      .mt12 {
        margin-top: 12px;
      }

      .ml48 {
        margin-left: 48px;
      }
    }
  }
}

.left,
.right {
  position: relative;
  z-index: 1;
}

.left {
  z-index: 2;
}

.bg_bottom {
  background-image: url("@images/IntelligentEnergyManagement/bottom_bg.png");
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
}

:deep(.mainTitle) {
  box-sizing: border-box;
  background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
  width: 420px;
  height: 46px;
  padding-left: 75px;

  p {
    white-space: nowrap;
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: 0.2em;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
  }
}
</style>