<template>
  <div class="screen">
    <Header title="国资总览"></Header>
    <div class="mainBox">
      <div class="left">
        <LeftTopChart></LeftTopChart>
        <LeftCenterTable></LeftCenterTable>
        <LeftBottomTable></LeftBottomTable>
      </div>
      <div class="center">
        <CenterTotal></CenterTotal>
        <CenterMapChart></CenterMapChart>
        <CenterBottomChart></CenterBottomChart>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightCenterChart></RightCenterChart>
        <RightBottomList></RightBottomList>
      </div>
    </div>
    <!-- 明细信息 -->
    <!-- <detailsDialogA ref="refCenterBottomDialog" /> -->
    <!-- <detailsDialogB ref="refCenterBottomDialog" /> -->
    <FooterList @selectTag="selectTag"></FooterList>
    <Menu></Menu>
  </div>
</template>
    
<script setup>
import { ref } from "vue";
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import CenterMapChart from "./comp/centerMapChart.vue";
import CenterTotal from "./comp/centerTotal.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import LeftCenterTable from "./comp/leftCenterTable.vue";
import LeftBottomTable from "./comp/leftBottomTable.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import RightCenterChart from "./comp/rightCenterChart.vue";
import RightBottomList from "./comp/rightBottomList.vue";
import CenterBottomChart from "./comp/centerBottomChart.vue";
// import detailsDialogA from './dialog/detailsDialogA.vue'
// import detailsDialogB from './dialog/detailsDialogB.vue'
import FooterList from "./comp/footerList.vue";
const tag = ref(0);
// const refCenterBottomDialog = ref(null)
const selectTag = (e) => {
  tag.value = e;
};
// onMounted(() => {
//   refCenterBottomDialog.value.showModel = true
// })
</script>
  
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .mainBox {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .center {
      width: 768px;
      z-index: 1;
    }

    .left,
    .right {
      position: relative;
      z-index: 2;
    }
  }
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