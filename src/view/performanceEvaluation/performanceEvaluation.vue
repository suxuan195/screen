<template>
    <div class="screen">
        <Header title="业绩考核"></Header>
        <div class="checkRouter">
            <span @click="rourerClick"></span>
        </div>
        <ul class="mainBox">
            <li class="leftBox">
                <!-- <navTitle title="盈余能力综合分析" /> -->
                <leftTopChart ref="leftTopChartRef" />
                <!-- <navTitle title="债务风险综合分析" /> -->
                <leftBottomChart />
            </li>
            <li class="rightBox">
                <!-- <navTitle title="资产质量综合分析" /> -->
                <rightTopChart />
                <!-- <navTitle title="经营增长综合分析" /> -->
                <rightBottomChart />
            </li>
        </ul>
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "performanceObjectives"
  })
}
const leftTopChartRef = ref(null);
onMounted(() => {
    console.log(leftTopChartRef.value.goBack);
})
const goBack = () => {
    leftTopChartRef.value.goBack = true
}
</script>
          
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    width: 100%;
    height: 100%;

    .mt40 {
        margin-top: 40px;
    }

    .mainBox {
        display: flex;
        padding: 38px 47px;
        justify-content: space-between;
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