<template>
    <div class="centerTopBox">
        <!-- <div class="top_box">
            <h2 class="ttf">累计用户总数</h2>
            <ul class="total">
                <template v-for="(item, index) in num1 + ''" :key="index+'11'">
                    <div class="symbol" v-if="index == 1">,</div>
                    <li>
                        <p>{{ item }}</p>
                    </li>
                </template>
            </ul>
        </div> -->
        <div class="centerMap">
            <div class="main">
                <h2 class="ttf">累计用户总数</h2>
                <ul class="total">
                    <template v-for="(item, index) in num1 + ''" :key="index+'11'">
                        <!-- <div class="symbol" v-if="index == 1">,</div> -->
                        <li>
                            <p>{{ item }}</p>
                        </li>
                    </template>
                </ul>
                <div class="img">
                    <div class="bg-1"></div>
                    <div class="bg-2"></div>
                    <div class="bg-3"></div>
                    <div class="bg-4"></div>
                </div>
            </div>
        </div>
        <div class="bottom_list">
            <div>
                <img src="@images/enterpriseServiceManagment/活跃用户.png" alt="">
                <div class="con">
                    <span>30日活跃用户</span>
                    <p>{{ num2 }}<i>户</i></p>
                </div>
            </div>
            <div>
                <img src="@images/enterpriseServiceManagment/用户活跃率.png" alt="">
                <div class="con">
                    <span>30日用户活跃率</span>
                    <p>{{ num3 }}<i>%</i></p>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { useCount } from '../hooks';
const { num1, num2, num3 } = useCount();
</script>
    
<style lang="scss" scoped>
.centerTopBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .top_box {
        width: 768px;
        height: 316px;
        background-image: url('@images/enterpriseServiceManagment/累计用户总数.png');
        background-size: 100% 100%;
        text-align: center;

        h2 {
            padding-top: 60px;
            font-size: 32px;
            font-weight: normal;
            line-height: 32px;
            letter-spacing: 0.2em;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%, #90D1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }


    }

    .centerMap {
        width: 864px;
        height: 316px;
        display: flex;
        justify-content: center;
        background: url("@images/indicate/center-bg.png") 0% 0% / 100% 100% no-repeat;
        margin-top: 36px;
        padding: 32px 16px;
        box-sizing: border-box;

        .main {
            width: 100%;
            height: 100%;
            background: url("@images/indicate/center.png") 0% 0% / 100% 100% no-repeat;
            position: relative;

            .total {
                display: flex;
                justify-content: center;
                margin-top: 20px;

                li {
                    width: 40px;
                    height: 48px;
                    font-size: 40px;
                    text-align: center;
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }

                   
                        background: url("@images/indicate/text-bg.png") center / 100% 100% no-repeat;

                    p {
                        font-size: 40px;
                        font-weight: normal;
                        line-height: 48px;
                        text-align: center;
                        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                    }
                }

                .symbol {
                    width: 20px;
                    display: flex;
                    align-items: flex-end;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }
            }

            h2 {
                text-align: center;
                padding-top: 30px;
                font-size: 32px;
                font-weight: normal;
                line-height: 32px;
                letter-spacing: 0.2em;
                background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%, #90D1FF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }



            .text {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 2;

                .item {
                    display: flex;
                    margin-bottom: 130px;
                    width: 40px;
                    height: 48px;
                    font-size: 40px;
                    font-weight: normal;
                    line-height: 48px;
                    letter-spacing: 0.2em;
                    text-align: center;
                    background: linear-gradient(180deg,
                            #ffffff 0%,
                            #ffffff 52%,
                            #90d1ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 3.98px 9.96px rgba(166, 178, 255, 0.91);

                    .p {
                        margin-right: 20px;
                        background: url("@images/indicate/text-bg.png") center / 100% 100% no-repeat;
                        box-sizing: border-box;
                        padding-left: 7px;
                    }

                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }
                }

                .symbol {
                    width: 20px;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }
            }

            .img {
                width: 598px;
                height: 180px;
                position: absolute;
                left: 117px;
                top: -30px;
                overflow: hidden;
                z-index: 1;

                div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                .bg-1 {
                    background: url("@images/indicate/bg-1.png") -20px 60px / 200% 100% no-repeat;
                    animation: toRight 12s linear infinite alternate;
                }

                .bg-2 {
                    background: url("@images/indicate/bg-2.png") -20px 60px / 200% 100% no-repeat;
                    animation: toRight1 10s linear infinite alternate;
                }

                .bg-3 {
                    background: url("@images/indicate/bg-3.png") -20px 60px / 200% 100% no-repeat;
                    animation: toRight2 8s linear infinite alternate;
                }

                .bg-4 {
                    background: url("@images/indicate/bg-4.png") -20px 60px / 200% 100% no-repeat;
                    animation: toRight3 6s linear infinite alternate;
                }
            }
        }
    }

    @keyframes toRight {
        0% {
            background-position: 10% 80px;
        }

        100% {
            background-position: 90% 80px;
        }
    }

    @keyframes toRight1 {
        0% {
            background-position: 10% 80px;
        }

        100% {
            background-position: 90% 80px;
        }
    }

    @keyframes toRight2 {
        0% {
            background-position: 10% 80px;
        }

        100% {
            background-position: 90% 80px;
        }
    }

    @keyframes toRight3 {
        0% {
            background-position: 20% 120px;
        }

        100% {
            background-position: 90% 120px;
        }
    }

    .bottom_list {
        margin-top: 18px;
        background: url("@images/comprehensiveAnalysis/框.png");
        background-size: 100% 100%;
        width: 768px;
        height: 104px;
        display: flex;
        justify-content: space-between;
        padding: 20px 80px;
        box-sizing: border-box;

        div {
            display: flex;

            img {
                width: 72px;
                height: 72px;
                margin-right: 8px;
            }

            .con {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                >span {
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }

                p {
                    font-size: 28px;
                    font-weight: 500;
                    line-height: 28px;
                    letter-spacing: 0px;
                    color: #00CCFF;

                    i {
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 20px;
                        text-align: right;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                        padding-left: 4px;

                    }
                }
            }
        }
    }
}
</style>