<template>
    <div class="centerBottom">
        <div class="title_box" @click="state.showModel3 = true">
            <h3>十九大以来累计决策议题</h3>
            <p>29,174<i>个</i></p>
        </div>
        <div class="center_box">
            <img src="@/images/tripleAndLarge/主视觉-圆形.png" alt="" srcset="" class="center_bg">
            <ul>
                <li v-for="(item, index) in state.centerDataList" :key="index"
                    :style="{ 'position': 'absolute', 'left': item.left, 'top': item.top, 'right': item.right }">
                    <div class="img_box">
                        <img :src="item.title_bg" alt="" srcset="" v-if="index < 3">
                        <h2>{{ item.h2Title }}</h2>
                        <img :src="item.title_bg" alt="" srcset="" v-if="index > 2">
                    </div>
                    <div class="convenningMetting" @click="itemClick('h3Title1')">
                        <h3>{{ item.h3Title1 }}</h3>
                        <div class="content"><span>{{ item.h3Title1Num }}</span><i>次</i></div>
                    </div>
                    <div class="reviewConference" @click="itemClick('h3Title2')">
                        <h3>{{ item.h3Title2 }}</h3>
                        <div class="content"><span class="num">{{ item.h3Title2Num }}</span><i>次</i></div>
                    </div>
                </li>
            </ul>
        </div>
        <meetingDialog :showModel="state.showModel1" />
        <topicsDialog :showModel="state.showModel" />
        <meetingListDialog :show-model="state.showModel3" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import emitBus from "@utils/bus";
import topicsDialog from '../popup/topicsDialog.vue'
import meetingDialog from "../popup/meetingDialog.vue";
import meetingListDialog from "../popup/meetingListDialog.vue";
import title_bg1 from '@/images/tripleAndLarge/股东会.png'
import title_bg2 from '@/images/tripleAndLarge/党委会.png'
import title_bg3 from '@/images/tripleAndLarge/董事会.png'
import title_bg4 from '@/images/tripleAndLarge/经理层办公会.png'
import title_bg5 from '@/images/tripleAndLarge/职代会.png'
import title_bg6 from '@/images/tripleAndLarge/其他.png'

const state = reactive({
    centerDataList: [
        {
            title_bg: title_bg1,
            h2Title: '股东会',
            h3Title1: '召开会议',
            h3Title1Num: 48,
            h3Title2: '审议会议',
            h3Title2Num: 186,
            top: ' 5px',
            left: '124px'
        },
        {
            title_bg: title_bg2,
            h2Title: '党委会',
            h3Title1: '召开会议',
            h3Title1Num: '3,340',
            h3Title2: '审议会议',
            h3Title2Num: '17,008',
            top: '156px',
            left: '29px'
        },
        {
            title_bg: title_bg3,
            h2Title: '董事会',
            h3Title1: '召开会议',
            h3Title1Num: '1,344',
            h3Title2: '审议会议',
            h3Title2Num: '5,791',
            top: '303px',
            left: '124px'
        },
        {
            title_bg: title_bg4,
            h2Title: '经理层办公会',
            h3Title1: '召开会议',
            h3Title1Num: '1,530',
            h3Title2: '审议会议',
            h3Title2Num: '5,850',
            top: '5px',
            right: '129px'
        },
        {
            title_bg: title_bg5,
            h2Title: '职代会',
            h3Title1: '召开会议',
            h3Title1Num: '9',
            h3Title2: '审议会议',
            h3Title2Num: '50',
            top: '154px',
            right: '38px'
        },
        {
            title_bg: title_bg6,
            h2Title: '其他',
            h3Title1: '召开会议',
            h3Title1Num: '119',
            h3Title2: '审议会议',
            h3Title2Num: '284',
            top: '303px',
            right: '129px'
        }
    ],
    showModel: false,
    showModel1: false,
    showModel3: false
})
const itemClick = (val) => {
    if (val === 'h3Title1') {
        state.showModel = true
    } else {
        state.showModel1 = true
    }
}
onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
        state.showModel1 = false
        state.showModel3 = false
    });
})
</script>
    
