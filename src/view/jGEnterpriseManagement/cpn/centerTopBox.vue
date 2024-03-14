<template>
    <div class="centerTop">
        <div class="top">
            <ul class="list">
                <li v-for="(item, index) in  list" :key="index + '11'">
                    <h2>{{ item.title }}</h2>
                    <p><span>{{ item.value }}</span><i>{{ item.unit }}</i></p>
                </li>
            </ul>
        </div>

        <div class="bottom" :style="{ backgroundImage: `url(${props.bigUrl})`, }">
            <el-scrollbar max-height="134px">
                <span>{{ props.title }}</span>
            </el-scrollbar>
        </div>
    </div>
</template>
    
<script setup>
import bg from '@images/jGEnterpriseManagement/酒钢图.jpg';
const props = defineProps({
    bigUrl: {
        type: String,
        default() {
            return bg
        }
    },
    title: {
        type: String,
        default: '酒泉钢铁（集团）有限责任公司（简称酒钢）位于甘肃省嘉峪关市，始建于1958年，是国家最早规划建设的第四家钢铁联合企业，也是我国西北地区建设最早、规模最大、黑色与有色并举的多元化现代企业集团。'
    },
    list:{
        type:Array,
        default:()=>[]
    }
})
</script>
    
<style lang="scss" scoped>
.centerTop {
    margin-bottom: 30px;

    .top {
        width: 864px;
        height: 128px;
        background: url("@images/comprehensiveAnalysis/框.png");
        background-size: 100% 100%;
        padding: 30px 25px;
        box-sizing: border-box;

        .list {
            display: flex;
            justify-content: space-between;

            li {
                position: relative;

                h2 {
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px;
                    color: #FFFFFF;

                }

                p {
                    margin-top: 8px;

                    >span {
                        font-size: 32px;
                        font-weight: bold;
                        line-height: 36px;
                        letter-spacing: 0px;
                        color: #00CCFF;
                    }

                    i {
                        padding-left: 4px;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 20px;
                        text-align: right;
                        color: #FFFFFF;
                    }
                }
            }

            li:not(:last-child) {
                position: relative;

                &::after {
                    content: '';
                    right: -20px;
                    position: absolute;
                    height: 70px;
                    top: 0;
                    width: 2px;
                    background-image: url('@images/tripleAndLarge/会议覆盖运行情况线条.png');
                    background-size: 100% 100%;
                }
            }
        }
    }

    .bottom {
        width: 860px;
        height: 472px;
        background-image: url('@images/jGEnterpriseManagement/酒钢图.jpg');
        background-size: 100% 100%;
        position: relative;

        .el-scrollbar {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
            padding: 25px;
            box-sizing: border-box;
            width: 679.38px;
            height: 134.4px;
            background-image: url('@images/jGEnterpriseManagement/介绍.png');
            background-size: 100% 100%;

            span {
                font-size: 18px;
                font-weight: normal;
                line-height: 27px;
                text-align: left;
                /* 浏览器可能不支持 */
                letter-spacing: 0em;
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
</style>