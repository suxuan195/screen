<template>
    <div class="rightTopChart">
        <ul class="bottomCard">
            <li v-for="(item, index) in state.bottomList" :key="index">
                <p class="bg" :style="`background-image: url(${item.img});`">
                </p>
                <div class="content">
                    <div class="flex" @click="showModelClick">
                        <h2>{{ item.value }}</h2>
                        <span class="unit">人</span>
                    </div>
                    <span class="desc">{{ item.name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import rightBottomImg1 from '@images/responsibility.png'
const state = reactive({
    bottomList: [{
        value: 80,
        img: rightBottomImg1,
        name: '责任认定总人数'
    },
    {
        value: 35,
        img: rightBottomImg1,
        name: '委管干部'
    },
    {
        value: 35,
        img: rightBottomImg1,
        name: '省管干部'
    },
    {
        value: 35,
        img: rightBottomImg1,
        name: '企业管理干部'
    }],
    showModel: false
})
</script>
    
<style lang="scss" scoped>
.rightTopChart {
    .bottomCard {
        padding: 20px 18px;
        width: 420px;
        height: 206px;
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;

        li {
            display: flex;

            .bg {
                width: 72px;
                height: 72px;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 1;
                background-size: 100% 100%;
                margin-right: 10px;
            }

            .content {
                width: 105px;
                height: 72px;
                opacity: 1;
                background-image: url('@images/IntelligentEnergyManagement/能源安全事故文字背景.png');
                background-size: 100% 100%;
                box-sizing: border-box;

                .flex {
                    display: flex;
                    align-items: flex-end;
                    padding: 10px 14px;
                }

                h2 {
                    font-size: 28px;
                    font-weight: normal;
                    line-height: 28px;
                    letter-spacing: 0px;
                    color: #00CCFF;
                }

                .unit {
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    text-align: center;
                    letter-spacing: 0.2em;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
                    padding-left: 4px;

                }

                .desc {
                    margin-top: 12px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                    padding-left: 18px;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }

        li:nth-child(1) {
            margin-bottom: 24px;
        }

        li:nth-child(odd) {
            margin-right: 10px;
        }
    }
}
</style>