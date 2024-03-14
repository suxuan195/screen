<template>
    <div class="centerTopChart">
        <div class="ellipse">
            <ul class="imgList">
                <li>
                    <img src="@images/industrialEconomyRun/工业总产值.png" alt="" srcset="">
                </li>
                <li> <img src="@images/industrialEconomyRun/上月产值.png" alt="" srcset=""></li>
                <li> <img src="@images/industrialEconomyRun/超产值.png" alt="" srcset=""></li>
                <li> <img src="@images/industrialEconomyRun/年度产值进度.png" alt="" srcset=""></li>
            </ul>
            <div class="allList">
                <div style="  transform: scaleY(0.375);">
                    <div class="line1"></div>
                </div>
                <div style="  transform: scaleY(0.375);">
                    <div class="line2"></div>
                </div>
                <div style="  transform: scaleY(0.3);">
                    <div class="line3"></div>
                </div>
                <div style="  transform: scaleY(0.3);">
                    <div class="line5"></div>
                </div>
                <div style="  transform: scaleY(0.375);">
                    <div class="line7"></div>
                </div>
                <div style="  transform: scaleY(0.375);">
                    <div class="line8"></div>
                </div>
                <div style="  transform: scaleY(0.3);">
                    <div class="line11"></div>
                </div>
                <div style="  transform: scaleY(0.3);">
                    <div class="line12"></div>
                </div>
            </div>
        </div>
        <ul class="topList">
            <li @click="showModel">
                <h2>本年累计工业总产值</h2>
                <p class="price"><span>2965.11</span><i>亿元</i></p>
                <p class="triangle" style="margin-top: 8px;"><i class="chao chaoTop">同比</i><i class="red">12.08%</i></p>
            </li>
            <li @click="showModel">
                <h2>上月产值</h2>
                <p class="price"><span>362.97</span><i>亿元</i></p>
                <p class="triangle" style="margin-top: 8px;"><i class="chao chaoTop">同比</i><i class="red">17.50%</i></p>
                <p class="triangle"><i class="chao chaoBottom">环比</i><i class="green">1%</i></p>
            </li>
            <li @click="showModel">
                <h2>本年度超（欠）产值</h2>
                <p class="price"><i class="chao">欠</i><span>-1445.25</span><i>亿元</i></p>
            </li>
            <li @click="showModel">
                <h2>年度产值完成进度</h2>
                <p class="price"><span>67.23</span><i>%</i></p>
                <h3 class="chao" style="margin-top: 8px;">计划产值</h3>
                <p><span class="yuan">4410.36</span><i class="unit">亿元</i></p>
            </li>
        </ul>
    </div>
    <centerTopPopUp :show-model="state.showModel" />
</template>
    
<script setup>
import { onMounted, reactive } from 'vue'
import emitBus from "@utils/bus";
import centerTopPopUp from '../popup/centerTopPopUp.vue'
const state = reactive({
    showModel: false
})
const showModel = () => {
    state.showModel = true
}
onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
})
</script>
    
