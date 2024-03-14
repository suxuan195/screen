<template>
    <div class="platformUsersNav">
        <ul>
            <li v-for="(item, index) in  numList.toString().split('').map(Number)" :key="index">
                <span class="wan" v-if="index === 1">千</span>
                <span class="qian" v-if="index === 2">百</span>
                <span class="num"><i>{{ item }}</i></span>
                <p style="color: #A6B2FF;display: block;" v-if="(index + 1) % 3 === 0">，</p>
            </li>
        </ul>
    </div>
</template>
    
<script setup >
const numList = '02231';
</script>
    
<style lang="scss" scoped>
.platformUsersNav {
    width: 432px;
    height: 80px;
    background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
    background-size: 100% 100%;

    ul {
        display: flex;
        justify-content: center;


        li {
            position: relative;
            padding-top: 27px;
            display: flex;
            align-items: flex-end;

            .wan,
            .qian {
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-80%);
                font-size: 14px;
                font-weight: normal;
                line-height: 12px;
                text-align: center;
                letter-spacing: 0.2em;
                background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            }

            .num {
                display: block;
                width: 28px;
                height: 34px;
                background-image: url("@images/propertyMonitoringManagement/chang.png");
                background-size: 100% 100%;
                font-size: 24px;
                font-weight: normal;
                line-height: 34px;
                text-align: center;
                letter-spacing: 0.2em;
                margin-right: 4px;

                i {
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 24px;
                    text-align: center;
                    letter-spacing: 0.2em;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }


            }
        }
    }
}
</style>