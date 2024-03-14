<template>
    <div class="rightBottomChart">
        <el-scrollbar max-height="100%">
            <div class="desc">{{ props.history1 }}</div>
        </el-scrollbar>
        <el-scrollbar max-height="87px">
            <div class="card" v-if="props.history2">
                {{ props.history2 }}
            </div>
        </el-scrollbar>
    </div>
</template>
    
<script setup>
const props = defineProps({
    history1: {
        type: String,
        default: ''
    },
    history2: {
        type: String,
        default: ''
    }
})
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    width: 432px;
    height: 218px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    padding: 16px 0;
    box-sizing: border-box;

    .desc {
        padding-left: 36px;
        padding-right: 24px;
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0.1em;
        color: #FFFFFF;
        position: relative;

        &::before {
            position: absolute;
            content: "";
            left: 20px;
            top: 0px;
            width: 11.67px;
            height: 22.23px;
            background: url("@/images/indicate/left.png") 0% 0% / 100% 100% no-repeat;
        }

        &::after {
            position: absolute;
            content: "";
            right: 22px;
            bottom: 0;
            width: 11.67px;
            height: 22.23px;
            background: url("@/images/indicate/left.png") 0% 0% / 100% 100% no-repeat;
            transform: rotate(180deg);
        }
    }

    .card {
        margin: 15px 16px 0 16px;
        width: 390px;
        height: 86.48px;
        background-image: url('@images/jGEnterpriseManagement/历史沿革.png');
        background-size: 100% 100%;
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0.1em;
        color: #FFFFFF;
        padding: 7px 9px 7px 27px;
        box-sizing: border-box;
    }
}
</style>