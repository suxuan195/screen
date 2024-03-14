<template>
    <div class="rightBox">
        <ul class="top">
            <li>
                <img src="@images/performanceObjectives/利润指标.png" alt="">
                <div>
                    <h2>考核利润指标</h2>
                    <p>
                        <span>6548321.56</span>
                        <i>亿元</i>
                    </p>
                </div>
            </li>
            <li> <img src="@images/performanceObjectives/总体完成.png" alt="">
                <div>
                    <h2>总体完成</h2>
                    <p>
                        <span>6548321.56</span>
                        <i>万元</i>
                    </p>
                </div>
            </li>
        </ul>
        <div class="monthChart" style="margin-top: 43px;">
            <ul>
                <li v-for="(item, index) in  13" :key="index" class="line" :style="{ 'left': `${index * 62 + 'px'}` }">
                </li>
                <li v-for="(item, index) in  state.month" :key="index + '22'" :style="{ 'left': `${index * 62 + 'px'}` }"
                    class="month">
                    {{ item }}
                </li>
            </ul>
            <span class="progressValue">85%</span>
        </div>
        <ul class="progress">
            <li v-for="(item, index) in state.list" :key="index + '111'"
                :class="state.currentIndex == index ? 'active' : ''" @click="tabClick(index)">
                <span>
                    {{ item }}
                </span>
            </li>
        </ul>
        <el-scrollbar max-height="550px" class="list">
            <div class="box" style="margin-top: 30px;" v-for="(item, index) in  state.enterpriseList" :key="index + '11'">
                <div class="title">
                    <h2>{{ item }}</h2>
                </div>
                <div class="monthChart" style="margin-left:50px ;">
                    <div :class="[index <= 2 ? `number${index + 1}` : 'number4']">{{ index + 1 }}
                    </div>
                    <ul :class="[index % 6 < 3 ? '' : 'odd']" :style="{ 'width': 740 / (index + 1) + 'px' }">
                        <li v-for="(item, index) in  13" :key="index" class="line"
                            :style="{ 'left': `${index * 62 + 'px'}` }">
                        </li>
                        <li v-for="(item, index) in  state.month" :key="index + '22'"
                            :style="{ 'left': `${index * 62 + 'px'}` }" class="month">
                            {{ item }}
                        </li>
                    </ul>
                    <span class="progressValue" :class="index % 6 < 3 ? '' : 'red'">85%</span>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive } from 'vue';
const state = reactive({
    list: ['按进度正序排列', '按进度倒序排列', '完成考核目标的企业', '进度提前的企业', '进度落后的企业'],
    currentIndex: 0,
    month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    enterpriseList: ['金川集团股份有限公司', '金川集团股份有限公司',
        '金川集团股份有限公司', '金川集团股份有限公司', '金川集团股份有限公司', '金川集团股份有限公司', '金川集团股份有限公司'],
})
const tabClick = (index) => {
    state.currentIndex = index
}
</script>
    
