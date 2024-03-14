<template>
    <div class="applicationSystemNav">
        <p></p>
        <div>
            <span>26</span>
            <i>个</i>
        </div>
    </div>
</template>
    
<script setup>

</script>
    
<style lang="scss" scoped>
.applicationSystemNav {
    width: 432px;
    height: 80px;
    background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        width: 72px;
        height: 72px;
        background-image: url('@images/applicationModuleManagment/应用系统总数量icon.png');
        background-size: 100% 100%;
        margin-right: 32px;
    }

    div {
        span {
            font-size: 40px;
            font-weight: normal;
            line-height: 40px;
            text-align: center;
            letter-spacing: 0.1em;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            z-index: 0;

        }

        i {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            text-align: right;
            letter-spacing: 0px;
            color: #FFFFFF;
            z-index: 1;
        }
    }
}
</style>