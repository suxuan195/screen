<template>
    <div class="screen">
        <Header title="国企改革"></Header>
        <div class="mainBox">
            <div class="leftBox">
                <navTitle title="完善中国特色现代企业制度" />
                <leftTopChartVue />
                <leftCenterChartVue />
                <navTitle title="混合所有制改革积极稳妥有序推进" />
                <leftBottomChart />
            </div>
            <div class="center">
                <navTitle title="加强国有企业党的领导党的建设" />
                <centerTopBox />
                <navTitle title="关于清理退出不具备优势的非主营业务" />
                <centerBottomChart />
            </div>
            <div class="rightBox">
                <navTitle title="三项制度深化、市场机制健全" />
                <rightTopChart />
                <rightCenterChart />
                <rightBottomChart />
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import centerTopBox from "./cpn/centerTopBox.vue";
import Header from "@components/Header/index.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import leftTopChartVue from "./cpn/leftTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightCenterChart from "./cpn/rightCenterChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
import leftCenterChartVue from "./cpn/leftCenterChart.vue"
import centerBottomChart from "./cpn/centerBottomChart.vue"

</script>
          
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    width: 100%;
    height: 100%;

    .mainBox {
        display: flex;
        padding: 38px 47px;

        .center {
            margin: 0 48px;
        }

    }
}
</style>