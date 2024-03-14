<template>
    <div class="leftTopChart">
        <cardList :card-list="state.cardList" @showModel="showModel" />
        <rightTopPopUp :show-model="state.showModel" />
    </div>
</template>
    
<script setup>
import cardList from './cardList.vue'
import { onMounted, reactive } from 'vue'
import emitBus from "@utils/bus";
import rightTopPopUp from '../popup/rightTopPopUp.vue'
import bg1 from '@images/industrialEconomyRun/新型高端研发机构-5.png'
import bg2 from '@images/industrialEconomyRun/新型高端研发机构-6.png'
import bg3 from '@images/industrialEconomyRun/新型高端研发机构-7.png'
import bg4 from '@images/industrialEconomyRun/新型高端研发机构-8.png'
const state = reactive({
    cardList: [
        {
            bg: bg1,
            num: 3,
            unit: '个',
            desc: '设备总数'
        },
        {
            bg: bg2,
            num: 0,
            unit: '个',
            desc: '当前检修设备'
        },
        {
            bg: bg3,
            num: 4,
            unit: '次',
            desc: '本年检修次数'
        },
        {
            bg: bg4,
            num: 1,
            unit: '次',
            desc: '本月检修次数'
        }
    ],
    showModel: false
})
const showModel = () => {
    state.showModel = true
}
onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
})
</script>
    
<style lang="scss" scoped>
.leftTopChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 420px;
    height: 257px;
    padding: 45px 18px;
    box-sizing: border-box;
}
</style>