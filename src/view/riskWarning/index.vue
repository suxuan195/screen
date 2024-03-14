<template>
  <div class="screen">
    <Header title="财务风险预警"></Header>
    <div class="mainBox">
      <div class="left">
        <LeftChart></LeftChart>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightBottomChart></RightBottomChart>
      </div>
    </div>
    <!-- <riskDetailsDialog ref="riskDetailsDialogRef" /> -->
    <Menu></Menu>
  </div>
</template>
      
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import LeftChart from "./components/LeftChart.vue";
import RightTopChart from "./components/rightTopChart.vue";
import RightBottomChart from "./components/rightBottomChart.vue";
// import riskDetailsDialog from "./dialog/riskDetailsDialog.vue";
// import { onMounted, ref } from 'vue';
// const riskDetailsDialogRef = ref(null);
// onMounted(() => {
//   riskDetailsDialogRef.value.showModel = true
// })
</script>
    
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .mb24 {
    margin-bottom: 24px;
  }

  .mr24px {
    margin-right: 24px;
  }

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