<style lang="scss" scoped>
.centerBottom {
    width: 960px;

    .title_box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;

        &::before {
            width: 15px;
            height: 35px;
            background-image: url('@images/stateEnterpriseReform/引进icon左.png');
            background-size: 100% 100%;
            content: '';
            position: absolute;
            left: 210px;
        }

        &::after {
            width: 15px;
            height: 35px;
            background-image: url('@images/stateEnterpriseReform/引进icon右.png');
            background-size: 100% 100%;
            content: '';
            position: absolute;
            right: 210px;
        }

        h3 {
            font-size: 24px;
            font-weight: normal;
            line-height: 28px;
            text-align: center;
            letter-spacing: 0.1em;
            color: #FFFFFF;
            z-index: 0;
        }

        p {
            margin-left: 24px;
            font-size: 40px;
            font-weight: bold;
            line-height: 44px;
            text-align: center;
            letter-spacing: 0em;
            font-feature-settings: "kern" on;
            color: #FFFFFF;
            z-index: 0;

            i {
                font-size: 16px;
                font-weight: normal;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                color: #FFFFFF;
                z-index: 1;
            }
        }
    }

    .center_box {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 200px;
            width: 200px;
            height: 200px;
            margin: -75px -105px;
            background: linear-gradient(180deg, rgba(25, 144, 255, 0.14) 0%, rgba(25, 144, 255, 0.084) 100%);
            border-radius: 61% 39% 57% 43% / 46% 67% 33% 54%;
            box-shadow: inset 10px 20px 30px rgba(25, 144, 255, 0.24),
                inset 0px 0px 2px rgba(68, 120, 244, 1),
                inset -10px -20px 30px rgba(25, 144, 255, 0.4);
            animation: water-a 6s linear infinite alternate;
        }

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 200px;
            width: 140px;
            height: 140px;
            margin: -45px -75px;
            background: linear-gradient(180deg, rgba(25, 144, 255, 0.14) 0%, rgba(25, 144, 255, 0.084) 100%);
            border-radius: 61% 39% 57% 43% / 46% 67% 33% 54%;
            box-shadow: inset 10px 20px 30px rgba(25, 144, 255, 0.24),
                inset 0px 0px 2px rgba(68, 120, 244, 1),
                inset -10px -20px 30px rgba(25, 144, 255, 0.2);
            animation: water-b 6s linear infinite alternate;
        }

        .center_bg {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 450px;
            height: 450px;
        }

        ul {
            li {
                .img_box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 186px;
                    height: 52px;
                    background: url('@images/tripleAndLarge/主视觉-文字边框.png');
                    background-size: 100% 100%;

                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 8px;
                    }

                    h2 {
                        font-size: 20px;
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
                        z-index: 1;
                    }
                }

                .convenningMetting,
                .reviewConference {
                    margin-top: 8px;
                    padding-left: 15px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;



                    h3 {
                        font-size: 16px;
                        font-weight: normal;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                        z-index: 1;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            left: -15px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 3px;
                            height: 8px;
                            border-radius: 2px;
                            opacity: 1;
                            background: #00CCFF;
                        }
                    }

                    .content {
                        margin-left: 16px;

                        span {
                            font-size: 28px;
                            font-weight: bold;
                            line-height: 32px;
                            letter-spacing: 0px;
                            font-feature-settings: "kern" on;
                            color: #FFFFFF;
                            z-index: 0;
                        }

                        i {
                            font-size: 16px;
                            font-weight: normal;
                            line-height: 20px;
                            letter-spacing: 0px;
                            color: #FFFFFF;
                            z-index: 1;
                        }

                        .num {
                            font-size: 28px;
                            font-weight: bold;
                            line-height: 32px;
                            letter-spacing: 0px;
                            font-feature-settings: "kern" on;
                            color: #00CCFF;
                            z-index: 0;
                        }
                    }
                }
            }

            li:nth-child(1) {
                position: absolute;
                top: 5px;
                left: 124px;
            }
        }
    }
}

@keyframes water-a {
    25% {
        border-radius: 36% 64% 29% 71% / 65% 27% 73% 35%;
    }

    50% {
        border-radius: 52% 48% 61% 39% / 33% 33% 67% 67%;
    }

    75% {
        border-radius: 46% 54% 65% 35% / 50% 54% 46% 50%;
    }

    100% {
        border-radius: 65% 35% 64% 36% / 40% 62% 38% 60%;
    }
}

@keyframes water-b {
    25% {
        border-radius: 33% 67% 46% 54% / 55% 40% 60% 45% ;
    }

    50% {
        border-radius: 66% 34% 32% 68% / 64% 52% 48% 36% ;
    }

    75% {
        border-radius: 31% 69% 58% 42% / 43% 36% 64% 57% ;
    }

    100% {
        border-radius: 45% 55% 42% 58% / 66% 30% 70% 34%;
    }
}
</style>