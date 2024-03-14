<template>
    <div class="screen">
        <Header title="国有资产统计"></Header>
        <ul class="mainBox">
            <li>
                <navTitle title="两金" />
                <topList />
                <leftTopChart />
                <navTitle title="成本管理费用" />
                <leftBottomBox />
            </li>
            <li>
                <navTitle title="利润指标" />
                <centerTopChart />
                <navTitle title="五率指标监控" />
                <centerBottomChart />
            </li>
            <li>
                <navTitle title="经营现金流" />
                <rightTopChart />
                <navTitle title="资金情况" />
                <rightBottomChart />
            </li>
        </ul>
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import topList from './cpn/topList.vue';
import leftTopChart from "./cpn/leftTopChart.vue";
import leftBottomBox from "./cpn/leftBottomBox.vue";
import centerTopChart from "./cpn/centerTopChart.vue";
import centerBottomChart from "./cpn/centerBottomChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
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
</style>