<style lang="scss" scoped>
.centerTopChart {
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 973px;
    height: 600px;

    /* 创建一个容器，并设置宽高和背景颜色 */

    .topList {
        position: relative;

        li {
            width: 162px;
            height: 120px;
            padding: 22px 10px;
            box-sizing: border-box;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            background: url("@images/industrialEconomyRun/item-bg.png");
            background-size: 100% 100%;
            cursor: pointer;

            h2 {
                font-size: 14px;
                font-weight: normal;
                line-height: 18px;
                letter-spacing: 0px;
                color: #FFFFFF;
            }

            .price {
                margin-top: 5px;
                white-space: nowrap;

                >span {
                    font-size: 16px;
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

                    z-index: 0;
                }

                i {
                    line-height: 14px;
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

            .marginTop12 {
                margin-top: 12px;
            }

            .red {
                font-size: 14px;
                font-weight: normal;
                line-height: 18px;
                letter-spacing: 0px;
                color: #FA483E;
                margin-left: 8px;
            }

            .unit {
                font-size: 12px;
                font-weight: normal;
                line-height: 16px;
                letter-spacing: 0px;
                color: #FFFFFF;
                margin-left: 4px;
            }

            .yuan {
                font-size: 16px;
                font-weight: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #37D3DB;
            }

            .green {
                font-size: 14px;
                font-weight: normal;
                line-height: 18px;
                text-align: right;
                letter-spacing: 0px;
                color: #07EB71;
                margin-left: 8px;
            }

            .chaoTop,
            .chaoBottom {
                position: relative;
            }

            .chaoTop::after {
                content: '';
                position: absolute;
                top: 5px;
                left: 100px;
                border-width: 0 8px 8px 8px;
                border-style: solid;
                border-color: transparent transparent #FA483E transparent;
            }

            .chaoBottom::after {
                content: '';
                position: absolute;
                top: 5px;
                left: 100px;
                border-width: 8px 8px 0 8px;
                border-style: solid;
                border-color: #07EB71 transparent transparent transparent;
            }

            .chao {
                font-size: 14px;
                font-weight: normal;
                line-height: 18px;
                letter-spacing: 0px;
                color: #FFFFFF;
            }
        }

        li:nth-child(1) {
            position: absolute;
            left: 124px;

        }

        li:nth-child(2) {
            position: absolute;
            left: 298px;
            top: 97px;

        }

        li:nth-child(3) {
            position: absolute;
            left: 525px;
            top: 97px;
        }

        li:nth-child(4) {
            position: absolute;
            right: 114px;
        }
    }

    .ellipse {
        width: 900px;
        height: 500px;
        background-image: url('@images/industrialEconomyRun/主视图形状.png');
        background-size: 100% 100%;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);

        .imgList {
            display: flex;
            position: relative;

            li {
                width: 145px;
                height: 100px;
                background-image: url('@images/industrialEconomyRun/主视觉icon底座.png');
                background-size: 100% 100%;
                position: relative;

                img {
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 64px;
                    height: 67px;
                }
            }

            li:nth-child(1) {
                position: absolute;
                left: 90px;
                top: 60px;
            }

            li:nth-child(2) {
                position: absolute;
                left: 265px;
                top: 180px;
            }

            li:nth-child(3) {
                position: absolute;
                left: 500px;
                top: 180px;
            }

            li:nth-child(4) {
                position: absolute;
                right: 100px;
                top: 80px;
            }
        }

        .allList {
            // transform: scaleY(0.375);

            .line1 {

                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条1.png');
                background-size: 100% 100%;
                position: absolute;
                top: 550px;
                left: 100px;
                animation: spin 2s linear infinite;
            }

            .line2 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/高光线条5.png');
                background-size: 100% 100%;
                position: absolute;
                top: 520px;
                left: 100px;
                animation: spin-r 2s linear infinite;
            }

            .line3 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/高光线条1.png');

                background-size: 100% 100%;
                position: absolute;
                top: 490px;
                left: 100px;
                animation: spin 2s linear infinite;

            }

            .line4 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条4.png');
                background-size: 100% 100%;
                position: absolute;
                top: 460px;
                left: 100px;
                animation: spin 2s linear infinite;
            }

            .line5 {

                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/高光线条2.png');

                background-size: 100% 100%;
                position: absolute;
                top: 430px;
                left: 100px;
                animation: spin-r 2s linear infinite;
            }

            .line6 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条6.png');
                background-size: 100% 100%;
                position: absolute;
                top: 400px;
                left: 100px;
                animation: spin-r 2s linear infinite;
            }

            .line7 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条7.png');
                background-size: 100% 100%;
                position: absolute;
                top: 370px;
                left: 100px;
                animation: spin 2s linear infinite;

            }

            .line8 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条3.png');
                background-size: 100% 100%;
                position: absolute;
                top: 340px;
                left: 100px;
                animation: spin 2s linear infinite;
            }

            .line9 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/线条5.png');
                background-size: 100% 100%;
                position: absolute;
                top: 310px;
                left: 100px;
                animation: spin-r 2s linear infinite;
            }

            .line10 {
                width: 700px;
                height: 700px;
                background-image: url('@images/industrialEconomyRun/高光线条3.png');
                background-size: 100% 100%;
                position: absolute;
                top: 280px;
                left: 100px;
                animation: spin-r 2s linear infinite;
            }

            // .line11 {
            //     width: 700px;
            //     height: 700px;
            //     background-image: url('@images/industrialEconomyRun/高光线条4.png');
            //     background-size: 100% 100%;
            //     position: absolute;
            //     top: 250px;
            //     left: 100px;
            //     animation: spin-r 2s linear infinite;

            // }

            // .line12 {
            //     width: 700px;
            //     height: 700px;
            //     background-image: url('@images/industrialEconomyRun/线条2.png');
            //     background-size: 100% 100%;
            //     position: absolute;
            //     top: 220px;
            //     left: 100px;
            //     animation: spin-r 2s linear infinite;

            // }

            /* 压缩div高度，将正圆变为椭圆 */


            /* 顺时针旋转动画 */
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }

            /* 逆时针旋转动画 */
            @keyframes spin-r {
                0% {
                    transform: rotate(360deg);
                }

                100% {
                    transform: rotate(0deg);
                }
            }

            /* 圆点横向运动变化，需根据真实效果调整参数 */



        }
    }

}
</style>