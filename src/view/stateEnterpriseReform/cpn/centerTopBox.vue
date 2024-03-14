<template>
    <div class="centerTopBox">
        <ul>
            <li v-for="(item, index) in  state.cardList" :key="index + 'card'">
                <div class="img_box">
                    <img :src="item.bg" alt="" srcset="">
                </div>
                <div class="num_box">
                    <h2>{{ item.household }}<i>户</i></h2>
                    <h3 style="margin-left: 20px;">{{ item.percentage }}<i>%</i></h3>
                </div>
                <div class="line"></div>
                <p class="desc" v-html="item.desc"></p>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import icon1 from '@images/stateEnterpriseReform/icon1.png'
import icon2 from '@images/stateEnterpriseReform/icon2.png'
import icon3 from '@images/stateEnterpriseReform/icon3.png'
const state = reactive({
    cardList: [
        {
            bg: icon1,
            household: 32,
            percentage: 100,
            desc: '已建立第一议题制度<br/>的一级企业'
        },
        {
            bg: icon2,
            household: 1,
            percentage: 3.13,
            desc: '已建立践行不忘初心<br/>长效机制的一级企业'
        },
        {
            bg: icon3,
            household: 9,
            percentage: 28.13,
            desc: '已制定党建相关制度<br/>的混合所有制企业'
        }
    ]

})

</script>
<style lang="scss" scoped>
.centerTopBox {
    width: 864px;
    height: 496px;
    margin-bottom: 50px;

    ul {
        display: flex;

        li:not(:last-child) {
            margin-right: 15px;
        }

        li {
            width: 284px;
            height: 455.35px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .img_box {
                width: 94px;
                height: 64px;
                background-image: url('@images/stateEnterpriseReform/底座.png');
                background-size: 100% 100%;
                position: relative;

                img {
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    top: -25px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

            .num_box {
                display: flex;
                margin-top: 5px;

                h2,
                h3 {
                    padding-top: 11px;
                    font-size: 36px;
                    font-weight: normal;
                    line-height: 24px;
                    text-align: center;
                    letter-spacing: 0em;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);

                    i {
                        font-size: 16px;
                        font-weight: normal;
                        line-height: 20px;
                        text-align: center;
                        letter-spacing: 0em;
                        background: linear-gradient(180deg, #FFFFFF 0%, #90D1FF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                    }

                }
            }

            .line {
                margin-top: 40px;
                margin-bottom: 24px;
                width: 98px;
                height: 2px;
                background-image: url('@images/stateEnterpriseReform/line.png');
                background-size: 100% 100%;
            }

            .desc {
                font-family: PingFang SC;
                font-size: 16px;
                font-weight: normal;
                line-height: 24px;
                text-align: center;
                letter-spacing: 0em;
                color: #FFFFFF;
                z-index: 1;
            }

        }

        li:nth-child(1) {
            background-image: url('@images/stateEnterpriseReform/矩形左.png');
            background-size: 100% 100%;
        }

        li:nth-child(2) {
            background-image: url('@images/stateEnterpriseReform/矩形中.png');
            background-size: 100% 100%;
        }

        li:nth-child(3) {
            background-image: url('@images/stateEnterpriseReform/矩形右.png');
            background-size: 100% 100%;
        }
    }
}
</style>