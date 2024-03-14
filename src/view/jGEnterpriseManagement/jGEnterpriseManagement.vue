<template>
    <div class="screen">
        <Header :title="title" :allShow="true" @allClick="allClick"> </Header>
        <div class="mainBox">
            <div class="leftBox">
                <navTitle title="产业布局分析" />
                <leftTopBox :imgUrl="state.smallImage" :title="title" />
                <navTitle title="产量完成情况" />
                <leftCenterChart :dataList="dataList" :titles="titles" />
                <navTitle title="经营情况" />
                <leftBottomChart :dataList="lbList" />
            </div>
            <div class="centerBox">
                <centerTopBox :list="list" :bigUrl="state.bigImage" :title="state.title" />
                <navTitle title="重要项目" />
                <centerBottomTable :tableData="tableData" />
            </div>
            <div class="rightBox">
                <navTitle title="大额资金支出趋势" />
                <rightTopChart />
                <navTitle title="高质量发展" />
                <rightCenterBox :rcList="rcList" />
                <navTitle title="历史沿革" />
                <rightBottomChart :history1="state.history1" :history2="state.history2" />
            </div>
        </div>
        <div class="bg_bottom"></div>
        <allEnterpriseVue ref="allEnterpriseVueRef" @select="select" />
        <Menu></Menu>
    </div>
</template>
      
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Menu from "@components/Menu/index.vue";
import Header from "@components/Header/index.vue";
import leftTopBox from "./cpn/leftTopBox.vue";
import centerTopBox from "./cpn/centerTopBox.vue";
import rightTopChart from "./cpn/rightTopChart.vue"
import rightCenterBox from "./cpn/rightCenterBox.vue";
import leftCenterChart from "./cpn/leftCenterChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
import allEnterpriseVue from "./dialog/allEnterprise.vue";
import centerBottomTable from "./cpn/centerBottomTable.vue";
import { dataJson, map, countMap, productionMap, RCMap, LBMap, titlesMap } from './json/data'
const state = reactive({
    smallImage: '',
    bigImage: '',
    title: '',
    history1: '',
    history2: ''
})
const title = ref('金川集团股份有限公司')
const tableData = ref(map.get(title.value))
const list = ref(countMap.get(title.value))
const dataList = ref(productionMap.get(title.value))
const rcList = ref(RCMap.get(title.value))
const lbList = ref(LBMap.get(title.value))
const titles = ref(titlesMap.get(title.value))

const allEnterpriseVueRef = ref(null);
const allClick = () => {
    allEnterpriseVueRef.value.showModel = true
}
onMounted(() => {
    Object.keys(state).forEach((key) => {
        state[key] = dataJson[0][key]
    })
})
const select = (name, index) => {
    title.value = name
    document.title = name
    Object.keys(state).forEach((key) => {
        state[key] = dataJson[index][key]
    })
    tableData.value = map.get(title.value) || map.get('金川集团股份有限公司')
    list.value = countMap.get(title.value) || countMap.get('金川集团股份有限公司')
    dataList.value = productionMap.get(title.value) || productionMap.get('金川集团股份有限公司')
    rcList.value = RCMap.get(title.value) || RCMap.get('金川集团股份有限公司')
    titles.value = titlesMap.get(title.value) || RCMap.get('金川集团股份有限公司')
    lbList.value = LBMap.get(title.value) || LBMap.get('金川集团股份有限公司')
    allEnterpriseVueRef.value.showModel = false
}
</script>
      
<style lang="scss" scoped>
.screen {
    background: url("@images/propertyManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    height: 100%;
    width: 100%;
    position: relative;

    .mainBox {
        display: flex;
        padding: 0 50px;
        justify-content: space-between;
    }

    .bg_bottom {
        background-image: url("@images/IntelligentEnergyManagement/bottom_bg.png");
        background-size: 100% 100%;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 70px;
    }
}

:deep(.title.ttf) {
    font-size: 30px;
}
</style>