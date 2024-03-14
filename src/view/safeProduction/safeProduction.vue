<template>
    <div class="screen">
        <Header title="安全生产"></Header>
        <div class="main">
            <div class="leftBox">
                <navTitle title='安全生产事件统计' />
                <leftTopChart />
                <navTitle title='事故等级占比' class="mt50" />
                <leftBottomChart />
            </div>
            <div class="rightBox">
                <navTitle title='各企业安全生产事件统计' />
                <rightTopChart />
                <rightBottomChart class="mt24" />
            </div>
        </div>
        <center-map-chat></center-map-chat>
        <!-- <safe-production-dialog ref="safeProduction" /> -->
        <div class="bg_bottom"></div>
        <Menu></Menu>
    </div>
</template>
<script setup>
// import { onMounted, ref } from 'vue'
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import centerMapChat from "./cpn/centerMapChat.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import rightBottomChart from './cpn/rightBottomChart.vue'
// import safeProductionDialog from "./dialog/safeProductionDialog.vue";
// const safeProduction = ref(null)
// onMounted(() => {
//     safeProduction.value.showModel = true
// })
</script>
    
<style lang="scss" scoped>
.screen {
    background: url("@images/safeProduction/bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;

    .mt50 {
        margin-top: 54px;
    }

    .mt24 {
        margin-top: 24px;
    }

    .main {
        padding: 0 48px;
        display: flex;
        justify-content: space-between;
    }

    .bg_bottom {
        background-image: url("@images/IntelligentEnergyManagement/bottom_bg.png");
        background-size: 100% 100%;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 70px;
    }
}
</style>
