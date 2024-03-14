<template>
    <div class="screen">
        <Header title="职工分配调控"></Header>
        <div style="position: absolute;right: 100px;cursor: pointer;width: 8px;height: 8px;background-color: #fff;border-radius: 50%;"
            @click="rourerClick"></div>
        <div class="mainBox">
            <div class="leftBox">
                <navTitle title='本月工资总额总体情况' />
                <leftTopBox />
                <navTitle title='各层级人员工资总额及平均工资' />
                <leftBottomChart />
            </div>

            <div class="rightBox">
                <navTitle title='工资总额与经济效益联动情况' />
                <rightTopChart />
                <navTitle title='工资总额时序进度' />
                <rightBottomChart />
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>
        
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import leftTopBox from "./cpn/leftTopBox.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue"
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
    router.push({
        name: "employeeAllocation"
    })
}
</script>
        
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;
    position: relative;

    .mainBox {
        margin-top: 30px;
        display: flex;
        padding: 0 50px;
        justify-content: space-between;
    }
}
</style>