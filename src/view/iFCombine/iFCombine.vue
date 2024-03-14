<template>
    <div class="screen">
        <Header title="产融结合"></Header>
        <ul class="mainBox">
            <li class="leftBox">
                <navTitle title="监管企业资本金额统计" />
                <leftTopChart />
                <leftBottomChart />
            </li>
            <li class="rightBox">
                <navTitle title="股份转化统计" />
                <rightTopChart />
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
import rightBottomChart from "./cpn/rightBottomChart.vue"
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