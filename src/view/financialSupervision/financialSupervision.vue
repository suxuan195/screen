<template>
    <div class="screen">
        <Header title="财务监督"></Header>
        <div class="mainBox">
            <div class="leftBox">
                <navTitle title="资产总额行业占比" />
                <leftTopChart />
                <navTitle title="资产总额企业占比" />
                <leftCenterChart />
                <navTitle title="资产总额企业累计增减" />
                <leftBottomChart />
            </div>
            <div class="centerBox">
                <navTitle title="近10年资产总额变化趋势" />
                <centerTopChart />
                <navTitle title="近10年资产负债率变化趋势" />
                <centerChart />
                <navTitle title="近10年所有者权益变化趋势" />
                <centerBotttomChart />
            </div>
            <div class="rightBox">
                <navTitle title="净资产企业占比" />
                <rightTopChart />
                <navTitle title="净资产企业累计增减" />
                <rightCenterChart />
                <navTitle title="资产负债率企业累计增减" />
                <rightBottomChart />
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import centerChart from "./cpn/centerChart.vue";
import leftTopChart from './cpn/leftTopChart.vue';
import Header from "@components/Header/index.vue";
import rightTopChart from './cpn/rightTopChart.vue';
import leftCenterChart from './cpn/leftCenterChart.vue';
import leftBottomChart from './cpn/leftBottomChart.vue';
import centerTopChart from "./cpn/centerTopChart.vue";
import rightCenterChart from './cpn/rightCenterChart.vue';
import rightBottomChart from './cpn/rightBottomChart.vue'
import centerBotttomChart from "./cpn/centerBotttomChart.vue";
</script>
          
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    width: 100%;
    height: 100%;

    .mainBox {
        display: flex;
        justify-content: space-between;
        padding: 38px 47px;

    }
}

:deep(.mainTitle) {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 420px;
    height: 62px;
    padding-left: 65px;

    p {
        white-space: nowrap;
        font-size: 20px;
        font-weight: normal;
        line-height: 40px;
        letter-spacing: 0.2em;
        background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
}
</style>