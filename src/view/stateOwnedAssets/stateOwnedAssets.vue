<template>
    <div class="screen">
        <Header title="国有资产追责"></Header>
        <div class="mainBox">
            <div class="left_box">
                <navTitle title="国有资产损失统计" />
                <leftTopChart />
                <navTitle title="认定损失及损失风险" />
                <leftCenterChart />
                <navTitle title="责任认定" />
                <leftBottomChart />
            </div>
            <div class="center_box">
                <navTitle title="违规线索来源" />
                <centerTopChart />
                <navTitle title="违规追责开展情况" />
                <centerCentetChart />
                <navTitle title="年度违规问题数量" />
                <centerBottomChart />
            </div>
            <div class="right_box">
                <nav-title title="各行业违规问题数量" />
                <rightTopChart />
                <navTitle title="各企业违规问题数量" />
                <rightCenterChart />
                <navTitle title="违规问题完成整改" />
                <rightBottomChart />
            </div>
        </div>
        <!-- <leftTopDialog ref="leftTopDialogRef" /> -->
        <!-- <topCenterDialog ref="leftTopDialogRef" /> -->
        <!-- <centerCenterDialog ref="leftTopDialogRef" /> -->
        <!-- <rightTopDialog ref="leftTopDialogRef" /> -->
        <!-- <rightBottomDialog ref="leftTopDialogRef" /> -->
        <!-- <leftCenterDialog ref="leftTopDialogRef" /> -->
        <!-- <leftBottomDialog ref="leftTopDialogRef" /> -->
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import centerTopChart from "./cpn/centerTopChart.vue"
import rightTopChart from "./cpn/rightTopChart.vue";
import leftCenterChart from "./cpn/leftCenterChart.vue"
import centerCentetChart from "./cpn/centerCentetChart.vue";
import rightCenterChart from "./cpn/rightCenterChart.vue"
import leftBottomChart from './cpn/leftBottomChart.vue'
import centerBottomChart from './cpn/centerBottomChart.vue'
import rightBottomChart from "./cpn/rightBottomChart.vue";
// import leftTopDialog from "./dialog/leftTopDialog.vue";
// import rightTopDialog from './dialog/rightTopDialog.vue';
// import topCenterDialog from "./dialog/topCenterDialog.vue";
// import centerCenterDialog from "./dialog/centerCenterDialog.vue";
// import rightBottomDialog from "./dialog/rightBottomDialog.vue";
// import leftCenterDialog from "./dialog/leftCenterDialog.vue";
// import leftBottomDialog from "./dialog/leftBottomDialog.vue";
// import { onMounted, ref } from 'vue';
// const leftTopDialogRef = ref(null)
// onMounted(() => {
//     leftTopDialogRef.value.showModel = true
// })
</script>
          
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    width: 100%;
    height: 100%;

    .mainBox {
        display: flex;
        padding: 38px 47px;
        justify-content: space-between;
    }
}
</style>