<template>
    <div class="screen">
        <Header title="投资项目综合分析"></Header>
        <div class="main">
            <div class="leftBox">
                <navTitle title='投资方向分布情况' />
                <leftTopChart />
                <navTitle title='投资行业分布情况' />
                <leftCenterTableVue />
                <navTitle title='投资类型分布情况' />
                <leftBottomChart />
            </div>
            <div class="rightBox">
                <navTitle title='战略新兴项目' />
                <rightTopChart />
                <navTitle title='年度投资计划情况' />
                <rightCenterChart />
                <navTitle title='项目情况' />
                <rightBottomChart />
            </div>
        </div>
        <centerTopListVue />
        <centerBottomTable />
        <center-map-chat></center-map-chat>
        <div class="bg_bottom"></div>
        <Menu></Menu>
    </div>
</template>
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import centerMapChat from "./cpn/centerMapChat.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import leftCenterTableVue from "./cpn/leftCenterTable.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import centerTopListVue from "./cpn/centerTopList.vue";
import centerBottomTable from "./cpn/centerBottomTable.vue";
import rightTopChart from './cpn/rightTopChart.vue'
import rightCenterChart from "./cpn/rightCenterChart.vue";
import rightBottomChart from './cpn/rightBottomChart.vue'
</script>
    
<style lang="scss" scoped>
.screen {
    background: url("@images/propertyManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;
    position: relative;


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
    