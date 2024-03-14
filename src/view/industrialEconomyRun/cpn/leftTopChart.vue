<template>
    <div class="leftTopChart">
        <cardList :card-list="state.cardList" @showModel="showModel" />
        <leftTopPopUp :show-model="state.showModel" :tableData="state.tableData" />
    </div>
</template>
    
<script setup>
import cardList from './cardList.vue'
import { onMounted, reactive } from 'vue'
import emitBus from "@utils/bus";
import leftTopPopUp from '../popup/leftTopPopUp.vue'
import bg1 from '@images/industrialEconomyRun/新型高端研发机构.png'
import bg2 from '@images/industrialEconomyRun/新型高端研发机构-2.png'
import bg3 from '@images/industrialEconomyRun/新型高端研发机构-3.png'
import bg4 from '@images/industrialEconomyRun/新型高端研发机构-4.png'
import { leftTopTable } from '../json/leftTopTable'

const state = reactive({
    cardList: [
        {
            bg: bg1,
            num: 885.33,
            unit: '万吨',
            desc: '冶金有色'
        },
        {
            bg: bg2,
            num: 1249.89,
            unit: '万吨',
            desc: '煤炭'
        },
        {
            bg: bg3,
            num: 220.34,
            unit: '亿千瓦时',
            desc: '电力'
        },
        {
            bg: bg4,
            num: 13801.45,
            desc: '其他'
        }
    ],
    showModel: false,
    tableData: []
})
const showModel = (index) => {
    state.showModel = true
    state.tableData = leftTopTable[`data` + (index + 1)]
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