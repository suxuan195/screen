<template>
    <div class="meetingTopicsList">
        <div class="title_info">
            <h2>会议议题</h2>
            <p>本次会议共审计<i>6</i>个议题</p>
        </div>
        <ul class="meetingTopicBox">
            <li v-for="(item, index) in  state.mettingTopicList" :key="index + 'row'">
                <img src="@images/tripleAndLarge/事项总数.png" alt="" srcset="">
                <span class="title">{{ item.name }}</span>
                <span class="detail">详情</span>
                <div :class="item.isGO ? 'circleG' : 'circleR'">
                </div>
                <div class="rightFixed" :class="item.isGO ? 'throughBox' : 'nothroughBox'">
                    <span :style="{ color: item.isGO ? 'green' : 'red' }">{{ item.isGO ? '通过' : '不通过' }}</span>
                    <img :src="item.isGO ? passThrough : nopassThrough" alt="" srcset="">
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import passThrough from '@images/overview/通过勾.png'
import nopassThrough from '@images/overview/不通过叉.png'
const state = reactive({
    mettingTopicList: [
        {
            name: '《关于向甘肃长城兴陇丝路金金管理有限公司推荐董事及高管人选的议题》',
            isGO: true
        },
        {
            name: '《关于新业大厦集中供热社会化服务费用的议题》',
            isGO: false
        },
        {
            name: '《关于向甘肃长城兴陇丝路金金管理有限公司推荐董事及高管人选的议题》',
            isGO: true
        },
        {
            name: '《关于新业大厦集中供热社会化服务费用的议题》',
            isGO: true
        }, {
            name: '《关于向甘肃长城兴陇丝路金金管理有限公司推荐董事及高管人选的议题》',
            isGO: true
        },
        {
            name: '《关于新业大厦集中供热社会化服务费用的议题》',
            isGO: true
        }
    ]
})
</script>
    
<style lang="scss" scoped>
.meetingTopicsList {
    .title_info {
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        h2 {
            font-size: 18px;
            font-weight: normal;
            line-height: 18px;
            letter-spacing: 0em;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            margin-bottom: 8px;
        }

        p {
            font-size: 14px;
            font-weight: normal;
            line-height: normal;
            text-align: center;
            letter-spacing: 0em;
            color: #FFFFFF;

            i {
                font-size: 24px;
                font-weight: normal;
                line-height: 24px;
                text-align: right;
                letter-spacing: 0em;
                color: #71D2FF;
            }

        }
    }

    .meetingTopicBox {
        li {
            display: flex;
            align-items: center;
            width: 1460px;
            height: 40px;
            line-height: 40px;
            background: rgba(32, 153, 245, 0.12);
            padding-left: 18px;
            position: relative;
            margin-bottom: 8px;

            img {
                width: 20px;
                height: 20px;
            }

            .title {
                font-size: 14px;
                font-weight: normal;
                line-height: 14px;
                display: flex;
                align-items: center;
                letter-spacing: 0px;
                color: #FFFFFF;
            }

            .detail {
                cursor: pointer;
                font-size: 14px;
                font-weight: normal;
                line-height: normal;
                letter-spacing: 0em;
                color: #71D2FF;
            }

            .circleG {
                margin-left: 8px;
                width: 20px;
                height: 20px;
                opacity: 1;
                background: rgba(35, 124, 3, 0.1);
                border-radius: 50%;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    width: 11.7px;
                    height: 11.7px;
                    border: 4px solid #54DA25;
                    box-shadow: 0px 4px 10px 0px rgba(161, 255, 128, 0.48);

                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    width: 3.4px;
                    height: 3.4px;
                    opacity: 1;
                    background: #237C03;
                }
            }

            .throughBox {
                background: url('@images/overview/通过框.png');
            }

            .nothroughBox {
                background: url('@images/overview/不通过框.png');
            }

            .circleR {
                margin-left: 8px;
                width: 20px;
                height: 20px;
                opacity: 1;
                background: rgba(255, 51, 51, 0.1);
                border-radius: 50%;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    width: 11.7px;
                    height: 11.7px;
                    border: 4px solid #FF3333;
                    box-shadow: 0px 4px 10px 0px rgba(255, 51, 51, 0.48);
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    width: 3.4px;
                    height: 3.4px;
                    opacity: 1;
                    background: #780000;
                }
            }

            .rightFixed {
                position: absolute;
                width: 60px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                background-size: 100% 100%;
                right: 24px;

                span {
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 16px;
                    letter-spacing: 0em;
                    color: #54DA25;
                }

                img {
                    width: 18px;
                    height: 16px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }

        }
    }
}
</style>