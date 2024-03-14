<template>
    <div class="screen">
        <Header title="企业信息"></Header>
        <div class="main">
            <div class="leftBox">
                <navTitle title='领导班子建设情况' />
                <leftTopBox />
                <nav-title title="企业所属行业分布情况" />
                <leftBottomChart />
            </div>
            <div class="rightBox">
                <navTitle title='企业所属类型分布情况' />
                <rightTopChart />
                <navTitle title='企业所属层级分布情况' />
                <rightBottomChart />
            </div>
        </div>
        <!-- <coLeadershipTeam ref="coLeadershipTeamRef" /> -->
        <!-- <enterpriseBaseInfo ref="enterpriseBaseInfoRef" /> -->
        <!-- <personelBaseInfo ref="personelBaseInfoRef" /> -->
        <center-map-chat></center-map-chat>
        <div class="bg_bottom"></div>
        <Menu></Menu>
    </div>
</template>
<script setup>
import Menu from "@components/Menu/index.vue";
import leftTopBox from "./cpn/leftTopBox.vue";
import Header from "@components/Header/index.vue";
import centerMapChat from "./cpn/centerMapChat.vue";
import rightTopChart from './cpn/rightTopChart.vue';
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
// import coLeadershipTeam from "./popup/coLeadershipTeam.vue";
// import enterpriseBaseInfo from "./popup/enterpriseBaseInfo.vue";
// import personelBaseInfo from './popup/personelBaseInfo.vue';
// import { onMounted, ref } from "vue";
// const personelBaseInfoRef = ref(null)
// onMounted(() => {
//     personelBaseInfoRef.value.showModel = true
// })
</script>
    
<style lang="scss" scoped>
.screen {
    background: url("@images/safeProduction/bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;

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