<style lang="scss" scoped>
.rightBox {
    width: 888px;
    height: 856px;
    padding: 40px 36px;
    box-sizing: border-box;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;

    .top {
        display: flex;
        justify-content: space-between;
        padding: 0 100px;
        box-sizing: border-box;

        li {
            display: flex;

            img {
                width: 80px;
                height: 64px;
            }

            div {
                margin-left: 4px;

                h2 {
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }

                p {
                    margin-top: 8px;

                    span {
                        font-size: 28px;
                        font-weight: 500;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #00CCFF;
                    }

                    i {
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 20px;
                        text-align: right;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }

    .box {
        margin-bottom: 57px;

        .title {
            margin-left: 50px;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 12px #5CB2C7;
        }

        .monthChart {
            margin-top: 10px;
            width: 750px;
            height: 14px;
            background: rgba(255, 255, 255, 0.08);
            position: relative;

            .number1 {
                position: absolute;
                left: -50px;
                top: -10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 50%;
                opacity: 1;
                background: linear-gradient(180deg, #FFEDA8 0%, #FED035 56%, #FFCD2C 100%);
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                color: #E47200;
            }

            .number2 {
                position: absolute;
                left: -50px;
                top: -10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 50%;
                opacity: 1;
                background: linear-gradient(180deg, #E2EEFA 0%, #ADC7E8 56%, #95AFCA 100%);
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                color: #4A74B0;
            }

            .number3 {
                position: absolute;
                left: -50px;
                top: -10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 50%;
                opacity: 1;
                background: linear-gradient(180deg, #FBEDE4 0%, #D8BBAB 56%, #AF7B65 100%);
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                color: #924C06;
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                color: #E47200;
            }

            .number4 {
                position: absolute;
                left: -40px;
                top: -10px;
                font-size: 16px;
                font-weight: 600;
                line-height: 20px;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
            }

            .progressValue {
                right: 3px;
                top: -20px;
                position: absolute;
                font-size: 20px;
                font-weight: 500;
                line-height: 16px;
                letter-spacing: 0em;
                color: #AAFDFD;
            }

            .odd {
                background: linear-gradient(90deg, rgba(241, 96, 108, 0) 0%, #F1606C 76%, #F67F89 100%);
            }

            .red {
                color: #F1606C;
            }

            ul {
                width: 618px;
                height: 10px;
                border-radius: 0px 2px 2px 0px;
                opacity: 1;
                background: linear-gradient(270deg, #AAFDFD 0%, rgba(11, 230, 230, 0) 100%);
                position: relative;
                display: flex;

                .line {
                    top: 0;
                    position: absolute;
                    width: 2px;
                    height: 14px;
                    background: #fff;
                }

                &::before {
                    position: absolute;
                    content: '';
                    right: -10px;
                    top: -4px;
                    width: 20px;
                    height: 20px;
                    opacity: 1;
                    box-sizing: border-box;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0px 0px 4px 0px #00D5FF;
                    border-radius: 50%;
                }

                &::after {
                    top: 0;
                    right: -6px;
                    border-radius: 50%;
                    position: absolute;
                    content: '';
                    width: 12px;
                    height: 12px;
                    opacity: 1;

                    background: #FFFFFF;

                    box-shadow: 0px 0px 8px 0px #C0F4FF;
                }


            }

            .month {
                top: 30px;
                position: absolute;
                width: 62px;
                height: 100%;
                font-size: 14px;
                font-weight: 500;
                line-height: 16px;
                text-align: center;
                letter-spacing: 0em;
                color: #FFFFFF;
            }

            .title {
                font-size: 16px;
                font-weight: 600;
                line-height: 24px;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
            }
        }
    }

    .monthChart {
        margin-top: 10px;
        width: 750px;
        height: 14px;
        background: rgba(255, 255, 255, 0.08);
        position: relative;

        .number1 {
            position: absolute;
            left: -50px;
            top: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            opacity: 1;
            background: linear-gradient(180deg, #FFEDA8 0%, #FED035 56%, #FFCD2C 100%);
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
            letter-spacing: 0em;
            color: #E47200;
        }

        .number2 {
            position: absolute;
            left: -50px;
            top: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            opacity: 1;
            background: linear-gradient(180deg, #E2EEFA 0%, #ADC7E8 56%, #95AFCA 100%);
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
            letter-spacing: 0em;
            color: #4A74B0;
        }

        .number3 {
            position: absolute;
            left: -50px;
            top: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            opacity: 1;
            background: linear-gradient(180deg, #FBEDE4 0%, #D8BBAB 56%, #AF7B65 100%);
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
            letter-spacing: 0em;
            color: #924C06;
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
            letter-spacing: 0em;
            color: #E47200;
        }

        .number4 {
            position: absolute;
            left: -40px;
            top: -10px;
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: 0em;
            background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 12px #5CB2C7;
        }

        .progressValue {
            right: -50px;
            top: 0;
            position: absolute;
            font-size: 20px;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: 0em;
            color: #AAFDFD;
        }

        .odd {
            background: linear-gradient(90deg, rgba(241, 96, 108, 0) 0%, #F1606C 76%, #F67F89 100%);
        }

        .red {
            color: #F1606C;
        }

        ul {
            width: 618px;
            height: 10px;
            border-radius: 0px 2px 2px 0px;
            opacity: 1;
            background: linear-gradient(270deg, #AAFDFD 0%, rgba(11, 230, 230, 0) 100%);
            position: relative;
            display: flex;

            .line {
                top: 0;
                position: absolute;
                width: 2px;
                height: 14px;
                background: #fff;
            }

            &::before {
                position: absolute;
                content: '';
                right: -10px;
                top: -4px;
                width: 20px;
                height: 20px;
                opacity: 1;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0px 0px 4px 0px #00D5FF;
                border-radius: 50%;
            }

            &::after {
                top: 0;
                right: -6px;
                border-radius: 50%;
                position: absolute;
                content: '';
                width: 12px;
                height: 12px;
                opacity: 1;

                background: #FFFFFF;

                box-shadow: 0px 0px 8px 0px #C0F4FF;
            }


        }

        .month {
            top: 30px;
            position: absolute;
            width: 62px;
            height: 100%;
            font-size: 14px;
            font-weight: 500;
            line-height: 16px;
            text-align: center;
            letter-spacing: 0em;
            color: #FFFFFF;
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 12px #5CB2C7;
        }
    }

    .progress {
        display: flex;
        margin-left: 50px;
        margin-top: 66px;

        li {
            cursor: pointer;
            padding: 0 13px;
            margin-right: 20px;
            height: 38px;
            background: url('@images/performanceObjectives/非选中tab.png');
            background-size: 100% 100%;
            line-height: 38px;
            text-align: center;

            span {
                font-size: 14px;
                font-weight: 500;
                line-height: 18px;
                text-align: center;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 3.6px 10.8px #5CB2C7;
            }
        }

        .active {
            background: url('@images/performanceObjectives/选中tab.png');
            background-size: 100% 100%;
            height: 38px;
            line-height: 38px;

            span {
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                text-align: center;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #F4E5C6 69%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #C79C5C;
            }
        }
    }
}
</style>