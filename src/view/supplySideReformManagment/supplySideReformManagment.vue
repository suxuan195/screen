<template>
  <div class="screen">
    <Header title="供给侧改革"></Header>
    <div class="mainBox">
      <div class="leftChart">
        <navTitle title="去产能统计" />
        <capacityReductionStatistics />
        <navTitle title="降杠杆减负债" class="mt27" />
        <reduceLiabilities />
        <navTitle title="压减情况" class="mt27" />
        <pressureReductionSituation />
      </div>
      <div class="rightChart">
        <navTitle title="处僵治困" />
        <treatingDifficulty />
        <div class="rightCenterChart">
          <div class="mr24px">
            <navTitle title="混合所有制企业占比情况" class="mt27" />
            <enterpriseProportion />x
          </div>
          <div>
            <navTitle title="压减工作成效" class="mt27" />
            <reduceWorkEffectiveness />
          </div>
        </div>
        <navTitle title="涉煤炭企业煤炭产能分布情况" class="mt27" />
        <coalDistribution />
      </div>
    </div>

    <Menu></Menu>
  </div>
</template>
        
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import capacityReductionStatistics from "./cpn/capacityReductionStatistics.vue";
import reduceLiabilities from "./cpn/reduceLiabilities.vue";
import pressureReductionSituation from "./cpn/pressureReductionSituation.vue";
import treatingDifficulty from "./cpn/treatingDifficulty.vue";
import enterpriseProportion from "./cpn/enterpriseProportion.vue";
import reduceWorkEffectiveness from "./cpn/reduceWorkEffectiveness.vue";
import coalDistribution from "./cpn/coalDistribution.vue";
</script>
        
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;


  .mr24px {
    margin-right: 24px;
  }

  .mainBox {
    display: flex;
    padding: 32px 47px;

    .rightChart {
      margin-left: 48px;

      .rightCenterChart {
        display: flex;
      }
    }
  }
}


.mt27 {
  margin-top: 27px;
}
</style>