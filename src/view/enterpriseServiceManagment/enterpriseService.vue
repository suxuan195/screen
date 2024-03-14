<template>
    <div class="screen">
        <Header title="企业服务平台监测"></Header>
        <ul class="mainBox">
            <li class="leftBox">
                <navTitle title="热门咨询阅读TOP5" />
                <leftTopBox />
                <navTitle title="热门知识下载量TOP5" :isShow="true" @showModelClick="downClick" />
                <leftCenterBox />
                <navTitle title="企业使用量TOP5" :isShow="true" @showModelClick="useClick"  />
                <leftBottomBox />
            </li>
            <li class="centerBox">
                <centerTopBox />
                <navTitle title="企业领导人培训情况" class="mt40" />
                <centerBottomTable />
            </li>
            <li class="rightBox">
                <navTitle title="用户行为" :isShow="true" @showModelClick="userEvent" />
                <rightTopBox />
                <navTitle title="智能问答关键词云" />
                <rightCenterBox />
                <navTitle title="用户平均活跃" />
                <rightBottomChart />
            </li>
        </ul>
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import { provide } from 'vue';
import Menu from "@components/Menu/index.vue";
import leftTopBox from "./cpn/leftTopBox.vue";
import leftCenterBox from "./cpn/leftCenterBox.vue";
import leftBottomBox from "./cpn/leftBottomBox.vue";
import centerTopBox from "./cpn/centerTopBox.vue";
import rightTopBox from "./cpn/rightTopBox.vue";
import centerBottomTable from "./cpn/centerBottomTable.vue";
import rightCenterBox from "./cpn/rightCenterBox.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
let events = Object.create(null);
provide('registerEvent', (eventObj) => {
    events || (events = {});
    Object.assign(events, eventObj);
});

provide('executeEvent', (eventName, ...args) => {
    const event = events[eventName];
    return event?.(...args);
});

const userEvent = () => {
    events?.getUserEventTable()
}

const downClick = () => {
    events?.getDownTable()
}

const useClick = () => {
    events?.getUseTable()
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
        justify-content: space-between;
        padding: 38px 47px;
    }
}
</style>