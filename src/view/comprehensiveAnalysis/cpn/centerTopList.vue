<template>
    <div class="centerTopList">
        <h2 class="ttf">固定资产投资概览</h2>
        <ul>
            <li>
                <img src="@images/comprehensiveAnalysis/投资计划总金额.png" alt="" srcset="">
                <div class="content">
                    <h3>投资计划总金额</h3>
                    <p><span>1,138</span><i>亿元</i></p>
                </div>
            </li>
            <li> <img src="@images/comprehensiveAnalysis/实际投资总金额.png" alt="" srcset="">
                <div class="content">
                    <h3>实际投资总金额</h3>
                    <p><span>1,138</span><i>亿元</i></p>
                </div>
            </li>
            <li><img src="@images/comprehensiveAnalysis/完成比例.png" alt="" srcset="">
                <div class="content">
                    <h3>完成比例</h3>
                    <p><span>1,138</span><i>亿元</i></p>
                </div>
            </li>
            <li> <img src="@images/comprehensiveAnalysis/项目数.png" alt="" srcset="">
                <div class="content">
                    <h3>项目数</h3>
                    <p><span>1,138</span><i>亿元</i></p>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>

</script>
<style lang="scss" scoped>
.centerTopList {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 110px;
    background: url("@images/comprehensiveAnalysis/框.png");
    background-size: 100% 100%;
    width: 864px;
    height: 126.82px;
    padding: 14px 0px;
    box-sizing: border-box;

    h2 {
        text-align: center;
        font-size: 24px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0.2em;
        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
    }

    ul {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;

        li {
            display: flex;

            img {
                width: 64px;
                height: 64px;
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 8px;

                h3 {
                    white-space: nowrap;
                    font-size: 18px;
                    font-weight: normal;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                    z-index: 0;
                }

                p {

                    white-space: nowrap;

                    span {
                        font-size: 28px;
                        font-weight: normal;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #00CCFF;
                        z-index: 0;
                    }

                    i {
                        font-size: 16px;
                        font-weight: normal;
                        line-height: 20px;
                        text-align: right;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                        z-index: 1;
                    }
                }
            }
        }

        li:not(:last-child) {
            margin-right: 26px;
        }
    }
}
</style>