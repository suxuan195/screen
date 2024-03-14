<template>
    <div class="treatingDifficulty">
        <ul class="top">
            <template v-for="(item, index) in state.cardList" :key="index + '11'">
                <li v-if="index < 3">
                    <div :class="'icon' + (index + 1)"></div>
                    <h2>{{ item.title }}</h2>
                    <div class="num" style="margin-top: 8px;" v-for="(it, itIndex) in  item.houseHoldList"
                        :key="itIndex + '22'">
                        <p><span>√</span><i>{{ it.num }}</i></p>
                        <div class="text">{{ it.desc }}</div>
                    </div>
                </li>
            </template>
        </ul>
        <ul class="bottom">
            <template v-for="(item, index) in state.cardList" :key="index + '11'">
                <li v-if="index > 2" :style="{ 'padding': index === 6 ? ' 0 8px' : '' }">
                    <h2>{{ item.title }}</h2>
                    <div class="households" v-for="(it, itIndex) in item.houseHoldList" :key="itIndex + '22'">
                        <span>√</span><i>{{ it.num }}</i>
                    </div>
                    <div :class="index === 6 ? 'fourBox' : ''">
                        <p v-for="(itP, itPIndex) in item.descList" :key="itPIndex + '33'">
                            {{ itP }}</p>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
const state = reactive({
    cardList: [
        {
            title: '清退处理一批',
            houseHoldList: [
                {
                    num: '504户',
                    desc: '完成市场出清'
                }
            ]
        },
        {
            title: '兼并重组一批'
        },
        {
            title: '管理提升一批',
            houseHoldList: [
                {
                    num: '695户',
                    desc: '实现扭亏为盈'
                },
                {
                    num: '800户',
                    desc: '实现大幅减亏'
                }
            ]
        },
        {
            title: '2016',
            houseHoldList: [
                {
                    num: '504户'
                }
            ],
            descList: ['“僵尸企业”处置和特困企业治理主体工作任务']
        },
        {
            title: '2017',
            houseHoldList: [
                {
                    num: '504户'
                }
            ],
            descList: ['“僵尸企业”处置和特困企业治理主体工作任务']

        },
        {
            title: '2018',
            houseHoldList: [
                {
                    num: '504户'
                }
            ],
            descList: ['“僵尸企业”处置和特困企业治理主体工作任务']

        },
        {
            title: '2019',
            descList: ['做好收尾工作', '巩固工作成果', '建立长效机制']
        }
    ]
})
</script>
    
<style lang="scss" scoped>
.treatingDifficulty {
    padding: 16px;
    box-sizing: border-box;
    width: 888px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
    padding: 16px;

    .top {
        display: flex;
        justify-content: space-around;

        li {
            width: 240px;
            height: 86.48px;
            background: url('@images/supplySideReformManagment/处僵治困背景框.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            position: relative;
            padding-left: 10px;

            .icon1 {
                z-index: 100;
                left: -15px;
                position: absolute;
                width: 36px;
                height: 36px;
                background: url('@images/supplySideReformManagment/top-bg.png');
                background-size: 100% 100%;
            }

            .icon2 {
                z-index: 100;
                left: -15px;
                position: absolute;
                width: 36px;
                height: 36px;
                background: url('@images/supplySideReformManagment/兼并重组一批图标.png');
                background-size: 100% 100%;
            }

            .icon3 {
                z-index: 100;
                left: -15px;
                position: absolute;
                width: 36px;
                height: 36px;
                background: url('@images/supplySideReformManagment/管理提升一批图标.png');
                background-size: 100% 100%;
            }

            h2 {
                width: 200px;
                height: 22px;
                opacity: 1;
                background: linear-gradient(90deg, rgba(0, 221, 255, 0.50) 4%, rgba(0, 221, 255, 0.00) 100%);
                font-size: 14px;
                font-weight: normal;
                line-height: 22px;
                text-align: center;
                letter-spacing: 0px;
                color: #FFFFFF;
            }

            .num {
                display: flex;

                p {
                    width: 82px;
                    height: 22px;
                    opacity: 1;
                    background: url('@images/supplySideReformManagment/户数背景框.png');
                    background-size: 100% 100%;
                    text-align: center;

                    span {
                        color: #3EFFE5;
                    }

                    i {
                        padding-left: 8px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        text-align: center;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                    }
                }

                .text {
                    width: 118px;
                    height: 22px;
                    opacity: 1;
                    box-sizing: border-box;
                    border: 0.5px solid;
                    border-image: linear-gradient(90deg, rgba(0, 221, 255, 0.00) 0%, rgba(0, 221, 255, 0.40) 99%) 0.5;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 22px;
                    text-align: center;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 38px;
        position: relative;
        height: 80px;

        &::before {
            width: 100%;
            height: 80px;
            position: absolute;
            top: -13px;
            content: '';
            background: url('@images/supplySideReformManagment/年流程.png');
            background-size: 100% 100%;
            background-position: 50% 50%;
        }

        li {
            width: 213px;
            text-align: center;
            padding: 0 36px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: relative;

            h2 {
                position: absolute;
                left: 0;
                top: -13px;
                font-size: 14px;
                font-weight: normal;
                line-height: 14px;
                text-align: center;
                letter-spacing: 0px;
                color: #00DDFF;
            }

            .households {
                width: 82px;
                height: 22px;
                opacity: 1;
                text-align: center;
                background: url('@images/supplySideReformManagment/户数背景框.png');
                background-size: 100% 100%;

                span {
                    color: #3EFFE5;
                }

                i {
                    padding-left: 8px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    text-align: center;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }

            }

            p {
                margin-top: 11px;
                font-size: 12px;
                font-weight: normal;
                line-height: 14px;
                text-align: center;
                letter-spacing: 0px;
                color: #FFFFFF;
            }

            .fourBox {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;

                p {
                    width: 92px;
                    height: 22px;
                    line-height: 22px;
                    opacity: 1;
                    background: linear-gradient(90deg, rgba(0, 221, 255, 0.00) 0%, rgba(0, 221, 255, 0.40) 48%, rgba(0, 221, 255, 0.00) 100%);
                    position: relative;

                    &::before {
                        content: '';
                        width: 6px;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        height: 6px;
                        opacity: 1;
                        border-radius: 50%;
                        position: absolute;
                        background: #00DDFF;
                    }
                }
            }
        }
    }
}
</style>