<template>
    <div class="cardList">
        <ul>
            <li v-for="(item, index) in  props.cardList" :key="index" @click="showModel(index)">
                <div class="bg" :style="{ background: `url(${item.bg}) ` }"></div>
                <div class="content">
                    <div class="top">
                        <h2>{{ item.num }}</h2>
                    </div>
                    <div class="unit">{{ item.unit }}</div>
                    <div class="desc" :style="{ marginTop: item.unit ? '10px' : '20px' }">{{ item.desc }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
const props = defineProps({
    cardList: {
        type: Array,
        default() {
            return []
        }
    }
})
const emit = defineEmits(['showModel'])
const showModel = (val) => {
    emit('showModel', val)
}
</script>
    
<style lang="scss" scoped>
.cardList {

    ul {
        display: flex;
        flex-wrap: wrap;

        li {
            display: flex;
            cursor: pointer;



            .bg {
                width: 72px;
                height: 72px;
                background: rgba(0, 116, 212, 0.25);
            }

            .content {
                box-sizing: border-box;
                padding-left: 14px;
                padding-top: 5px;
                margin-left: 8px;
                width: 100px;
                height: 75px;
                background-image: url('@images/IntelligentEnergyManagement/能源安全事故文字背景.png');
                background-size: 100% 100%;

                .top {
                    white-space: nowrap;
                    display: flex;
                    align-items: center;

                    h2 {
                        width: 120px;
                        font-size: 24px;
                        font-weight: normal;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #00CCFF;
                    }


                }

                .unit {
                    margin-right: 4px;
                    font-size: 12px;
                    padding-top: 2px;
                    font-weight: normal;
                    line-height: 12px;
                    letter-spacing: 0.2em;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }

                .desc {
                    margin-top: 8px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                    white-space: nowrap;
                }
            }
        }

        li:nth-child(3),
        li:nth-child(4) {
            margin-top: 10px;
        }

        li:nth-child(2),
        li:nth-child(4) {
            margin-left: 10px;
        }


        .marginLeft18 {
            margin-left: 18px;
        }

        .marginTop24 {
            margin-top: 24px;
        }
    }
}
</style>