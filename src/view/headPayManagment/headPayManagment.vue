<template>
    <div class="screen">
        <Header title="负责人薪酬管理"></Header>
        <div style="position: absolute;right: 100px;cursor: pointer;width: 8px;height: 8px;background-color: #fff;border-radius: 50%;"
            @click="rourerClick"></div>
        <ul class="main">
            <li>
                <navTitle title="企业负责人薪酬与经济效益联动情况" />
                <topChart />
            </li>
            <li class="bottomBox">
                <div>
                    <navTitle title="负责人薪资分布" :isShow="true" @showModelClick="showModelClick" />
                    <bottomLeft />
                </div>
                <div>
                    <navTitle title="职工人数统计" />
                    <bottomCenterLeft />
                </div>
                <div>
                    <navTitle title="企业经营管理指标" />
                    <bottomRightChart />
                </div>
                <div>
                    <navTitle title="负责人收入组成" :isShow="true" @showModelClick="showModelClick1" />
                    <bottomRightRightChart />
                </div>
            </li>
        </ul>
        <leftDialog ref="leftDialogRef" />
        <rightDialog ref="rightDialogRef" />
        <Menu></Menu>
    </div>
</template>
  
<script setup>
import topChart from "./cpn/topChart.vue";
import Menu from "@components/Menu/index.vue";
import bottomLeft from "./cpn/bottomLeft.vue";
import leftDialog from "./dialog/leftDialog.vue";
import Header from "@components/Header/index.vue";
import rightDialog from "./dialog/rightDialog.vue";
import bottomCenterLeft from "./cpn/bottomCenterLeft.vue";
import bottomRightChart from "./cpn/bottomRightChart.vue"
import bottomRightRightChart from "./cpn/bottomRightRightChart.vue"

import { ref } from 'vue';
const leftDialogRef = ref(null);
const rightDialogRef = ref(null);
const showModelClick = () => {
    leftDialogRef.value.showModel = true
}
const showModelClick1 = () => {
    rightDialogRef.value.showModel = true
}
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
    router.push({
        name: "payrollManagement"
    })
}
</script>
  
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;
    position: relative;

    .main {
        margin-top: 30px;
        padding: 0 48px;

        .bottomBox {
            display: flex;
            justify-content: space-between;
        }
    }
}

.mainTitle {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 431px;
    height: 46px;
    padding-left: 75px;

    p {
        white-space: nowrap;
        font-size: 20px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0.2em;
        background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
}

.checkRouter {
    position: fixed;
    right: 180px;
    top: 100px;
    display: flex;
    gap: 6px;

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        cursor: pointer;
        background-color: rgba(255, 255, 255, .4);

        &:hover {
            background-color: rgba(255, 255, 255, .8);
        }
    }
}
</style>
  